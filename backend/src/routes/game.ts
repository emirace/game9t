import express from 'express';
import {
  createGame,
  getAllGames,
  getAllGamesAdmin,
  getGameById,
  updateGame,
} from '../controllers/game';
import { auth, isAdmin } from '../middlewares/auth';

const router = express.Router();

router.get('/', getAllGames);
router.get('/admin', auth, isAdmin, getAllGamesAdmin);
router.get('/:id', getGameById);
router.post('/create', auth, isAdmin, createGame);
router.put('/:id', auth, isAdmin, updateGame);

export default router;
