export interface IGame {
  _id: string;
  name: string;
  slug: string;
  description: string;
  genre: string[];
  platforms: string[];
  active: boolean;
  userId: string;
  likes: string[];
  paid: boolean;
  onlineMultiplayer: boolean;
  price: number;
  image: string;
  playPreview: string[];
  totalPlays: number;
}

export interface createGameData {
  gameId: string;
  amount?: number;
  compete?: string;
}
