import api from "./api";

export const fetchUserNotifications = async () => {
  const response = await api.get("/notifications");
  return response.data;
};
