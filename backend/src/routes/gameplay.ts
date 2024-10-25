import express from 'express';
import { getLeaderboard, getUserGameplays } from '../controllers/gameplay';
import { auth } from '../middlewares/auth';

const router = express.Router();

router.get('/leaderboard', getLeaderboard);
router.get('/user', auth, getUserGameplays);

export default router;
