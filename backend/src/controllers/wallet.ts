import { Request, Response } from 'express';
import Wallet from '../models/wallet';
import { AuthenticatedRequest } from '../middlewares/auth';
import mongoose from 'mongoose';
import paystack from 'paystack';
import { ipnSecret, secretKey } from '../config/env';
import crypto from 'crypto';
import Transaction from '../models/transaction';
import WithdrawalRequest from '../models/withdrawalRequest';

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
    const topUpAmount = parseFloat(amount) / 5;
    wallet.balance += topUpAmount;
    await wallet.save({ session });

    // Record the transaction
    const transaction = new Transaction({
      type: 'Deposit',
      user: userId,
      amount: topUpAmount,
      status: 'Completed',
      reference: transactionId,
      transactionType: 'credit',
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

export const ipn = async (req: Request, res: Response) => {
  try {
    const ipnSignature = req.headers['x-nowpayments-sig'] as string;

    // Verify that the IPN signature is present
    if (!ipnSignature) {
      res.status(400).json({ message: 'IPN signature missing' });
      return;
    }

    // Validate the IPN signature
    const isValidSignature = verifyIpnSignature(ipnSignature, req.body);
    if (!isValidSignature) {
      res.status(401).json({ message: 'Invalid IPN signature' });
      return;
    }

    // Extract the payment details from the IPN payload
    const { payment_id, order_id, price_amount, pay_currency, payment_status } =
      req.body;

    console.log('IPN Received:', req.body);

    // Process the payment status
    switch (payment_status) {
      case 'waiting':
        console.log(`Payment ${payment_id} is waiting for confirmation.`);
        // Handle "waiting" status if needed
        break;
      case 'confirmed':
        console.log(`Payment ${payment_id} is confirmed.`);
        // Update the order status in your database to "confirmed"
        break;
      case 'failed':
        console.log(`Payment ${payment_id} has failed.`);
        // Update the order status in your database to "failed"
        break;
      case 'finished':
        console.log(`Payment ${payment_id} is completed.`);
        // Update the order status in your database to "completed"
        break;
      default:
        console.log(`Unhandled payment status: ${payment_status}`);
    }

    // Respond to NOWPayments
    res.status(200).json({ message: 'IPN received successfully' });
  } catch (error) {
    console.error('Error handling IPN:', error);
    res.status(500).json({ message: 'Internal server error' });
  }
};

export async function getWalletStats(req: Request, res: Response) {
  try {
    // Total user wallets
    const totalWallets = await Wallet.countDocuments();

    // Total deposit amount
    const totalDeposits = await Transaction.aggregate([
      { $match: { type: 'Deposit', status: 'Completed' } },
      { $group: { _id: null, total: { $sum: '$amount' } } },
    ]);
    const depositSum = totalDeposits.length > 0 ? totalDeposits[0].total : 0;

    // Total withdrawal amount
    const totalWithdrawals = await Transaction.aggregate([
      { $match: { type: 'Withdrawal', status: 'Completed' } },
      { $group: { _id: null, total: { $sum: '$amount' } } },
    ]);
    const withdrawalSum =
      totalWithdrawals.length > 0 ? totalWithdrawals[0].total : 0;

    // Number of pending withdrawals
    const pendingWithdrawals = await WithdrawalRequest.countDocuments({
      status: 'pending',
    });

    // Response
    res.status(200).json({
      totalWallets,
      totalDepositAmount: depositSum,
      totalWithdrawalAmount: withdrawalSum,
      pendingWithdrawalCount: pendingWithdrawals,
    });
  } catch (error: any) {
    console.error('Error fetching wallet stats:', error);
    res.status(500).json({
      message: 'Error fetching wallet stats',
      error: error.message,
    });
  }
}

export async function getWalletTransactions(req: Request, res: Response) {
  try {
    const userId = req.params.id;
    if (!userId) {
      res.status(400).json({
        status: false,
        message: 'User id is required',
      });
      return;
    }

    const { type, status, page = 1, limit = 10 } = req.query;

    // Query filters
    const filters: Record<string, any> = { user: userId };
    if (type) filters.type = type;
    if (status) filters.status = status;

    // Pagination setup
    const perPage = parseInt(limit as string) || 10;
    const skip = (parseInt(page as string) - 1) * perPage;

    // Fetch transactions with filters and pagination
    const transactions = await Transaction.find(filters)
      .sort({ createdAt: -1 }) // Most recent transactions first
      .skip(skip)
      .limit(perPage)
      .exec();

    // Total count for pagination
    const totalCount = await Transaction.countDocuments(filters);

    res.status(200).json({
      transactions,
      total: totalCount,
      currentPage: parseInt(page as string),
      totalPages: Math.ceil(totalCount / +limit),
    });
  } catch (error) {
    console.error('Error fetching wallet transactions:', error);
    res.status(500).json({
      message: 'Error fetching wallet transactions',
      error: error,
    });
  }
}

// Adjust wallet balance and activate/deactivate wallet
export async function adjustWallet(req: Request, res: Response) {
  try {
    const { userId, balanceAdjustment, isActive } = req.body;

    if (!userId) {
      res.status(400).json({
        message: 'User ID is required',
      });
      return;
    }

    // Find the user's wallet
    let wallet = await Wallet.findOne({ user: userId });

    if (!wallet) {
      res.status(404).json({
        message: 'Wallet not found for the user',
      });
      return;
    }

    // Adjust the balance if provided
    if (typeof balanceAdjustment === 'number') {
      wallet.balance = balanceAdjustment;
      if (wallet.balance < 0) {
        res.status(400).json({
          message: 'Wallet balance cannot be negative',
        });
        return;
      }
    }

    // Update the activation status if provided
    if (typeof isActive === 'boolean') {
      wallet.isActive = isActive;
    }

    // Save the wallet changes
    await wallet.save();

    res.status(200).json({
      balance: wallet.balance,
      isActive: wallet.isActive,
    });
  } catch (error) {
    console.error('Error adjusting wallet:', error);
    res.status(500).json({
      message: 'Error adjusting wallet',
      error: error,
    });
  }
}

const verifyIpnSignature = (signature: string, body: any): boolean => {
  const bodyString = JSON.stringify(body);
  const hmac = crypto.createHmac('sha512', ipnSecret);
  hmac.update(bodyString);
  const computedSignature = hmac.digest('hex');
  return computedSignature === signature;
};
