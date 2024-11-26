import api from "./api";

export const fetchUserTransation = async () => {
  const response = await api.get(`/transactions/user`);
  return response.data;
};

export const fetchAllTransaction = async (data: {
  page: number;
  limit: number;
}) => {
  const response = await api.get(`/transactions`, {
    params: { ...data },
  });
  return response.data;
};

export const fetchTransaction = async (id: string) => {
  const response = await api.get(`/transactions/${id}`);
  return response.data;
};
