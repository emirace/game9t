import api from "./api";

export const getLatestMessages = async () => {
  const response = await api.get("/messages");
  return response.data;
};
