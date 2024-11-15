import express from 'express';
import {
  getAllUsers,
  getUserProfile,
  updateUserProfile,
} from '../controllers/user';
import { auth, isAdmin } from '../middlewares/auth';

const router = express.Router();

router.get('/', auth, getUserProfile);
router.get('/all', auth, isAdmin, getAllUsers);
router.put('/', auth, updateUserProfile);

export default router;
