import express from 'express';
import {
  approveWithdrawalRequest,
  createWithdrawalRequest,
  declineWithdrawalRequest,
  getAllWithdrawalRequests,
} from '../controllers/withdrawalRequest';
import { auth, isAdmin } from '../middlewares/auth';

const router = express.Router();

// Route for admin to get all withdrawal requests with pagination
router.get('/all', auth, isAdmin, getAllWithdrawalRequests);

router.post('/', auth, createWithdrawalRequest);

router.put('/:id/approve', auth, isAdmin, approveWithdrawalRequest);

// Route for admin to decline a withdrawal request
router.put('/:id/decline', auth, isAdmin, declineWithdrawalRequest);

export default router;
