import { Request, Response } from 'express';
import Transaction from '../models/transaction';
import { AuthenticatedRequest } from '../middlewares/auth';

// Controller to get all transactions for a user
export const getUserTransactions = async (
  req: AuthenticatedRequest,
  res: Response,
) => {
  try {
    const transactions = await Transaction.find({ user: req.user!._id }).sort({
      createdAt: -1,
    });

    res.status(200).json(transactions);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server error' });
  }
};

export const getAllTransactions = async (req: Request, res: Response) => {
  try {
    const { page = 1, limit = 20 } = req.query;
    console.log('checking transaction page', page, +page, +page - 1);
    // Fetch transaction requests with pagination
    const transactions = await Transaction.find()
      .populate('user', 'username email')
      .sort({ createdAt: -1 })
      .limit(+limit)
      .skip((+page - 1) * +limit)
      .exec();

    // Get total count for pagination
    const totalCount = await Transaction.countDocuments();

    res.json({
      transactions,
      totalPages: Math.ceil(totalCount / +limit),
      currentPage: +page,
      totalCount,
    });
  } catch (error) {
    console.error('Error fetching transaction requests:', error);
    res
      .status(500)
      .json({ message: 'Error fetching transaction requests', error });
  }
};
