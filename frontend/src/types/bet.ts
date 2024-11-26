import { IGameplay } from "./gameplay";
import { IUser } from "./user";

export interface IBet {
  game: IGameplay;
  session: string;
  amount: number;
  status: "pending" | "ongoing" | "completed";
  payout?: number;
  settlementDate?: Date;
  createdAt: Date;
  _id: string;
  winner?: IUser;
}
