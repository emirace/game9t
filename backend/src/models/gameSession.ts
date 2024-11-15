import mongoose, { Schema, Document } from 'mongoose';

export interface IGameSession extends Document {
  players: mongoose.Types.ObjectId[];
  initiatedGame: mongoose.Types.ObjectId;
  active: boolean;
  private: boolean;
  amount?: number;
}

const GameSessionSchema: Schema<IGameSession> = new Schema(
  {
    players: [{ type: mongoose.Schema.Types.ObjectId, ref: 'User' }],
    initiatedGame: { type: mongoose.Schema.Types.ObjectId, ref: 'Game' },
    active: { type: Boolean, default: true },
    private: { type: Boolean, default: false },
    amount: { type: Number },
  },
  { timestamps: true },
);

const GameSession = mongoose.model<IGameSession>(
  'GameSession',
  GameSessionSchema,
);
export default GameSession;
