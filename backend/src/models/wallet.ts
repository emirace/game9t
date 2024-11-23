import mongoose, { Schema, Document } from 'mongoose';

interface IWallet extends Document {
  user: mongoose.Types.ObjectId;
  balance: number;
  isActive: boolean;
}

const WalletSchema: Schema<IWallet> = new Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
      required: true,
    },
    isActive: { type: Boolean, default: true },
    balance: {
      type: Number,
      default: 0,
    },
  },
  { timestamps: true },
);

const Wallet = mongoose.model<IWallet>('Wallet', WalletSchema);
export default Wallet;
