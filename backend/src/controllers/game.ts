import { Request, Response } from 'express';
import Game from '../models/game';
import { AuthenticatedRequest } from '../middlewares/auth';
import Gameplay from '../models/gameplay';

// Controller to create a new game
export const createGame = async (req: AuthenticatedRequest, res: Response) => {
  const userId = req?.user?._id!;
  try {
    const {
      name,
      description,
      genre,
      platforms,
      paid,
      onlineMultiplayer,
      active,
      price,
      image,
      playPreview,
    } = req.body;

    // Validate required fields
    if (!name || !description || !genre || !platforms) {
      res.status(400).json({ message: 'Please provide all required fields' });
      return;
    }

    // Create a new game instance
    const game = new Game({
      userId,
      name,
      description,
      genre,
      platforms,
      paid,
      onlineMultiplayer,
      active,
      price,
      image,
      playPreview,
    });

    // Save the game to the database
    const savedGame = await game.save();
    res.status(201).json(savedGame);
  } catch (error) {
    console.error('Error creating game:', error);
    res.status(500).json({ message: 'Failed to create game' });
  }
};

export const getAllGames = async (req: Request, res: Response) => {
  try {
    const { search, filter, page = 1, limit = 12 } = req.query;

    const pageNumber = Number(page);
    const limitNumber = Number(limit);

    const query: any = {
      active: true,
    };

    if (search) {
      query.$or = [
        { name: { $regex: search, $options: 'i' } },
        { description: { $regex: search, $options: 'i' } },
        { genre: { $regex: search, $options: 'i' } },
      ];
    }

    if (filter) {
      query.paid = filter === 'paid';
    }

    const totalGames = await Game.countDocuments(query);
    const totalPages = Math.ceil(totalGames / limitNumber);
    const skip = (pageNumber - 1) * limitNumber;

    // Fetch games based on query with pagination
    const games = await Game.find(query)
      .sort({ createdAt: -1 })
      .skip(skip)
      .limit(limitNumber);

    // Fetch total plays for each game
    const gameIds = games.map((game) => game._id);
    const playsData = await Gameplay.aggregate([
      { $match: { game: { $in: gameIds } } },
      { $group: { _id: '$gameId', totalPlays: { $sum: 1 } } },
    ]);

    // Create a map of gameId -> totalPlays
    const playsMap = playsData.reduce(
      (acc, { _id, totalPlays }) => {
        acc[_id.toString()] = totalPlays;
        return acc;
      },
      {} as Record<string, number>,
    );

    // Append total plays to each game object
    const gamesWithPlays = games.map((game) => ({
      ...game.toObject(),
      totalPlays: playsMap[(game._id as string).toString()] || 0, // Default to 0 if no plays recorded
    }));

    res.status(200).json({
      games: gamesWithPlays,
      totalGames,
      totalPages,
      currentPage: pageNumber,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server error' });
  }
};

export const getAllGamesAdmin = async (req: Request, res: Response) => {
  try {
    const { search, filter, page = 1, limit = 12 } = req.query;

    const pageNumber = Number(page);
    const limitNumber = Number(limit);

    const query: any = {};

    if (search) {
      query.$or = [
        { name: { $regex: search, $options: 'i' } },
        { description: { $regex: search, $options: 'i' } },
        { genre: { $regex: search, $options: 'i' } },
      ];
    }

    if (filter) {
      if (filter === 'paid') {
        query.paid = true;
      } else if (filter === 'free') {
        query.paid = false;
      }
    }

    const totalGames = await Game.countDocuments(query);

    const totalPages = Math.ceil(totalGames / limitNumber);

    const skip = (pageNumber - 1) * limitNumber;

    const games = await Game.find(query)
      .sort({ createdAt: -1 })
      .skip(skip)
      .limit(limitNumber);

    // Fetch total plays for each game
    const gameIds = games.map((game) => game._id);
    const playsData = await Gameplay.aggregate([
      { $match: { game: { $in: gameIds } } },
      { $group: { _id: '$gameId', totalPlays: { $sum: 1 } } },
    ]);

    // Create a map of gameId -> totalPlays
    const playsMap = playsData.reduce(
      (acc, { _id, totalPlays }) => {
        acc[_id.toString()] = totalPlays;
        return acc;
      },
      {} as Record<string, number>,
    );

    // Append total plays to each game object
    const gamesWithPlays = games.map((game) => ({
      ...game.toObject(),
      totalPlays: playsMap[(game._id as string).toString()] || 0, // Default to 0 if no plays recorded
    }));

    res.status(200).json({
      games: gamesWithPlays,
      totalGames,
      totalPages,
      currentPage: pageNumber,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server error' });
  }
};

export const getGameById = async (req: Request, res: Response) => {
  const { id } = req.params;

  try {
    const game = await Game.findById(id);

    if (!game) {
      res.status(404).json({ message: 'Game not found' });
      return;
    }

    // Return the game details
    res.status(200).json(game);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server error' });
  }
};

export const updateGame = async (req: AuthenticatedRequest, res: Response) => {
  const { id } = req.params;
  const updates = req.body;

  try {
    // Find the game by ID and update it
    const updatedGame = await Game.findByIdAndUpdate(id, updates, {
      new: true,
    });

    // If the game is not found, return a 404 error
    if (!updatedGame) {
      res.status(404).json({ message: 'Game not found' });
      return;
    }

    // Return the updated game details
    res.status(200).json({ data: updatedGame });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server error' });
  }
};
