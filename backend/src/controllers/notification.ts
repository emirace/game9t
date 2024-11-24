import { Response } from 'express';
import { AuthenticatedRequest } from '../middlewares/auth';
import Notification from '../models/notification';

export const getUserNotifications = async (
  req: AuthenticatedRequest,
  res: Response,
) => {
  try {
    const userId = req.user!._id;

    // Fetch notifications for the authenticated user
    const notifications = await Notification.find({ recipient: userId })
      .sort({ createdAt: -1 }) // Sort notifications by the latest
      .populate('sender', 'username personalInfo.profilePictureUrl') // Populate sender details
      .lean();

    res.status(200).json(notifications);
  } catch (error) {
    console.error('Error fetching notifications:', error);
    res.status(500).json({ message: 'Failed to fetch notifications' });
  }
};

export const deleteAllUserNotifications = async (
  req: AuthenticatedRequest,
  res: Response,
) => {
  try {
    const userId = req.user!._id;

    const result = await Notification.deleteMany({ recipient: userId });

    res.status(200).json({
      message: 'All notifications deleted successfully',
      deletedCount: result.deletedCount,
    });
  } catch (error) {
    console.error('Error deleting notifications:', error);
    res.status(500).json({ error: 'Failed to delete notifications' });
  }
};
