import { IWalletStat } from "../types/wallet";
import api from "./api";

interface AdjustWalletParams {
  userId: string;
  balanceAdjustment?: number;
  isActive?: boolean;
}

export const fetchUserBalance = async () => {
  const response = await api.get(`/wallets/balance`);
  return response.data;
};

export const fundWallet = async (amount: string, reference: string) => {
  const response = await api.post(`/wallets/fund`, {
    amount,
    transactionId: reference,
  });
  return response.data;
};

export const fetchAllWallet = async (data: { page: number; limit: number }) => {
  const response = await api.get(`/wallets/all`, {
    params: { ...data },
  });
  return response.data;
};

export const fetchWalletStats = async (): Promise<IWalletStat> => {
  const response = await api.get(`/wallets/stats`);
  return response.data;
};

export const fetchWalletTransactions = async ({
  id,
  type,
  status,
  page = 1,
  limit = 10,
}: {
  id: string;
  type?: string;
  status?: string;
  page?: number;
  limit?: number;
}): Promise<{
  transactions: any[];
  total: number;
  currentPage: number;
  totalPages: number;
}> => {
  const params: Record<string, any> = { page, limit };
  if (type) params.type = type;
  if (status) params.status = status;

  const response = await api.get(`/wallets/transactions/${id}`, {
    params,
  });

  return response.data;
};

export async function adjustWallet(params: AdjustWalletParams): Promise<{
  balance: number;
  isActive: boolean;
}> {
  const response = await api.put(`/wallets/adjust`, params);
  return response.data;
}
