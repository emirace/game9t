import { Request, Response } from 'express';
import GameSession from '../models/gameSession';
import { AuthenticatedRequest } from '../middlewares/auth';

export const getAllGameSessions = async (
  req: AuthenticatedRequest,
  res: Response,
) => {
  try {
    const userId = req.user!._id;

    const gameSessions = await GameSession.find({
      active: true,
      private: false,
      players: { $ne: userId },
      $expr: { $lt: [{ $size: '$players' }, 2] },
    })
      .populate('players', 'personalInfo.profilePictureUrl')
      .populate('initiatedGame', 'name image');

    res.status(200).json(gameSessions);
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: 'Failed to fetch game sessions' });
  }
};

export const getGameSessionById = async (
  req: AuthenticatedRequest,
  res: Response,
) => {
  try {
    const id = req.params.sessionId;
    const gameSession = await GameSession.findById(id)
      .populate('players', 'personalInfo.profilePictureUrl username')
      .populate('initiatedGame', 'name image');

    if (!gameSession) {
      res.status(404).json({ message: 'Session not found' });
      return;
    }

    res.status(200).json(gameSession);
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: 'Failed to fetch game session' });
  }
};
