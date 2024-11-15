import express from 'express';
import {
  approveWithdrawalRequest,
  declineWithdrawalRequest,
  getAllWithdrawalRequests,
} from '../controllers/withdrawalRequest';
import { auth, isAdmin } from '../middlewares/auth';

const router = express.Router();

// Route for admin to get all withdrawal requests with pagination
router.get('/all', auth, isAdmin, getAllWithdrawalRequests);

router.put('/:id/approve', approveWithdrawalRequest);

// Route for admin to decline a withdrawal request
router.put('/:id/decline', declineWithdrawalRequest);

export default router;
