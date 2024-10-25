import mongoose, { Schema, Document } from 'mongoose';

// Define an interface for the Gameplay model
interface IGameplay extends Document {
  game: mongoose.Types.ObjectId;
  player1: {
    userId: mongoose.Types.ObjectId;
    status: 'online' | 'offline' | 'in-game' | 'waiting';
    score: number;
  };
  player2?: {
    userId: mongoose.Types.ObjectId;
    status: 'online' | 'offline' | 'in-game' | 'waiting';
    score: number;
  };
  multiplayer: boolean;
  active: boolean;
  startTime: Date;
  endTime?: Date;
  bet?: mongoose.Types.ObjectId;
  winner?: mongoose.Types.ObjectId;
}

// Define the schema for the Gameplay model
const GameplaySchema: Schema<IGameplay> = new Schema(
  {
    game: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Game',
      required: true,
    },
    player1: {
      userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true,
      },
      status: {
        type: String,
        enum: ['online', 'offline', 'in-game', 'waiting'],
        default: 'waiting',
      },
      score: { type: Number, default: 0 },
    },
    player2: {
      userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true,
      },
      status: {
        type: String,
        enum: ['online', 'offline', 'in-game', 'waiting'],
        default: 'waiting',
      },
      score: { type: Number, default: 0 },
    },

    multiplayer: {
      type: Boolean,
      default: false,
    },
    active: {
      type: Boolean,
      default: true,
    },
    startTime: {
      type: Date,
      default: Date.now,
    },
    endTime: Date,
    bet: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Bet',
    },
    winner: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
    },
  },
  { timestamps: true },
);

// Create and export the Gameplay model
const Gameplay = mongoose.model<IGameplay>('Gameplay', GameplaySchema);
export default Gameplay;
