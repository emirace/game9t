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

// Controller to get all transactions
export const getAllTransactions = async (req: Request, res: Response) => {
  try {
    const transactions = await Transaction.find().sort({ createdAt: -1 });

    res.status(200).json(transactions);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server error' });
  }
};
