import { IGameplay } from "./gameplay";

export interface IBet extends Document {
  game: IGameplay;
  session: string;
  amount: number;
  status: "pending" | "ongoing" | "completed";
  payout?: number;
  settlementDate?: Date;
  createdAt: Date;
  _id: string;
}
