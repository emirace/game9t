import express from 'express';
import { auth } from '../middlewares/auth';
import { getUserNotifications } from '../controllers/notification';

const router = express.Router();

router.get('/', auth, getUserNotifications);

export default router;
