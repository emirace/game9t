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
} from '../controllers/socket';
import { games } from './games';

export const onlineUsers = new Map();

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

    console.log(`Client connected: ${username} ${socket.id}`);

    // Add the user details to the onlineUsers map
    onlineUsers.set(userId.toString(), {
      socketId: socket.id,
      username,
      userId,
      image: personalInfo.profilePictureUrl,
      rating,
    });

    io.emit('onlineUsers', Array.from(onlineUsers.values()));

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
      console.log(`Client disconnected: ${socket.id}`);
      onlineUsers.delete(userId.toString());
      io.emit('onlineUsers', Array.from(onlineUsers.values()));
    });
  });
};
