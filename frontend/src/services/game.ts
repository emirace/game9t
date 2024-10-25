import api from "./api";

export interface IGameData {
  name: string;
  description: string;
  genre: string;
  platforms: string[];
  paid: boolean;
  onlineMultiplayer: boolean;
  active: boolean;
  price: string;
  image: string;
  playPreview: string[];
}
export const getAllGames = async (gameData: {
  search: string;
  freeOnly: boolean;
  page: number;
  limit: number;
}) => {
  const response = await api.get("/games", {
    params: gameData,
  });
  return response.data;
};

export const getAllGamesAdmin = async (gameData: {
  search: string;
  freeOnly: boolean;
  page: number;
  limit: number;
}) => {
  const response = await api.get("/games/admin", {
    params: gameData,
  });
  return response.data;
};

export const getGameById = async (gameId: string) => {
  const response = await api.get(`/games/${gameId}`);
  return response.data;
};

export const createGame = async (gameData: IGameData) => {
  const response = await api.post("/games/create", gameData);
  return response.data;
};

export const updateGame = async (gameId: string, gameData: IGameData) => {
  const response = await api.put(`/games/${gameId}`, gameData);
  return response.data;
};
