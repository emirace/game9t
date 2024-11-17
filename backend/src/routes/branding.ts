import express from 'express';
import {
  getBrandingDetails,
  updateBrandingDetails,
} from '../controllers/branding';
import { auth, isAdmin } from '../middlewares/auth';

const router = express.Router();

// Route to fetch branding details
router.get('/', getBrandingDetails);
router.put('/', auth, isAdmin, updateBrandingDetails);

export default router;
