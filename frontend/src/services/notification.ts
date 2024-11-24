import api from "./api";

export const fetchUserNotifications = async () => {
  const response = await api.get("/notifications");
  return response.data;
};

export const deleteAllUserNotifications = async () => {
  const response = await api.delete("/notifications");
  return response.data;
};
