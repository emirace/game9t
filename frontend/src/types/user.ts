export interface IUser {
  _id: string;
  createdAt: Date;
  username: string;
  role: string;
  status: string;
  friends: string[];
  verified: boolean;
  email: string;
  bio: string;
  image: string;
  personalInfo: {
    firstName: string;
    lastName: string;
    phone?: string;
    address?: string;
    country?: string;
    city?: string;
    dateOfBirth?: string;
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
      creditCard?: {
        cardNumber: string;
        expiryDate: string;
        cardHolderName: string;
        cvv: string;
      };
      bankTransfer?: {
        accountNumber: string;
        bankName: string;
        accountHolderName: string;
        code?: string;
      };
      crypto?: {
        walletAddress: string;
        currency: string;
      };
    };
  };
  settings: {
    privacy: {
      profileVisibility: string;
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
    canSendRequest: string;
  };
  totalGamesPlayed: number;
  totalWins: number;
  totalLosses: number;
  totalBets: number;
  totalGamesWithoutBetToday: number;
}

export interface IProfileData {
  username?: string;
  email?: string;
  password?: string;
  bio?: string;
  personalInfo?: {
    firstName?: string;
    lastName?: string;
    phone?: string;
    address?: string;
    country?: string;
    city?: string;
    dateOfBirth?: string;
    profilePictureUrl?: string;
  };
  socialInfo?: {
    facebook?: string;
    x?: string;
    instagram?: string;
    other?: string;
  };
  paymentMethods?: {
    preferredMethod?: string;
    details?: {
      creditCard?: {
        cardNumber?: string;
        expiryDate?: string;
        cardHolderName?: string;
        cvv: string;
      };
      bankTransfer?: {
        accountNumber?: string;
        bankName?: string;
        accountHolderName?: string;
        code?: string;
      };
      crypto?: {
        walletAddress?: string;
        currency?: string;
      };
    };
  };
  settings?: {
    privacy?: {
      profileVisibility?: string;
      gameVisibility?: string;
      searchVisibility?: boolean;
    };
    notifications?: {
      emailNotifications?: {
        gameInvite?: boolean;
        rank?: boolean;
        promotion?: boolean;
      };
      pushNotifications?: boolean;
    };
    security?: {
      twoFactorAuth?: boolean;
      deviceManagement?: Array<{
        deviceId: string;
        lastLogin: Date;
      }>;
    };
  };
  gamePreferences?: {
    preferredGames?: string[];
    language?: string;
    defaultBetValue?: number;
  };
  friendRequests?: {
    canSendRequest?: string;
  };
}

export interface IOnlineUser {
  userId: string;
  socketId: string;
  username: string;
  image: string;
  rating: number;
}

export interface IGetAllUsersResponse {
  users: IUser[];
  totalPages: number;
  currentPage: number;
  totalCount: number;
}
