import { Request, Response } from 'express';
import WithdrawalRequest from '../models/withdrawalRequest';
import { AuthenticatedRequest } from '../middlewares/auth';
import Wallet from '../models/wallet';
import Transaction from '../models/transaction';

export const getAllWithdrawalRequests = async (req: Request, res: Response) => {
  try {
    const { page = 1, limit = 20, status } = req.query;

    const query: any = {};
    if (status) {
      query.status = status;
    }

    // Fetch withdrawal requests with pagination
    const withdrawalRequests = await WithdrawalRequest.find(query)
      .populate('user', 'username email')
      .limit(+limit)
      .skip((+page - 1) * +limit)
      .exec();

    // Get total count for pagination
    const totalCount = await WithdrawalRequest.countDocuments(query);

    res.json({
      withdrawalRequests,
      totalPages: Math.ceil(totalCount / +limit),
      currentPage: +page,
      totalCount,
    });
  } catch (error) {
    console.error('Error fetching withdrawal requests:', error);
    res
      .status(500)
      .json({ message: 'Error fetching withdrawal requests', error });
  }
};

// Create a withdrawal request
export const createWithdrawalRequest = async (
  req: AuthenticatedRequest,
  res: Response,
) => {
  try {
    const user = req.user!._id;
    const { amount, ...others } = req.body;

    if (!amount || amount <= 0) {
      res.status(400).json({ error: 'A valid amount are required' });
      return;
    }

    // Find the user's wallet
    const wallet = await Wallet.findOne({ user });
    if (!wallet) {
      res.status(404).json({ error: 'Wallet not found' });
      return;
    }

    // Check if the wallet is active
    if (!wallet.isActive) {
      res
        .status(403)
        .json({ error: 'Wallet is inactive. Withdrawals are not allowed.' });
      return;
    }

    // Ensure sufficient balance
    if (wallet.balance < amount) {
      res.status(400).json({ error: 'Insufficient balance in wallet' });
      return;
    }

    // Deduct the amount from the wallet
    wallet.balance -= amount;
    await wallet.save();

    // Create a new withdrawal request
    const withdrawalRequest = new WithdrawalRequest({
      user,
      amount,
      metaData: others,
    });

    const transaction = new Transaction({
      type: 'Withdrawal',
      user,
      amount,
      status: 'Pending',
      paymentMethod: others.type === 'Naira' ? 'Bank Transfer' : 'Crypto',
      reference: withdrawalRequest._id,
    });

    await transaction.save();

    // Save the withdrawal request to the database
    await withdrawalRequest.save();

    res.status(201).json({
      message: 'Withdrawal request created successfully',
    });
  } catch (error) {
    console.error('Error creating withdrawal request:', error);
    res.status(500).json({ error: 'Server error' });
  }
};

// Approve withdrawal request
export const approveWithdrawalRequest = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;

    const withdrawalRequest = await WithdrawalRequest.findById(id).populate(
      'user',
      'username email',
    );
    if (!withdrawalRequest) {
      res.status(404).json({ message: 'Withdrawal request not found' });
      return;
    }

    if (withdrawalRequest.status !== 'pending') {
      res
        .status(400)
        .json({ message: 'Only pending requests can be approved' });
      return;
    }

    withdrawalRequest.status = 'approved';
    await withdrawalRequest.save();

    res.json({
      message: 'Withdrawal request approved successfully',
      withdrawalRequest,
    });
  } catch (error) {
    console.error('Error approving withdrawal request:', error);
    res
      .status(500)
      .json({ message: 'Error approving withdrawal request', error });
  }
};

// Decline withdrawal request
export const declineWithdrawalRequest = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;

    const withdrawalRequest = await WithdrawalRequest.findById(id).populate(
      'user',
      'username email',
    );
    if (!withdrawalRequest) {
      res.status(404).json({ message: 'Withdrawal request not found' });
      return;
    }

    if (withdrawalRequest.status !== 'pending') {
      res
        .status(400)
        .json({ message: 'Only pending requests can be declined' });
      return;
    }

    withdrawalRequest.status = 'rejected';
    await withdrawalRequest.save();

    res.json({
      message: 'Withdrawal request declined successfully',
      withdrawalRequest,
    });
  } catch (error) {
    console.error('Error declining withdrawal request:', error);
    res
      .status(500)
      .json({ message: 'Error declining withdrawal request', error });
  }
};
