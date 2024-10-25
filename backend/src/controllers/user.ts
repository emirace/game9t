import { Request, Response } from 'express';
import User from '../models/user';
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

    // Create a single user object with the additional statistics
    const userProfile = {
      ...user.toObject(),
      totalGamesPlayed,
      totalWins,
      totalLosses,
      totalBets,
    };

    res.json(userProfile);
  } catch (error) {
    console.error(error);
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
