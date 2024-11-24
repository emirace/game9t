import express from 'express';
import { getLatestMessages } from '../controllers/message';

const router = express.Router();

router.get('/', getLatestMessages);

export default router;
