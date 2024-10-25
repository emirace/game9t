import mongoose, { Schema, Document } from 'mongoose';

// Define an interface for the Bet model
interface IBet extends Document {
  game: mongoose.Types.ObjectId;
  session: mongoose.Types.ObjectId;
  amount: number;
  status: 'pending' | 'ongoing' | 'completed';
  payout?: number;
  settlementDate?: Date;
}

// Define the schema for the Bet model
const BetSchema: Schema<IBet> = new Schema(
  {
    game: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Gameplay',
      required: true,
    },
    session: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'GameSession',
      required: true,
    },
    amount: {
      type: Number,
      required: true,
    },
    status: {
      type: String,
      enum: ['pending', 'ongoing', 'completed'],
      default: 'ongoing',
    },
    payout: {
      type: Number,
      default: 0,
    },
    settlementDate: { type: Date },
  },
  { timestamps: true },
);

// Create and export the Bet model
const Bet = mongoose.model<IBet>('Bet', BetSchema);
export default Bet;
