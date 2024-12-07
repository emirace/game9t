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

export interface ILeaderBoard {
  _id: {
    _id: string;
    username: string;
    personalInfo?: { profilePictureUrl?: string };
  };
  totalGamesPlayed: number;
  totalWins: number;
  totalLosses: number;
  currentScore: number;
  totalEarnings: number;
}
