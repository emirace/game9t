import api from "./api";

export const fetchLeaderboard = async () => {
  const response = await api.get("/gameplays/leaderboard");
  return response.data.leaderboard;
};

export const fetchUserGameplays = async () => {
  const response = await api.get(`/gameplays/user`);
  return response.data.gameplays;
};
