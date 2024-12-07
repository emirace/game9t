import express from 'express';
import {
  getAllUsers,
  getUserProfile,
  inviteUser,
  updateUserById,
  updateUserProfile,
} from '../controllers/user';
import { auth, isAdmin } from '../middlewares/auth';

const router = express.Router();

router.get('/', auth, getUserProfile);
router.get('/all', auth, isAdmin, getAllUsers);
router.post('/invite', auth, inviteUser);
router.put('/', auth, updateUserProfile);
router.put('/:userId', auth, isAdmin, updateUserById);

export default router;
