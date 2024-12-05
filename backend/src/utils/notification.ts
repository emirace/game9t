import { io } from '..';
import Notification from '../models/notification';
import { onlineUsers } from '../socket';
import { Types } from 'mongoose';

interface NotificationData {
  recipient: Types.ObjectId | string;
  sender?: Types.ObjectId | string;
  type: string;
  link?: string;
  message: string;
  data?: Record<string, any>;
}

export const createNotification = async ({
  recipient,
  sender,
  type,
  link,
  message,
  data,
}: NotificationData) => {
  try {
    // Create the notification in the database
    const notification = await Notification.create({
      recipient,
      sender,
      type,
      link,
      content: message,
      metaData: data,
    });

    // Emit the notification to the recipient via socket if they're online
    const recipientSocketId = onlineUsers.get(recipient as string)?.socketId
      .main;
    if (recipientSocketId) {
      io.to(recipientSocketId).emit('newNotification', notification);
    }

    return notification;
  } catch (error) {
    console.error('Error creating notification:', error);
    throw new Error('Failed to create notification');
  }
};
