import { Socket } from 'socket.io';
import Game from '../models/game';
import GameSession from '../models/gameSession';
import User, { IUser } from '../models/user';
import { onlineUsers } from '../socket';
import Wallet from '../models/wallet';
import Notification from '../models/notification';
import { createNotification } from '../utils/notification';
import Message from '../models/message';

export const startGame = async ({
  mode,
  socket,
}: {
  mode: string;
  socket: Socket;
}) => {
  try {
    const userId = (socket.request as any).user._id;

    socket
      .to(onlineUsers.get(userId.toString())?.socketId.main!)
      .emit('startGame', { mode });
  } catch (error) {
    console.log(error);
    socket.emit('updateSocketRooms', 'any', 'Error starting game, try again');
  }
};

export const startPlayerGame = ({
  opponent,
  socket,
}: {
  opponent?: string;
  socket: Socket;
}) => {
  const userId = (socket.request as any).user._id;

  if (opponent) {
    socket
      .to(onlineUsers.get(userId.toString())?.socketId.game!)
      .emit('startPlayerGame');
  } else {
    socket
      .to(onlineUsers.get(userId.toString())?.socketId.game!)
      .emit('updateSocketRooms', 'any', 'Challenge created');
  }
};

export const createChallenge = async ({
  gameId,
  socket,
  amount,
  compete,
}: {
  gameId: string;
  socket: Socket;
  amount?: number;
  compete?: string;
}) => {
  try {
    const userId = (socket.request as any).user._id;
    const username = (socket.request as any).user.username;

    const game = await Game.findById(gameId);
    if (!game) {
      throw new Error('Game not found');
    }

    // Deactivate existing game sessions for the user
    const existGameSessions = await GameSession.find({
      players: userId,
      active: true,
    });

    if (existGameSessions.length > 0) {
      for (const session of existGameSessions) {
        session.active = false;
        await session.save();
        socket.broadcast.emit('gameSessionCancelled', {
          sessionId: session._id,
        });
      }
    }

    if (amount) {
      const wallet = await Wallet.findOne({ user: userId });
      if (amount > (wallet?.balance || 0)) {
        throw new Error('Insufficient balance, Top up wallet');
      }
    }

    // Create a new game session
    let gameSession = await GameSession.create({
      players: [userId],
      active: true,
      initiatedGame: gameId,
      amount,
      private: !!compete,
    });

    // Populate initiatedGame.name and players.image fields
    gameSession = await (
      await gameSession.populate({ path: 'initiatedGame', select: 'name slug' })
    ).populate({
      path: 'players',
      select: 'personalInfo.profilePictureUrl username',
    });

    // If there's an opponent to challenge, emit challenge request to them
    if (compete) {
      const opponent: IUser | null = await User.findById(compete);
      if (!opponent) throw new Error('User not found');
      const isUserOnline = Array.from(onlineUsers.values()).some(
        (user) => user.userId.toString() === (opponent._id as any).toString(),
      );

      await createNotification({
        recipient: (opponent._id as any).toString(),
        sender: userId,
        type: 'Challenge Received',
        message: `You have received a challenge from ${username} ${gameSession.amount ? 'with a bet of ' + gameSession.amount : ''}`,
        link: `${gameSession._id}`,
      });

      if (!isUserOnline) throw new Error('User is not online');
      socket
        .to(onlineUsers.get((opponent._id as any).toString())?.socketId.main!)
        .emit('challengeRequest', { gameSession });
    }

    // Make the user join the game session room
    for (const room of socket.rooms) {
      console.log(room);
      if (room !== socket.id) {
        socket.leave(room);
      }
    }

    await socket.join((gameSession._id as any).toString());

    // Emit the populated game session to other clients and the creator
    !gameSession.private &&
      socket.broadcast.emit('gameSessionCreated', { gameSession });
    socket.emit('createChallengeResponse', { gameSession });
  } catch (err: any) {
    console.log(err);
    socket.emit('createChallengeError', err.message);
    // throw new Error(err.message);
  }
};

export const acceptChallenge = async ({
  sessionId,
  socket,
}: {
  sessionId: string;
  socket: Socket;
}) => {
  try {
    const userId = (socket.request as any).user._id;
    const username = (socket.request as any).user.username;

    // Find the game session by ID
    let gameSession = await GameSession.findOne({
      _id: sessionId,
      active: true,
    })
      .populate('players')
      .populate({ path: 'initiatedGame', select: 'name' })
      .populate({
        path: 'players',
        select: 'username',
      });

    if (!gameSession) {
      throw new Error('Game session not found or ended');
    }

    // Check if the game session is still active and not private
    if (!gameSession.active) {
      throw new Error('Cannot join this game session');
    }

    // Check if the user is already in the game session
    if (
      gameSession.players.some(
        (player: any) => player._id.toString() === userId,
      )
    ) {
      throw new Error('User is already part of this game session');
    }

    if (gameSession.amount) {
      const wallet = await Wallet.findOne({ user: userId });
      if (gameSession.amount > (wallet?.balance || 0)) {
        throw new Error('Insufficient balance, Top up wallet');
      }
    }

    // Add the user to the players array
    gameSession.players.push(userId);

    // Save the updated game session
    await gameSession.save();

    gameSession = await (
      await gameSession.populate({ path: 'initiatedGame', select: 'name slug' })
    ).populate({
      path: 'players',
      select: 'personalInfo.profilePictureUrl username',
    });

    // Notify both players that the game session has started
    socket.to(sessionId).emit('challengeAccepted', {
      gameSession,
    });
    socket.emit('acceptChallengeResponse', { gameSession });

    const opponent = gameSession.players.find(
      (player: any) => player._id.toString() !== userId,
    );
    if (opponent) {
      console.log('opponent', opponent);
      await createNotification({
        recipient: (opponent._id as any).toString(),
        sender: userId,
        type: 'Challenge Accepted',
        message: `${username} accepted your challedge`,
        link: `/game/${gameSession.initiatedGame._id}?sessionid=${gameSession._id}`,
      });
    }
    // Add the user to the game session room
    await socket.join(sessionId);
  } catch (err: any) {
    socket.emit('acceptChallengeError', err.message);
    // throw new Error(err.message);
  }
};

export const declineChallenge = async ({
  sessionId,
  socket,
}: {
  sessionId: string;
  socket: Socket;
}) => {
  try {
    const userId = (socket.request as any).user._id;
    const username = (socket.request as any).user.username;

    // Find the game session by ID
    const gameSession = await GameSession.findOne({
      _id: sessionId,
      active: true,
    })
      .populate('players')
      .populate({ path: 'initiatedGame', select: 'name' })
      .populate({
        path: 'players',
        select: 'username',
      });

    if (!gameSession) {
      throw new Error('Game session not found or ended');
    }

    // Check if the user is part of the game session
    // const isPlayerInSession = gameSession.players.some(
    //   (player: any) => player._id.toString() === userId,
    // );
    // if (!isPlayerInSession) {
    //   throw new Error('User is not part of this game session');
    // }

    // Notify the challenge initiator or other players
    const opponent = gameSession.players.find(
      (player: any) => player._id.toString() !== userId,
    );

    if (opponent) {
      await createNotification({
        recipient: (opponent._id as any).toString(),
        sender: userId,
        type: 'Challenge Declined',
        message: `${username} declined your challenge.`,
        link: `/game/${gameSession.initiatedGame._id}`, // Adjust link if necessary
      });

      socket
        .to(onlineUsers.get((opponent._id as any).toString())?.socketId.main!)
        .emit('challengeDeclined', {
          userId,
          username,
        });
    }

    gameSession.active = false;
    await gameSession.save();

    // Respond back to the user
    socket.emit('declineChallengeResponse', {
      message: 'Challenge declined successfully',
    });
  } catch (err: any) {
    console.error(err);
    socket.emit('declineChallengeError', err.message);
  }
};

export const cancelChallenge = async ({
  sessionId,
  socket,
}: {
  sessionId: string;
  socket: Socket;
}) => {
  try {
    const userId = (socket.request as any).user._id;
    const username = (socket.request as any).user.username;

    if (!sessionId) {
      socket.emit('cancelChallengeResponse', {
        success: true,
        message: 'Challenge canceled successfully',
      });
      socket
        .to(onlineUsers.get(userId.toString())?.socketId.game!)
        .emit('updateSocketRooms', 'any', 'Game canceled');
      return;
    }

    // Find the active game session that the user is trying to cancel
    const gameSession = await GameSession.findOne({
      _id: sessionId,
      players: userId,
      active: true,
    });

    if (!gameSession) {
      socket.emit('cancelChallengeResponse', {
        success: true,
        message: 'Challenge canceled successfully',
      });
      socket
        .to(onlineUsers.get(userId.toString())?.socketId.game!)
        .emit('updateSocketRooms', 'any', 'Game canceled');
      return;
    }

    // Set game session to inactive (cancel it)
    gameSession.active = false;
    await gameSession.save();
    // Notify any other players in the session about the cancellation
    gameSession.players.forEach(async (player: any) => {
      // Skip notifying the user who canceled
      if (player.toString() !== userId.toString()) {
        const opponentUser = onlineUsers.get(player.toString());
        if (opponentUser) {
          await createNotification({
            recipient: player.toString(),
            sender: userId,
            type: 'Challenge Cancelled',
            message: `${username} cancelled the challenge`,
            link: `/game/${gameSession.initiatedGame._id}?sessionid=${gameSession._id}`,
          });
          socket.to(opponentUser.socketId.main!).emit('challengeCancelled', {
            sessionId,
            message: `Challenge canceled by ${(socket.request as any).user.username}`,
          });
        }
      }
    });

    // Notify the user who canceled the challenge
    socket.emit('cancelChallengeResponse', {
      success: true,
      message: 'Challenge canceled successfully',
    });
    socket.broadcast.emit('gameSessionCancelled', {
      sessionId: gameSession._id,
    });
  } catch (err: any) {
    // Emit an error if something goes wrong
    socket.emit('cancelChallengeError', { error: err.message });
  }
};

export const markNotificationAsRead = async ({
  notificationId,
  socket,
}: {
  notificationId: string;
  socket: Socket;
}) => {
  try {
    if (!notificationId) {
      throw new Error('Invalid data provided');
    }

    // Find the notification and mark it as read
    const notification = await Notification.findById(notificationId);

    if (!notification) {
      throw new Error('Notification not found');
    }

    notification.read = true;
    await notification.save();

    socket.emit('notificationRead', {
      notificationId,
      read: true,
    });
  } catch (error) {
    console.log(error);
  }
};

export const sendMessage = async ({
  content,
  socket,
}: {
  content: string;
  socket: Socket;
}) => {
  try {
    const userId = (socket.request as any).user._id;

    const newMessage = new Message({
      user: userId,
      content,
    });
    await newMessage.save();
    const populatedMessage = await newMessage.populate('user', 'username');

    socket.emit('message:update', { newMessage: populatedMessage });
  } catch (error) {
    console.error('Error saving message:', error);
  }
};
