import {
  GetAllWithdrawalRequestsResponse,
  IWithdrawalRequest,
} from "../types/withdrawalRequest";
import api from "./api";

export const fetchAllWithdrawalRequests = async (
  page: number = 1,
  limit: number = 20,
  status?: "pending" | "approved" | "rejected" | "completed"
): Promise<GetAllWithdrawalRequestsResponse> => {
  const response = await api.get<GetAllWithdrawalRequestsResponse>(
    "/withdrawal-requests/all",
    {
      params: { page, limit, status },
    }
  );
  return response.data;
};

export const approveWithdrawalRequest = async (
  id: string
): Promise<IWithdrawalRequest> => {
  const response = await api.put<IWithdrawalRequest>(
    `/withdrawal-requests/${id}/approve`
  );
  return response.data;
};

// Create a withdrawal request
export const createWithdrawalRequest = async (
  metaData: Record<string, any> = {}
): Promise<{ message: string }> => {
  const response = await api.post(`/withdrawal-requests`, {
    ...metaData,
  });

  return response.data;
};

export const declineWithdrawalRequest = async (
  id: string
): Promise<IWithdrawalRequest> => {
  const response = await api.put<IWithdrawalRequest>(
    `/withdrawal-requests/${id}/decline`
  );
  return response.data;
};
