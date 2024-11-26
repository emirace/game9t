import { Request, Response } from 'express';
import User, { IUser } from '../models/user';
import { AuthenticatedRequest } from '../middlewares/auth';
import Gameplay from '../models/gameplay';
import Bet from '../models/bet';

export const getUserProfile = async (
  req: AuthenticatedRequest,
  res: Response,
) => {
  try {
    const user = await User.findById(req.user!._id).select('-password');

    if (!user) {
      res.status(404).json({ message: 'User not found' });
      return;
    }

    // Fetch total games played
    const totalGamesPlayed = await Gameplay.countDocuments({
      $or: [{ 'player1.userId': user._id }, { 'player2.userId': user._id }],
    });

    // Fetch total wins
    const totalWins = await Gameplay.countDocuments({
      winner: user._id,
    });

    // Fetch total losses
    const totalLosses = totalGamesPlayed - totalWins;

    // Fetch total bets associated with the user's gameplay
    const totalBets = await Bet.countDocuments({
      game: {
        $in: await Gameplay.find(
          {
            $or: [
              { 'player1.userId': user._id },
              { 'player2.userId': user._id },
            ],
          },
          { _id: 1 },
        ),
      },
    });

    // Fetch total games played today without a bet
    const startOfToday = new Date();
    startOfToday.setHours(0, 0, 0, 0); // Set to 12:00 AM of today

    const totalGamesWithoutBetToday = await Gameplay.countDocuments({
      $or: [{ 'player1.userId': user._id }, { 'player2.userId': user._id }],
      bet: { $exists: false }, // Exclude games with a bet
      endTime: { $gte: startOfToday }, // Games that ended today
    });

    // Create a single user object with the additional statistics
    const userProfile = {
      ...user.toObject(),
      totalGamesPlayed,
      totalWins,
      totalLosses,
      totalBets,
      totalGamesWithoutBetToday,
    };

    res.json(userProfile);
  } catch (error) {
    console.error('Error fetching user profile:', error);
    res.status(500).json({ message: 'Server error' });
  }
};

export const updateUserProfile = async (
  req: AuthenticatedRequest,
  res: Response,
) => {
  const userId = req.user!.id;
  const {
    username,
    email,
    password,
    bio,
    personalInfo,
    socialInfo,
    paymentMethods,
    settings,
    gamePreferences,
    friendRequests,
  } = req.body;

  try {
    // Find the user by ID
    const user = await User.findById(userId).select('-password');

    if (!user) {
      res.status(404).json({ message: 'User not found' });
      return;
    }

    // Check if username or email already exists (excluding current user)
    if (username && username !== user.username) {
      const usernameExists = await User.findOne({ username });
      if (usernameExists) {
        res.status(400).json({ message: 'Username is already taken' });
        return;
      }
      user.username = username; // Update username
    }

    if (email && email !== user.email) {
      const emailExists = await User.findOne({ 'personalInfo.email': email });
      if (emailExists) {
        res.status(400).json({ message: 'Email is already taken' });
        return;
      }
      user.email = email;
      user.verified = false;
    }

    // Update password if provided (hash the new password)
    if (password) {
      user.password = password;
    }
    if (bio) {
      user.bio = bio;
    }

    // Update other allowed fields
    if (personalInfo) {
      user.personalInfo = { ...user.personalInfo, ...personalInfo };
    }
    if (socialInfo) {
      user.socialInfo = { ...user.socialInfo, ...socialInfo };
    }
    if (paymentMethods) {
      user.paymentMethods = { ...user.paymentMethods, ...paymentMethods };
    }
    if (settings) {
      user.settings = { ...user.settings, ...settings };
    }
    if (gamePreferences) {
      user.gamePreferences = { ...user.gamePreferences, ...gamePreferences };
    }
    if (friendRequests) {
      user.friendRequests = { ...user.friendRequests, ...friendRequests };
    }

    // Save the updated user
    const updatedUser = await user.save();

    // Return the updated user profile (without password)
    res.json(updatedUser);
  } catch (error) {
    res.status(500).json({ message: 'Server error' });
    console.log(error);
  }
};

export const getAllUsers = async (req: Request, res: Response) => {
  try {
    const { page = 1, limit = 20, search = '' } = req.query;
    const query: any = {};

    // If search parameter is provided, add search logic
    if (search) {
      query.$or = [
        { username: { $regex: search, $options: 'i' } },
        { firstName: { $regex: search, $options: 'i' } },
        { lastName: { $regex: search, $options: 'i' } },
        { email: { $regex: search, $options: 'i' } },
      ];
    }

    // Pagination logic
    const users: IUser[] = await User.find(query)
      .select('-password')
      .limit(+limit)
      .skip((+page - 1) * +limit)
      .exec();

    // Get total count of users (without pagination)
    const totalCount: number = await User.countDocuments(query);

    res.json({
      users,
      totalPages: Math.ceil(totalCount / +limit),
      currentPage: +page,
      totalCount,
    });
  } catch (error) {
    console.error('Error fetching all users', error);
    res.status(500).json({ message: 'Error fetching all users', error });
  }
};

export const inviteUser = async (req: AuthenticatedRequest, res: Response) => {
  try {
    const userId = req.user!.id;
    const { email } = req.body;
    if (!email) {
      res.status(400).json({ message: 'Email is required' });
      return;
    }

    const user = await User.findById(userId).select('-password');

    if (!user) {
      res.status(404).json({ message: 'User not found' });
      return;
    }

    const message = `${user.username} invites tou to join Game9t ${req.protocol}://${req.get('host')}`;
    console.log(message);
    // await sendEmail({
    //   email: user.email,
    //   subject: 'Email Verification',
    //   message,
    // });

    res.status(200).json({
      message: 'Email sent successfully',
    });
  } catch (error) {
    console.error('Error inviting user', error);
    res.status(500).json({ message: 'Error inviting user', error });
  }
};
