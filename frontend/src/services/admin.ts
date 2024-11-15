import api from "./api";

export const getDashboardStat = async () => {
  const response = await api.get("/admins/dashboard/stats");
  return response.data;
};
