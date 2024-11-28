import { IGameSession } from "./gameSession";
import { IGameplay } from "./gameplay";
import { IUser } from "./user";

export interface IBet {
  game: IGameplay;
  session: IGameSession;
  amount: number;
  status: "pending" | "ongoing" | "completed";
  payout?: number;
  settlementDate?: Date;
  createdAt: Date;
  _id: string;
  winner?: IUser;
}
