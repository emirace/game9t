import { Request, Response } from 'express';
import Game from '../models/game';
import Transaction from '../models/transaction';
import User from '../models/user';

export const getAdminDashboardStats = async (req: Request, res: Response) => {
  try {
    // Count of active users
    const activeUsersCount = await User.countDocuments({ status: 'active' });

    // Count of ongoing games
    const ongoingGamesCount = await Game.countDocuments({ active: true });

    // Total revenue from completed transactions
    const totalRevenue = await Transaction.aggregate([
      { $match: { status: 'Completed' } },
      { $group: { _id: null, total: { $sum: '$amount' } } },
    ]);

    res.json({
      activeUsers: activeUsersCount,
      ongoingGames: ongoingGamesCount,
      totalRevenue: totalRevenue.length > 0 ? totalRevenue[0].total : 0,
    });
  } catch (error) {
    console.error('Error fetching admin dashboard stats:', error);
    res.status(500).json({ message: 'Error fetching dashboard stats', error });
  }
};
