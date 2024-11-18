import express from 'express';
import auth from './auth';
import user from './user';
import game from './game';
import image from './image';
import gameplay from './gameplay';
import transaction from './transaction';
import wallet from './wallet';
import gameSession from './gameSession';
import withdrawalRequest from './withdrawalRequest';
import admin from './admin';
import branding from './branding';
import notification from './notification';

const router = express.Router();

router.use('/auths', auth);
router.use('/users', user);
router.use('/games', game);
router.use('/images', image);
router.use('/gameplays', gameplay);
router.use('/transactions', transaction);
router.use('/wallets', wallet);
router.use('/gameSessions', gameSession);
router.use('/withdrawal-requests', withdrawalRequest);
router.use('/admins', admin);
router.use('/brandings', branding);
router.use('/notifications', notification);

export default router;
