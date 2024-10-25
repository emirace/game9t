import express from 'express';
import auth from './auth';
import user from './user';
import game from './game';
import image from './image';
import gameplay from './gameplay';
import transaction from './transaction';
import wallet from './wallet';

const router = express.Router();

router.use('/auths', auth);
router.use('/users', user);
router.use('/games', game);
router.use('/images', image);
router.use('/gameplays', gameplay);
router.use('/transactions', transaction);
router.use('/wallets', wallet);

export default router;
