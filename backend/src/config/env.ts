import dotenv from 'dotenv';

dotenv.config();

export const port = process.env.PORT || 3000;
export const mongoUrl =
  process.env.MONGO_URI || 'mongodb://localhost:27017/game9t';
export const accessKeyId = process.env.AWS_ACCESS_KEY_ID || '';
export const secretAccessKey = process.env.AWS_SECRET_ACCESS_KEY || '';
export const region = process.env.AWS_BUCKET_REGION || '';
export const bucket = process.env.AWS_BUCKET_NAME || '';
export const frontendUrl = process.env.FRONTEND_URL || 'http://localhost:5173';
export const secretKey = process.env.PAYSTACK_SECRET_KEY;
export const JWT_SECRET = process.env.JWT_SECRET || 'your_jwt_secret_key';
export const ipnSecret = process.env.NOWPAYMENTS_IPN_SECRET || '';

export const user = process.env.GMAIL_USERNAME || '';
export const pass = process.env.GMAIL_PASSWORD || '';
