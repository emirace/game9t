import { IBet } from "./bet";
import { IGame } from "./game";
import { IUser } from "./user";

export interface IGameplay {
  game: IGame;
  player1: {
    userId: IUser;
    status: "online" | "offline" | "in-game" | "waiting";
    score: number;
  };
  player2?: {
    userId: IUser;
    status: "online" | "offline" | "in-game" | "waiting";
    score: number;
  };
  multiplayer: boolean;
  active: boolean;
  startTime: Date;
  endTime?: Date;
  bet?: IBet;
  winner?: IUser;
  createdAt: Date;
  _id: string;
}
