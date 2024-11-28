import { Request, Response } from 'express';
import Bet from '../models/bet';
import Wallet from '../models/wallet';
import mongoose from 'mongoose';
import Transaction from '../models/transaction';

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
      .sort({ createdAt: -1 })
      .populate([
        { path: 'winner', select: 'username' },
        {
          path: 'session',
          select: 'initiatedGame players',
          populate: [
            {
              path: 'initiatedGame',
              select: 'name',
            },
            {
              path: 'players',
              select: 'username ',
            },
          ],
        },
      ])
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

    const bet = await Bet.findById(betId).populate([
      { path: 'winner', select: 'username' },
      {
        path: 'session',
        select: 'initiatedGame players',
        populate: [
          {
            path: 'initiatedGame',
            select: 'name',
          },
          {
            path: 'players',
            select: 'username ',
          },
        ],
      },
    ]);

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

  const session = await mongoose.startSession();
  session.startTransaction();

  try {
    // Validate status input
    if (!['completed', 'rejected'].includes(status)) {
      res.status(400).json({ message: 'Invalid status value' });
      return;
    }

    const bet = await Bet.findById(betId)
      .populate([
        { path: 'winner', select: 'username' },
        {
          path: 'session',
          select: 'initiatedGame players',
          populate: [
            {
              path: 'initiatedGame',
              select: 'name',
            },
            {
              path: 'players',
              select: 'username _id', // Include player ID
            },
          ],
        },
      ])
      .session(session);

    if (!bet) {
      await session.abortTransaction();
      res.status(404).json({ message: 'Bet not found' });
      return;
    }

    // Ensure bet is in a state that can be approved or rejected
    if (bet.status !== 'pending') {
      await session.abortTransaction();
      res.status(400).json({
        message: 'Only pending bets can be updated',
      });
      return;
    }

    // Update bet status
    bet.status = status;
    bet.settlementDate = new Date();

    if (status === 'completed') {
      if (bet.winner) {
        // Pay the winner
        const settleAmount = bet.amount * 2 - bet.amount * 0.05; // Deduct 5% fee
        const wallet = await Wallet.findOne({ user: bet.winner._id }).session(
          session,
        );
        if (!wallet) {
          await session.abortTransaction();
          res.status(404).json({ message: 'Winner wallet not found' });
          return;
        }
        wallet.balance += settleAmount;
        await wallet.save({ session });
        await Transaction.create(
          [
            {
              type: 'Bet',
              user: bet.winner._id,
              amount: settleAmount,
              status: 'Completed',
              transactionType: 'credit',
              paymentMethod: 'Wallet',
            },
          ],
          { session },
        );
      } else {
        // Refund each player if no winner
        for (const player of (bet.session as any).players) {
          const refundAmount = bet.amount - bet.amount * 0.05; // Deduct 5% fee
          const wallet = await Wallet.findOne({ user: player._id }).session(
            session,
          );
          if (!wallet) {
            await session.abortTransaction();
            res.status(404).json({
              message: `Wallet not found for player ${player.username}`,
            });
            return;
          }
          wallet.balance += refundAmount;
          await wallet.save({ session });
          await Transaction.create(
            [
              {
                type: 'Bet',
                user: player._id,
                amount: refundAmount,
                status: 'Completed',
                transactionType: 'credit',
                paymentMethod: 'Wallet',
              },
            ],
            { session },
          );
        }
      }
    } else if (status === 'rejected') {
      // Refund each player
      for (const player of (bet.session as any).players) {
        const refundAmount = bet.amount - bet.amount * 0.05; // Deduct 5% fee
        const wallet = await Wallet.findOne({ user: player._id }).session(
          session,
        );
        if (!wallet) {
          await session.abortTransaction();
          res.status(404).json({
            message: `Wallet not found for player ${player.username}`,
          });
          return;
        }
        wallet.balance += refundAmount;
        await wallet.save({ session });
        await Transaction.create(
          [
            {
              type: 'Bet',
              user: player._id,
              amount: refundAmount,
              status: 'Completed',
              transactionType: 'credit',
              paymentMethod: 'Wallet',
            },
          ],
          { session },
        );
      }
    }

    await bet.save({ session });

    // Commit the transaction
    await session.commitTransaction();
    session.endSession();

    res.status(200).json(bet);
  } catch (error) {
    console.error('Error approving/rejecting bet:', error);
    // Rollback the transaction in case of an error
    await session.abortTransaction();
    session.endSession();
    res.status(500).json({
      message: 'Internal server error',
    });
  }
};
