import mongoose, { Schema, Document, Types } from 'mongoose';

interface IWithdrawalRequest extends Document {
  user: Types.ObjectId;
  amount: number;
  status: 'pending' | 'approved' | 'rejected' | 'completed';
}

const WithdrawalRequestSchema: Schema = new Schema(
  {
    user: {
      type: Schema.Types.ObjectId,
      ref: 'User',
      required: true,
    },
    amount: {
      type: Number,
      required: true,
      min: 1,
    },
    status: {
      type: String,
      enum: ['pending', 'approved', 'rejected', 'completed'],
      default: 'pending',
      required: true,
    },
  },
  {
    timestamps: true,
  },
);

const WithdrawalRequest = mongoose.model<IWithdrawalRequest>(
  'WithdrawalRequest',
  WithdrawalRequestSchema,
);
export default WithdrawalRequest;
