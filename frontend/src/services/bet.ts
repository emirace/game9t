import { IBet } from "../types/bet";
import api from "./api";

export interface IBetStat {
  totalBetsPlaced: number;
  totalAmountBet: number;
  totalSettledBets: number;
  totalPendingBets: number;
}

interface IBetData {
  bets: IBet[];
  total: number;
  page: number;
  limit: number;
  totalPages: number;
}

export const fetchBetStats = async (): Promise<IBetStat> => {
  const response = await api.get(`/bets/stats`);
  return response.data;
};

export const fetchBet = async (id: string): Promise<IBet> => {
  const response = await api.get(`/bets/${id}`);
  return response.data;
};

export const fetchAllBets = async (data: {
  page: number;
  limit: number;
  status: string;
}): Promise<IBetData> => {
  const response = await api.get(`/bets`, {
    params: { ...data },
  });
  return response.data;
};

export const updateBetStatus = async (
  betId: string,
  status: "completed" | "rejected"
) => {
  const response = await api.patch(`/bets/${betId}/status`, { status });
  return response.data;
};
