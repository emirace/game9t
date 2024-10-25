import express from 'express';
import {
  getUserTransactions,
  getAllTransactions,
} from '../controllers/transaction';
import { auth, isAdmin } from '../middlewares/auth';

const router = express.Router();

router.get('/user', auth, getUserTransactions);

router.get('/', auth, isAdmin, getAllTransactions);

export default router;
