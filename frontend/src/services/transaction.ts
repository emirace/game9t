import api from "./api";

export const fetchUserTransation = async () => {
  const response = await api.get(`/transactions/user`);
  return response.data;
};

export const fetchAllTransaction = async () => {
  const response = await api.get(`/transactions`);
  return response.data;
};
