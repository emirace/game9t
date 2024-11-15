import { IUser } from "./user";

export interface IWallet {
  _id: string;
  createdAt: string;
  user: IUser;
  balance: number;
  isActive: boolean;
}
