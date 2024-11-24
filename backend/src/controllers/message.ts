import { Request, Response } from 'express';
import Message from '../models/message';

export const getLatestMessages = async (req: Request, res: Response) => {
  try {
    const messages = await Message.find()
      .sort({ createdAt: -1 }) // Sort by newest
      .limit(10) // Limit to 10 messages
      .populate('user', 'username email'); // Optionally populate user details

    res.status(200).json(messages.reverse()); // Reverse to show oldest first in UI
  } catch (error) {
    console.error('Error fetching latest messages:', error);
    res.status(500).json({ error: 'Failed to fetch latest messages' });
  }
};
