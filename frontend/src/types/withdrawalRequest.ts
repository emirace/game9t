import { IUser } from "./user";

export interface IWithdrawalRequest {
  _id: string;
  user: IUser;
  amount: number;
  status: "pending" | "approved" | "rejected" | "completed";
  createdAt: string;
}

export interface GetAllWithdrawalRequestsResponse {
  withdrawalRequests: IWithdrawalRequest[];
  totalPages: number;
  currentPage: number;
  totalCount: number;
}
