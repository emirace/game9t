import mongoose from 'mongoose';
import { mongoUrl } from './env';

const connectDB = async () => {
  try {
    const conn = await mongoose.connect(mongoUrl);
    console.log(`MongoDB Connected`);
  } catch (error) {
    console.error(`Error: ${error}`);
    process.exit(1);
  }
};

export default connectDB;
