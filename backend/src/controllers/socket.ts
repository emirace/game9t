import { Socket } from 'socket.io';
import Game from '../models/game';
import GameSession from '../models/gameSession';
import User, { IUser } from '../models/user';
import { onlineUsers } from '../socket';
import Wallet from '../models/wallet';

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
      await gameSession.populate({ path: 'initiatedGame', select: 'name' })
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

      if (!isUserOnline) throw new Error('User is not online');

      socket
        .to(onlineUsers.get((opponent._id as any).toString()).socketId)
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

    // Find the game session by ID
    const gameSession = await GameSession.findById(sessionId)
      .populate({ path: 'initiatedGame', select: 'name' })
      .populate({ path: 'players', select: 'personalInfo.profilePictureUrl' });

    if (!gameSession) {
      throw new Error('Game session not found');
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

    // Notify both players that the game session has started
    socket.to(sessionId).emit('challengeAccepted', {
      gameSession,
    });
    socket.emit('acceptChallengeResponse', { gameSession });

    // Add the user to the game session room
    await socket.join(sessionId);
  } catch (err: any) {
    socket.emit('acceptChallengeError', err.message);
    // throw new Error(err.message);
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
    // Find the active game session that the user is trying to cancel
    const gameSession = await GameSession.findOne({
      _id: sessionId,
      players: userId,
      active: true,
    });

    if (!gameSession) {
      throw new Error('Challenge not found or already inactive');
    }

    // Set game session to inactive (cancel it)
    gameSession.active = false;
    await gameSession.save();
    // Notify any other players in the session about the cancellation
    gameSession.players.forEach((player: any) => {
      // Skip notifying the user who canceled
      if (player.toString() !== userId.toString()) {
        const opponentUser = onlineUsers.get(player.toString());
        if (opponentUser) {
          socket.to(opponentUser.socketId).emit('challengeCancelled', {
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
