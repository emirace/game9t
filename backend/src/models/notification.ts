import mongoose, { Schema, Document } from 'mongoose';

export interface INotification extends Document {
  recipient: mongoose.Types.ObjectId; // User receiving the notification
  sender?: mongoose.Types.ObjectId; // Optional: User sending the notification
  type: string; // Type of notification (e.g., "message", "gameInvite", "friendRequest")
  content: string; // The message or content of the notification
  link?: string; // Optional link for action (e.g., URL to a game session or user profile)
  read: boolean; // Whether the notification has been read
  metaData?: Record<string, any>; // Optional field for additional data
}

const NotificationSchema: Schema<INotification> = new Schema(
  {
    recipient: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
      required: true,
    },
    sender: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
    type: { type: String, required: true },
    content: { type: String, required: true },
    link: { type: String },
    read: { type: Boolean, default: false },
    metaData: { type: Schema.Types.Mixed }, // For storing additional info, e.g., gameSessionId
  },
  { timestamps: true },
);

const Notification = mongoose.model<INotification>(
  'Notification',
  NotificationSchema,
);

export default Notification;
