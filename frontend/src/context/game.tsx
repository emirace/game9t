// contexts/GameContext.tsx

import React, { createContext, useContext, useState, useEffect } from "react";
import {
  IGameData,
  createGame,
  getAllGames,
  getAllGamesAdmin,
  getGameById,
  updateGame,
} from "../services/game";
import { IGame } from "../types/game";

interface GameContextProps {
  games: IFetchGameData;
  gamesAdmin: IFetchGameData;
  loading: boolean;
  fetchGames: (params: {
    search: string;
    freeOnly: boolean;
    page: number;
    limit: number;
  }) => Promise<void>;

  fetchGamesAdmin: (params: {
    search: string;
    freeOnly: boolean;
    page: number;
    limit: number;
  }) => Promise<IFetchGameData>;
  fetchGameById: (gameId: string) => Promise<IGame>;
  createNewGame: (gameData: IGameData) => Promise<void>;
  updateExistingGame: (gameId: string, gameData: IGameData) => Promise<void>;
}

interface IFetchGameData {
  games: IGame[];
  totalGames: number;
  totalPages: number;
  currentPage: number;
}

const GameContext = createContext<GameContextProps | undefined>(undefined);

export const useGame = () => {
  const context = useContext(GameContext);
  if (!context) {
    throw new Error("useGame must be used within a GameProvider");
  }
  return context;
};

export const GameProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const [games, setGames] = useState<IFetchGameData>({
    games: [],
    totalGames: 0,
    totalPages: 0,
    currentPage: 1,
  });
  const [gamesAdmin, setGamesAdmin] = useState<IFetchGameData>({
    games: [],
    totalGames: 0,
    totalPages: 0,
    currentPage: 1,
  });
  const [loading, setLoading] = useState<boolean>(false);

  const fetchGames = async (params: {
    search: string;
    freeOnly: boolean;
    page: number;
    limit: number;
  }) => {
    try {
      const data = await getAllGames(params);
      setGames(data);
      return data;
    } catch (error) {
      throw error;
    }
  };

  const fetchGamesAdmin = async (params: {
    search: string;
    freeOnly: boolean;
    page: number;
    limit: number;
  }) => {
    try {
      const data = await getAllGamesAdmin(params);
      setGamesAdmin(data);
      return data;
    } catch (error) {
      throw error;
    }
  };

  const fetchGameById = async (gameId: string) => {
    try {
      const data = await getGameById(gameId);
      return data;
    } catch (error) {
      throw error;
    }
  };

  const createNewGame = async (gameData: IGameData) => {
    try {
      await createGame(gameData);
      fetchGames({ search: "", freeOnly: true, page: 1, limit: 12 });
      fetchGamesAdmin({ search: "", freeOnly: true, page: 1, limit: 12 });
    } catch (error) {
      throw error;
    }
  };

  const updateExistingGame = async (gameId: string, gameData: IGameData) => {
    try {
      await updateGame(gameId, gameData);
      fetchGames({ search: "", freeOnly: true, page: 1, limit: 12 });
      fetchGamesAdmin({ search: "", freeOnly: true, page: 1, limit: 12 });
    } catch (error) {
      throw error;
    }
  };

  useEffect(() => {
    setLoading(true);
    fetchGames({ search: "", freeOnly: true, page: 1, limit: 12 })
      .then(() => {
        setLoading(false);
      })
      .catch((error) => {
        console.error(error);
        setLoading(false);
      });
  }, []);

  return (
    <GameContext.Provider
      value={{
        games,
        gamesAdmin,
        loading,
        fetchGames,
        fetchGamesAdmin,
        fetchGameById,
        createNewGame,
        updateExistingGame,
      }}
    >
      {children}
    </GameContext.Provider>
  );
};
