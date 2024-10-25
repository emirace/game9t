import mongoose, { Schema, Document } from 'mongoose';

// Define an interface for the Transaction model
interface ITransaction extends Document {
  user: mongoose.Types.ObjectId;
  amount: number;
  status: 'Pending' | 'Completed' | 'Failed' | 'Won' | 'Loss';
  type: 'Deposit' | 'Withdrawal' | 'Bet';
  paymentMethod: 'Credit Card' | 'Bank Transfer' | 'Crypto';
}

// Define the schema for the Transaction model
const TransactionSchema: Schema<ITransaction> = new Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
      required: true,
    },
    amount: {
      type: Number,
      required: true,
    },
    status: {
      type: String,
      enum: ['Pending', 'Completed', 'Failed', 'Won', 'Loss'],
      default: 'Pending',
    },
    type: {
      type: String,
      enum: ['Deposit', 'Withdrawal', 'Bet'],
      required: true,
    },
    paymentMethod: {
      type: String,
      enum: ['Credit Card', 'Bank Transfer', 'Crypto'],
      required: true,
    },
  },
  { timestamps: true },
);

// Create and export the Transaction model
const Transaction = mongoose.model<ITransaction>(
  'Transaction',
  TransactionSchema,
);
export default Transaction;
