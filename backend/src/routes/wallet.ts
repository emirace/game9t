import express from 'express';
import { getUserBalance } from '../controllers/wallet';
import { auth } from '../middlewares/auth';

const router = express.Router();

// Route to get user balance
router.get('/balance', auth, getUserBalance);

export default router;
