import mongoose, { Document, Schema, Types } from 'mongoose';

// Interface for a chat message
export interface IMessage extends Document {
  user: Types.ObjectId;
  content: string;
}

// Chat message schema definition
const messageSchema = new Schema<IMessage>(
  {
    user: { type: Schema.Types.ObjectId, required: true, ref: 'User' },
    content: { type: String, required: true, maxlength: 500 },
  },
  { timestamps: true },
);

// Chat message model
const Message = mongoose.model<IMessage>('Message', messageSchema);
export default Message;
