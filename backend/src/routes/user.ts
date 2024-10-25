import express from 'express';
import { getUserProfile, updateUserProfile } from '../controllers/user';
import { auth } from '../middlewares/auth';

const router = express.Router();

router.get('/', auth, getUserProfile);
router.put('/', auth, updateUserProfile);

export default router;
