import express from 'express';
import {
  approveOrRejectBet,
  getBetDetails,
  getBetStats,
  getBets,
} from '../controllers/bet';
import { auth, isAdmin } from '../middlewares/auth';

const router = express.Router();

router.get('/', auth, isAdmin, getBets);
router.get('/stats', auth, isAdmin, getBetStats);
router.get('/:betId', auth, isAdmin, getBetDetails);
router.patch('/:betId/status', auth, isAdmin, approveOrRejectBet);

export default router;
