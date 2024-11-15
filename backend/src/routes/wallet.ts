import express from 'express';
import {
  fundWallet,
  getAllWallets,
  getUserBalance,
} from '../controllers/wallet';
import { auth, isAdmin } from '../middlewares/auth';

const router = express.Router();

// Route to get user balance
router.get('/balance', auth, getUserBalance);
router.get('/all', auth, isAdmin, getAllWallets);
router.post('/fund', auth, fundWallet);

export default router;
