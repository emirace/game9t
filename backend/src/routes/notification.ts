import express from 'express';
import { auth } from '../middlewares/auth';
import {
  deleteAllUserNotifications,
  getUserNotifications,
} from '../controllers/notification';

const router = express.Router();

router.get('/', auth, getUserNotifications);
router.delete('/', auth, deleteAllUserNotifications);

export default router;
