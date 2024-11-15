import express from 'express';
import { getAdminDashboardStats } from '../controllers/admin';
import { auth, isAdmin } from '../middlewares/auth';

const router = express.Router();

router.get('/dashboard/stats', auth, isAdmin, getAdminDashboardStats);

export default router;
