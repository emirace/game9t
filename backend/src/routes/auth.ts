import express from 'express';
import {
  registerUser,
  loginUser,
  forgotPassword,
  resetPassword,
  sendVerificationEmail,
  verifyEmail,
} from '../controllers/auth';
import { auth } from '../middlewares/auth';

const router = express.Router();

router.get('/verifyemail/:token', verifyEmail);
router.post('/register', registerUser);
router.post('/login', loginUser);
router.post('/forgotpassword', forgotPassword);
router.post('/sendverificationemail', auth, sendVerificationEmail);
router.put('/resetpassword/:token', resetPassword);

export default router;
