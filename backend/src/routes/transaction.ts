import express from 'express';
import {
  getUserTransactions,
  getAllTransactions,
  getTransactionDetail,
} from '../controllers/transaction';
import { auth, isAdmin } from '../middlewares/auth';

const router = express.Router();

router.get('/', auth, isAdmin, getAllTransactions);
router.get('/user', auth, getUserTransactions);
router.get('/:id', auth, isAdmin, getTransactionDetail);

export default router;
