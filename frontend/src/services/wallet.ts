import api from "./api";

export const fetchUserBalance = async () => {
  const response = await api.get(`/wallets/balance`);
  return response.data;
};
