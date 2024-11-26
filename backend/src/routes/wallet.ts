import express from 'express';
import {
  adjustWallet,
  fundWallet,
  getAllWallets,
  getUserBalance,
  getWalletStats,
  getWalletTransactions,
  ipn,
} from '../controllers/wallet';
import { auth, isAdmin } from '../middlewares/auth';

const router = express.Router();

// Route to get user balance
router.get('/balance', auth, getUserBalance);
router.get('/all', auth, isAdmin, getAllWallets);
router.get('/stats', auth, isAdmin, getWalletStats);
router.get('/transactions/:id', auth, isAdmin, getWalletTransactions);
router.post('/fund', auth, fundWallet);
router.post('/ipn', auth, ipn);
router.put('/adjust', auth, isAdmin, adjustWallet);

export default router;
