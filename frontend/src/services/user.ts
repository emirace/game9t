import { IProfileData } from "../types/user";
import api from "./api";

export const getUserProfile = async () => {
  const response = await api.get("/users/");
  return response.data;
};

export const updateUserProfile = async (profileData: IProfileData) => {
  const response = await api.put("/users/", profileData);
  return response.data;
};
