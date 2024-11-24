import mongoose, { Schema, Document } from 'mongoose';
import bcrypt from 'bcryptjs';

export interface IUser extends Document {
  username: string;
  password: string;
  role: string;
  status: string;
  friends: mongoose.Types.ObjectId[];
  verified: boolean;
  email: string;
  bio: string;
  rating: number;
  personalInfo: {
    firstName: string;
    lastName: string;
    phone?: string;
    address?: string;
    country?: string;
    city?: string;
    dateOfBirth?: Date;
    profilePictureUrl?: string;
  };
  socialAuth: {
    googleId?: string;
    facebookId?: string;
  };
  socialInfo: {
    facebook?: string;
    x?: string;
    instagram?: string;
    other?: string;
  };
  paymentMethods: {
    preferredMethod: string;
    details: {
      bankTransfer?: {
        accountNumber: string;
        bankName: string;
        accountHolderName: string;
        code: string;
      };
      crypto?: {
        walletAddress: string;
        currency: string;
        network: string;
      };
    };
  };
  settings: {
    privacy: {
      profileVisibility: string; // public, private, friends-only
      gameVisibility: string;
      searchVisibility: boolean;
    };
    notifications: {
      emailNotifications: {
        gameInvite: boolean;
        rank: boolean;
        promotion: boolean;
      };
      pushNotifications: boolean;
    };
    security: {
      twoFactorAuth: boolean;
      deviceManagement: Array<{
        deviceId: string;
        lastLogin: Date;
      }>;
    };
  };
  gamePreferences: {
    preferredGames: string[];
    language: string;
    defaultBetValue: number;
  };
  friendRequests: {
    canSendRequest: string; // everyone, friends of friends, no one
  };
  matchPassword(enteredPassword: string): Promise<boolean>;
}

// Define the schema
const UserSchema: Schema<IUser> = new Schema(
  {
    username: { type: String, required: true, unique: true },
    password: { type: String },
    role: { type: String, enum: ['player', 'admin'], default: 'player' },
    status: {
      type: String,
      enum: ['active', 'inactive', 'banned'],
      default: 'active',
    },
    friends: [{ type: mongoose.Schema.Types.ObjectId, ref: 'User' }],
    verified: { type: Boolean, default: false },
    email: { type: String, required: true, unique: true },
    bio: { type: String },
    rating: { type: Number, dafault: 0 },
    personalInfo: {
      firstName: { type: String },
      lastName: { type: String },
      phone: { type: String },
      address: { type: String },
      country: { type: String },
      city: { type: String },
      dateOfBirth: { type: Date },
      profilePictureUrl: { type: String },
    },
    socialAuth: {
      googleId: { type: String },
      facebookId: { type: String },
    },
    socialInfo: {
      facebook: { type: String },
      x: { type: String },
      instagram: { type: String },
      other: { type: String },
    },
    paymentMethods: {
      preferredMethod: {
        type: String,
        enum: ['creditCard', 'bankTransfer', 'crypto'],
        default: 'creditCard',
      },
      details: {
        bankTransfer: {
          accountNumber: { type: String },
          bankName: { type: String },
          accountHolderName: { type: String },
          code: { type: String },
        },
        crypto: {
          walletAddress: { type: String },
          currency: { type: String },
          network: { type: String },
        },
      },
    },
    settings: {
      privacy: {
        profileVisibility: {
          type: String,
          enum: ['public', 'private', 'friends-only'],
          default: 'public',
        },
        gameVisibility: {
          type: String,
          enum: ['public', 'private', 'friends-only'],
          default: 'public',
        },
        searchVisibility: { type: Boolean, default: true },
      },
      notifications: {
        emailNotifications: {
          gameInvite: { type: Boolean, default: true },
          rank: { type: Boolean, default: true },
          promotion: { type: Boolean, default: true },
        },
        pushNotifications: { type: Boolean, default: true },
      },
      security: {
        twoFactorAuth: { type: Boolean, default: false },
        deviceManagement: [
          {
            deviceId: { type: String },
            lastLogin: { type: Date, default: Date.now },
          },
        ],
      },
    },
    gamePreferences: {
      preferredGames: { type: [String], default: [] },
      language: { type: String, default: 'en' },
      defaultBetValue: { type: Number, default: 10 },
    },
    friendRequests: {
      canSendRequest: {
        type: String,
        enum: ['everyone', 'friends-of-friends', 'no-one'],
        default: 'everyone',
      },
    },
  },
  { timestamps: true },
);

// Hash the password before saving
UserSchema.pre('save', async function (next) {
  const user = this as unknown as IUser;
  if (!user.isModified('password')) return next();

  try {
    const salt = await bcrypt.genSalt(10);
    user.password = await bcrypt.hash(user.password, salt);
    next();
  } catch (error: any) {
    next(error);
  }
});

// Compare entered password with hashed password in DB
UserSchema.methods.matchPassword = async function (enteredPassword: string) {
  return await bcrypt.compare(enteredPassword, this.password);
};

const User = mongoose.model<IUser>('User', UserSchema);
export default User;
