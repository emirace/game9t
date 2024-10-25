import express from 'express';
import { auth } from '../middlewares/auth';
import { deleteImage, downloadImage, uploadImage } from '../controllers/image';

const router = express.Router();

router.post('/', auth, uploadImage);

router.get('/:key', downloadImage);

router.delete('/:image', auth, deleteImage);

export default router;
