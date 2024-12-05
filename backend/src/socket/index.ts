import { Server as SocketIOServer, Socket } from 'socket.io';
import jwt from 'jsonwebtoken';
import { JWT_SECRET } from '../config/env';
import User from '../models/user';
import {
  acceptChallenge,
  cancelChallenge,
  createChallenge,
  markNotificationAsRead,
  sendMessage,
  startGame,
  startPlayerGame,
} from '../controllers/socket';
import { games } from './games';

type OnlineUser = {
  socketId: {
    main: string | null;
    game: string | null;
  };
  username: string;
  userId: string;
  image: string;
  rating: number;
};

export const onlineUsers = new Map<string, OnlineUser>();

export const setupSockets = (io: SocketIOServer) => {
  io.engine.use(async (req: any, res: any, next: any) => {
    try {
      if (
        req.headers.authorization &&
        req.headers.authorization.startsWith('Bearer')
      ) {
        const token = req.headers.authorization.split(' ')[1];

        // Verify token
        const decoded = jwt.verify(token, JWT_SECRET) as any;

        // Find user by ID and exclude password field
        const user = await User.findById(decoded.id).select('-password');

        if (!user) {
          return next(new Error('Not authorized, user not found'));
        }

        // Attach user info to the request object for the socket instance
        req.user = user;
        return next();
      } else {
        return next(new Error('Not authorized, no token provided'));
      }
    } catch (error) {
      return next(new Error('Not authorized, token verification failed'));
    }
  });
  io.on('connection', (socket: Socket) => {
    const {
      _id: userId,
      username,
      personalInfo,
      rating,
    } = (socket.request as any).user;
    const type = (socket.request.headers as any).type; // 'main' or 'game'

    console.log(`Client connected: ${username} ${socket.id} ${type}`);

    // Initialize or update the user's entry in the onlineUsers map
    const user = onlineUsers.get(userId.toString()) || {
      socketId: { main: null, game: null },
      username,
      userId,
      image: personalInfo.profilePictureUrl,
      rating,
    };

    // Update the appropriate socketId field
    if (type === 'main') {
      user.socketId.main = socket.id;
    } else if (type === 'game') {
      user.socketId.game = socket.id;
    }

    // Save back the updated user details in the map
    onlineUsers.set(userId.toString(), user);

    io.emit('onlineUsers', Array.from(onlineUsers.values()));

    socket.on('startGame', async function (mode) {
      startGame({ mode, socket });
    });

    socket.on('startPlayerGame', async function () {
      startPlayerGame({ socket });
    });

    socket.on('createChallenge', ({ gameId, amount, compete }) =>
      createChallenge({ gameId, amount, compete, socket }),
    );

    socket.on('acceptChallenge', ({ sessionId }) => {
      acceptChallenge({ sessionId, socket });
    });

    socket.on('cancelChallenge', ({ sessionId }) => {
      cancelChallenge({ sessionId, socket });
    });

    socket.on('markNotificationAsRead', ({ notificationId }) => {
      markNotificationAsRead({ notificationId, socket });
    });

    socket.on('message:send', ({ content }) => {
      sendMessage({ content, socket });
    });

    // HTML5 SOCKETS -----------------
    games(io, socket);

    // socket.onAny((event, ...args) => {
    //   console.log(event, args);
    // });

    // Handle disconnection
    socket.on('disconnect', () => {
      const type = (socket.request.headers as any).type; // 'main' or 'game'
      console.log(`Client disconnected: ${socket.id} ${type}`);

      const user = onlineUsers.get(userId.toString());

      if (user) {
        // Clear the relevant socketId field
        if (type === 'main') {
          user.socketId.main = null;
        } else if (type === 'game') {
          user.socketId.game = null;
        }

        // If both main and game are null, remove the user from the map
        if (!user.socketId.main && !user.socketId.game) {
          onlineUsers.delete(userId.toString());
        } else {
          // Otherwise, update the user entry
          onlineUsers.set(userId.toString(), user);
        }
      }

      // Emit the updated list of online users
      io.emit('onlineUsers', Array.from(onlineUsers.values()));
    });
  });
};
