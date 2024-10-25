import mongoose, { Schema, Document } from 'mongoose';

interface IGameSession extends Document {
  player1: mongoose.Types.ObjectId;
  player2?: mongoose.Types.ObjectId;
  active: boolean;
  games: mongoose.Types.ObjectId[];
  sessionStart: Date;
  sessionEnd?: Date;
}

const GameSessionSchema: Schema<IGameSession> = new Schema(
  {
    player1: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
      required: true,
    },
    player2: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
    active: { type: Boolean, default: true },
    games: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'GamePlay',
        required: true,
      },
    ],
    sessionStart: { type: Date, default: Date.now },
    sessionEnd: { type: Date },
  },
  { timestamps: true },
);

const GameSession = mongoose.model<IGameSession>(
  'GameSession',
  GameSessionSchema,
);
export default GameSession;
