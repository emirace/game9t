import api from "./api";

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
