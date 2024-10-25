import mongoose, { Schema, Document } from 'mongoose';

export interface IToken extends Document {
  userId: mongoose.Types.ObjectId;
  token: string;
  type: string;
  expiresAt: Date;
}

const tokenSchema: Schema<IToken> = new Schema({
  userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  token: { type: String, required: true },
  type: { type: String, required: true },
  expiresAt: { type: Date, required: true },
});

const Token = mongoose.model<IToken>('Token', tokenSchema);
export default Token;
