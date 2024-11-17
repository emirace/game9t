import api from "./api";

export const getBrandingDetails = async () => {
  const response = await api.get("/brandings");
  return response.data;
};

export const updateBrandingDetails = async (updates: Partial<any>) => {
  const response = await api.put("/brandings", updates);
  return response.data;
};
