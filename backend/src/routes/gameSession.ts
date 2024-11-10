import express from 'express';
import { auth } from '../middlewares/auth';
import { getAllGameSessions } from '../controllers/gameSession';

const router = express.Router();

router.get('/', auth, getAllGameSessions);

export default router;
