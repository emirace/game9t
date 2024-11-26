import { Request, Response } from 'express';
import Bet from '../models/bet';

export async function getBetStats(req: Request, res: Response) {
  try {
    // Aggregating statistics for bets
    const [stats] = await Bet.aggregate([
      {
        $facet: {
          totalBetsPlaced: [{ $count: 'count' }],
          totalAmountBet: [
            { $group: { _id: null, total: { $sum: '$amount' } } },
          ],
          totalSettledBets: [
            { $match: { status: 'completed' } },
            { $count: 'count' },
          ],
          totalPendingBets: [
            { $match: { status: 'pending' } },
            { $count: 'count' },
          ],
        },
      },
      {
        $project: {
          totalBetsPlaced: {
            $arrayElemAt: ['$totalBetsPlaced.count', 0],
          },
          totalAmountBet: {
            $arrayElemAt: ['$totalAmountBet.total', 0],
          },
          totalSettledBets: {
            $arrayElemAt: ['$totalSettledBets.count', 0],
          },
          totalPendingBets: {
            $arrayElemAt: ['$totalPendingBets.count', 0],
          },
        },
      },
    ]);

    // Setting default values for missing data
    const {
      totalBetsPlaced = 0,
      totalAmountBet = 0,
      totalSettledBets = 0,
      totalPendingBets = 0,
    } = stats || {};

    res.status(200).json({
      totalBetsPlaced,
      totalAmountBet,
      totalSettledBets,
      totalPendingBets,
    });
  } catch (error) {
    console.error('Error fetching bet stats:', error);
    res.status(500).json({
      message: 'Error fetching bet stats',
      error: error,
    });
  }
}

export async function getBets(req: Request, res: Response) {
  try {
    const { status, page = 1, limit = 10 } = req.query;

    // Build filter object
    const filter: { [key: string]: any } = {};
    if (status) {
      filter.status = status;
    }

    // Parse pagination parameters
    const pageNumber = parseInt(page as string, 10) || 1;
    const pageSize = parseInt(limit as string, 10) || 10;

    // Fetch bets with filters and pagination
    const bets = await Bet.find(filter)
      .skip((pageNumber - 1) * pageSize)
      .limit(pageSize)
      .sort({ createdAt: -1 }) // Sort by creation date, newest first
      .populate('game session winner')
      .exec();

    // Total count for pagination
    const totalBets = await Bet.countDocuments(filter);

    res.status(200).json({
      bets,
      total: totalBets,
      page: pageNumber,
      limit: pageSize,
      totalPages: Math.ceil(totalBets / pageSize),
    });
  } catch (error) {
    console.error('Error fetching bets:', error);
    res.status(500).json({
      message: 'Error fetching bets',
      error: error,
    });
  }
}

export async function getBetDetails(req: Request, res: Response) {
  try {
    const { betId } = req.params;

    // Find bet by betId and populate related fields
    const bet = await Bet.findById(betId)
      .populate('game session winner')
      .populate('game.game')
      .exec();

    if (!bet) {
      res.status(404).json({
        status: false,
        message: 'Bet not found',
      });
      return;
    }

    res.status(200).json(bet);
  } catch (error) {
    console.error('Error fetching bet details:', error);
    res.status(500).json({
      status: false,
      message: 'Error fetching bet details',
      error: error,
    });
  }
}

// Controller to approve or reject a bet
export const approveOrRejectBet = async (req: Request, res: Response) => {
  const { betId } = req.params;
  const { status } = req.body;

  try {
    // Validate status input
    if (!['completed', 'rejected'].includes(status)) {
      res.status(400).json({ message: 'Invalid status value' });
      return;
    }

    // Find the bet by ID
    const bet = await Bet.findById(betId)
      .populate('game session winner')
      .populate('game.game');

    if (!bet) {
      res.status(404).json({ message: 'Bet not found' });
      return;
    }

    // Ensure bet is in a state that can be approved or rejected
    if (bet.status !== 'pending') {
      res.status(400).json({
        message: 'Only pending bets can be updated',
      });
      return;
    }

    // Update bet status
    bet.status = status;

    if (status === 'completed') {
      bet.settlementDate = new Date();
    }

    await bet.save();

    res.status(200).json(bet);
  } catch (error) {
    console.error('Error approving/rejecting bet:', error);
    res.status(500).json({
      message: 'Internal server error',
    });
  }
};
