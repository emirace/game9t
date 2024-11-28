import { IUser } from "./user";

export interface ITransaction {
  _id: string;
  user: IUser;
  amount: number;
  status: "Pending" | "Completed" | "Failed" | "Won" | "Loss";
  type: "Deposit" | "Withdrawal" | "Bet";
  paymentMethod: "Credit Card" | "Bank Transfer" | "Crypto";
  transactionType: "debit" | "credit";
  createdAt: string;
  reference?: string;
}
