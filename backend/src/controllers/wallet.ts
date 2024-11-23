import { Request, Response } from 'express';
import Wallet from '../models/wallet';
import { AuthenticatedRequest } from '../middlewares/auth';
import mongoose from 'mongoose';
import Transaction from '../models/wallet';
import paystack from 'paystack';
import { ipnSecret, secretKey } from '../config/env';
import crypto from 'crypto';

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

    // Check if transaction already exists
    const existTransaction = await Transaction.findOne({
      reference: transactionId,
    });
    if (existTransaction) {
      await session.abortTransaction();
      session.endSession();
      return res
        .status(400)
        .json({ status: false, message: 'Possible duplicate transaction' });
    }

    // Verify payment
    const response = await paystackInstance.transaction.verify(transactionId);
    if (response.data.status !== 'success') {
      await session.abortTransaction();
      session.endSession();
      return res
        .status(400)
        .json({ status: false, message: 'Payment verification failed' });
    }

    if (amount * 100 !== response.data.amount) {
      await session.abortTransaction();
      session.endSession();
      return res
        .status(400)
        .json({ status: false, message: 'Invalid transaction amount' });
    }

    // Ensure wallet is retrieved or created atomically
    let wallet = await Wallet.findOneAndUpdate(
      { user: userId },
      { $setOnInsert: { user: userId, balance: 0, isActive: true } },
      { new: true, upsert: true, session },
    );

    if (!wallet.isActive) {
      await session.abortTransaction();
      session.endSession();
      return res
        .status(400)
        .json({ status: false, message: 'Wallet is currently inactive' });
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
      paymentMethod: 'Credit Card',
    });
    await transaction.save({ session });

    // Commit transaction
    await session.commitTransaction();
    session.endSession();

    res
      .status(200)
      .json({ status: true, message: 'Wallet funded successfully' });
  } catch (error) {
    await session.abortTransaction();
    session.endSession();
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

const verifyIpnSignature = (signature: string, body: any): boolean => {
  const bodyString = JSON.stringify(body);
  const hmac = crypto.createHmac('sha512', ipnSecret);
  hmac.update(bodyString);
  const computedSignature = hmac.digest('hex');
  return computedSignature === signature;
};
