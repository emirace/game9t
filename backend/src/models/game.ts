import mongoose, { Schema, Document } from 'mongoose';

// Define an interface for the Game model
interface IGame extends Document {
  name: string;
  slug: string;
  description: string;
  genre: string[];
  platforms: string[];
  active: boolean;
  userId: mongoose.Types.ObjectId;
  likes: mongoose.Types.ObjectId[];
  paid: boolean;
  onlineMultiplayer: boolean;
  price: number;
  image: string;
  playPreview: string[];
}

// Define the schema for the Game model
const GameSchema: Schema<IGame> = new Schema(
  {
    name: {
      type: String,
      required: true,
      unique: true,
      trim: true,
    },
    slug: {
      type: String,
      required: true,
      unique: true,
      trim: true,
    },
    description: {
      type: String,
      required: true,
      trim: true,
    },
    genre: {
      type: [String],
      required: true,
      enum: ['Puzzle'],
    },
    platforms: {
      type: [String],
      required: true,
      enum: ['Web', 'Android', 'IOS'],
    },
    likes: [{ type: mongoose.Schema.Types.ObjectId, ref: 'User' }],
    userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
    paid: {
      type: Boolean,
      default: false,
    },
    onlineMultiplayer: {
      type: Boolean,
      default: true,
    },
    active: {
      type: Boolean,
      default: true,
    },
    price: {
      type: Number,
      required: true,
      default: 0,
    },
    image: {
      type: String,
      default: '',
    },
    playPreview: {
      type: [String],
      default: [],
    },
  },
  { timestamps: true },
);

// Create and export the Game model
const Game = mongoose.model<IGame>('Game', GameSchema);
export default Game;
