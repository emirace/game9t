import { Response } from 'express';
import Wallet from '../models/wallet';
import { AuthenticatedRequest } from '../middlewares/auth';

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
