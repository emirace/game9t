import { createBrowserRouter } from "react-router-dom";
import Layout from "./pages";
import Home from "./pages/home";
import Game from "./pages/game";
import Wallet from "./pages/wallet";
import Deposit from "./pages/wallet/deposit";
import Withdraw from "./pages/wallet/withdraw";
import Lobby from "./pages/lobby";
import Leaderboard from "./pages/leaderboard";

export const router = createBrowserRouter([
  {
    path: "/",
    element: <Layout />,
    children: [
      { path: "/", element: <Home /> },
      { path: "/game", element: <Game /> },
      { path: "/wallet", element: <Wallet /> },
      { path: "/lobby", element: <Lobby /> },
      { path: "/leaderboard", element: <Leaderboard /> },
      { path: "/wallet/deposit", element: <Deposit /> },
      { path: "/wallet/withdraw", element: <Withdraw /> },
    ],
  },
]);
