import { Request, Response } from 'express';
import Wallet from '../models/wallet';
import { AuthenticatedRequest } from '../middlewares/auth';
import mongoose from 'mongoose';
import Transaction from '../models/wallet';
import paystack from 'paystack';
import { secretKey } from '../config/env';

const paystackInstance = paystack(secretKey as string);

export const getUserBalance = async (
  req: AuthenticatedRequest,
  res: Response,
) => {
  try {
    const wallet = await Wallet.findOne({ user: req.user!._id }).select(
      'balance isActive',
    );

    if (!wallet) {
      const newWallet = await Wallet.create({
        user: req.user!._id,
      });
      res.json({ balance: newWallet.balance, isActive: newWallet.isActive });
      return;
    }

    res.json({ balance: wallet.balance, isActive: wallet.isActive });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server error' });
  }
};

export async function fundWallet(req: AuthenticatedRequest, res: Response) {
  const session = await mongoose.startSession();
  session.startTransaction();
  try {
    const userId = req.user?._id!;

    const { amount, transactionId } = req.body;

    const existTransaction = await Transaction.findOne({
      reference: transactionId,
    });
    if (existTransaction) {
      await session.abortTransaction();
      session.endSession();
      res
        .status(400)
        .json({ status: false, message: 'Possible dublicate wallet' });
      return;
    }

    const response = await paystackInstance.transaction.verify(transactionId);

    if (response.data.status !== 'success') {
      await session.abortTransaction();
      session.endSession();
      res
        .status(400)
        .json({ status: false, message: 'Payment verification failed' });
      return;
    }

    if (amount * 100 !== response.data.amount) {
      await session.abortTransaction();
      session.endSession();

      const errorMessage = 'Invalid transaction amount';

      res.status(400).json({ status: false, message: errorMessage });
      return;
    }

    var wallet;
    wallet = await Wallet.findOne({
      user: userId,
    }).session(session);

    if (!wallet) {
      wallet = new Wallet({
        user: userId,
      });
      wallet.save({ session });
    }

    if (!wallet.isActive) {
      res
        .status(400)
        .json({ status: false, message: 'Wallet is currently inactive' });
      return;
    }
    // Update wallet balance
    wallet.balance += parseFloat(amount);
    await wallet.save({ session });

    // Record the transaction
    const transaction = new Transaction({
      type: 'Deposit',
      user: userId,
      amount,
      status: 'Completed',
      reference: transactionId,
      paymentMethod: 'Credit Card',
    });
    await transaction.save({ session });

    await session.commitTransaction();
    session.endSession();

    res
      .status(200)
      .json({ status: true, message: 'Wallet funded successfully' });
  } catch (error) {
    console.error('Error funding wallet:', error);
    res
      .status(500)
      .json({ status: false, message: 'Error funding wallet', error });
  }
}

export const getAllWallets = async (req: Request, res: Response) => {
  try {
    const { page = 1, limit = 20 } = req.query;

    // Fetch wallet requests with pagination
    const wallets = await Wallet.find()
      .populate('user', 'username personalInfo.firstName personalInfo.lastName')
      .sort({ createdAt: -1 })
      .limit(+limit)
      .skip((+page - 1) * +limit)
      .exec();

    // Get total count for pagination
    const totalCount = await Wallet.countDocuments();

    res.json({
      wallets,
      totalPages: Math.ceil(totalCount / +limit),
      currentPage: +page,
      totalCount,
    });
  } catch (error) {
    console.error('Error fetching wallets requests:', error);
    res.status(500).json({ message: 'Error fetching wallets requests', error });
  }
};
