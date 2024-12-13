import { Request, Response } from 'express';
import Gameplay from '../models/gameplay';
import User from '../models/user';
import mongoose from 'mongoose';
import { AuthenticatedRequest } from '../middlewares/auth';

export const getLeaderboard = async (req: Request, res: Response) => {
  try {
    const leaderboardData = await Gameplay.aggregate([
      // Project only needed fields for clarity
      {
        $project: {
          player1: 1,
          player2: 1,
          winner: 1,
          multiplayer: 1,
          bet: 1,
        },
      },
      { $unwind: { path: '$bet', preserveNullAndEmptyArrays: true } },
      // Unwind players to treat player1 and player2 separately
      {
        $facet: {
          player1Data: [
            { $project: { player: '$player1', winner: 1, bet: 1 } },
          ],
          player2Data: [
            { $match: { multiplayer: true } },
            { $project: { player: '$player2', winner: 1, bet: 1 } },
          ],
        },
      },
      // Combine player1 and player2 data
      {
        $project: {
          combinedData: { $concatArrays: ['$player1Data', '$player2Data'] },
        },
      },
      { $unwind: '$combinedData' },
      { $replaceRoot: { newRoot: '$combinedData' } },

      // Group by userId and calculate metrics
      {
        $group: {
          _id: '$player.userId',
          totalGamesPlayed: { $sum: 1 },
          totalWins: {
            $sum: { $cond: [{ $eq: ['$winner', '$player.userId'] }, 1, 0] },
          },
          totalLosses: {
            $sum: { $cond: [{ $ne: ['$winner', '$player.userId'] }, 1, 0] },
          },
          currentScore: { $sum: '$player.score' }, // Sum of all scores for each player
          totalEarnings: {
            $sum: {
              $cond: [
                {
                  $and: [
                    { $eq: ['$winner', '$player.userId'] },
                    { $ifNull: ['$bet.amount', false] },
                  ],
                },
                '$bet.amount',
                0,
              ],
            },
          },
        },
      },
      // Sort by totalWins and currentScore
      { $sort: { totalWins: -1, currentScore: -1 } },
      // Limit to top 10 for leaderboard
      { $limit: 10 },
    ]);

    // Populate player details (name, etc.)
    const leaderboard = await User.populate(leaderboardData, {
      path: '_id',
      select: 'username personalInfo.profilePictureUrl', // Populate with the fields you need
    });

    res.status(200).json({ leaderboard });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server error' });
  }
};

export const getUserGameplays = async (
  req: AuthenticatedRequest,
  res: Response,
) => {
  const userId = req.user?._id;

  try {
    const userGameplays = await Gameplay.find({
      $or: [{ 'player1.userId': userId }, { 'player2.userId': userId }],
    })
      .populate('game', 'name')
      .populate('winner', 'username')
      .populate('player1.userId', 'username')
      .populate('player2.userId', 'username')
      .populate('bet', 'amount')
      .sort({ createdAt: -1 });

    res.status(200).json({ gameplays: userGameplays });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server error' });
  }
};
