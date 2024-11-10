import { IGame } from "./game";
import { IUser } from "./user";

export interface IGameSession {
  _id: string;
  players: IUser[];
  initiatedGame: IGame;
  active: boolean;
  private: boolean;
  amount?: number;
  createdAt: string;
  updatedAt: string;
}
