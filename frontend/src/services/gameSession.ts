import { IGameSession } from "../types/gameSession";
import api from "./api";

// Fetch game sessions function
export const fetchGameSessions = async (): Promise<IGameSession[]> => {
  try {
    const response = await api.get("/gamesessions");
    return response.data;
  } catch (error: any) {
    console.error("Error fetching game sessions:", error);
    throw new Error(
      error?.response?.data?.error || "Failed to fetch game sessions"
    );
  }
};

export const fetchGameSessionById = async (
  id: string
): Promise<IGameSession> => {
  const response = await api.get(`/gamesessions/${id}`);
  return response.data;
};
