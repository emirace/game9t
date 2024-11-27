import express from 'express';
import { auth } from '../middlewares/auth';
import {
  getAllGameSessions,
  getGameSessionById,
} from '../controllers/gameSession';

const router = express.Router();

router.get('/', auth, getAllGameSessions);
router.get('/:sessionId', auth, getGameSessionById);

export default router;
