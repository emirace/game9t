import { createBrowserRouter } from "react-router-dom";
import Layout from "./pages";
import Home from "./pages/home";
import Game from "./pages/game";
import Wallet from "./pages/wallet";
import Deposit from "./pages/wallet/deposit";
import Withdraw from "./pages/wallet/withdraw";
import Lobby from "./pages/lobby";
import Leaderboard from "./pages/leaderboard";
import Login from "./pages/auth/login";
import Auth from "./pages/auth";
import Register from "./pages/auth/register";
import Profile from "./pages/profile";
import Bio from "./pages/profile/bio";
import Social from "./pages/profile/social";
import Info from "./pages/profile/info";
import Payments from "./pages/profile/payments";
import History from "./pages/profile/history";
import Transaction from "./pages/profile/transaction";
import Settings from "./pages/settings";
import Account from "./pages/settings/account";
import Privacy from "./pages/settings/privacy";
import Notification from "./pages/settings/notification";
import Security from "./pages/settings/security";
import Payment from "./pages/settings/payment";
import Gameplay from "./pages/settings/gameplay";
import Friends from "./pages/settings/friends";
import Delete from "./pages/settings/delete";
import Support from "./pages/support";
import Admin from "./pages/admin";
import Dashboard from "./pages/admin/dashboard";
import Users from "./pages/admin/users";
import GameManage from "./pages/admin/game";
import Walletpayment from "./pages/admin/walletpayment";
import Betting from "./pages/admin/betting";
import Leaderboards from "./pages/admin/leaderboard";
import Site from "./pages/admin/site";
import SettingAdmin from "./pages/admin/settingAdmin";
import Protected from "./pages/protected";

export const router = createBrowserRouter([
  {
    path: "/",
    element: <Layout />,
    children: [
      { path: "/", element: <Home /> },
      { path: "/leaderboard", element: <Leaderboard /> },
      { path: "/support", element: <Support /> },
      {
        path: "/",
        element: <Protected />,
        children: [
          { path: "/wallet", element: <Wallet /> },
          { path: "/lobby", element: <Lobby /> },
          { path: "/wallet/deposit", element: <Deposit /> },
          { path: "/wallet/withdraw", element: <Withdraw /> },
          { path: "/game/:id", element: <Game /> },
          {
            path: "/profile",
            element: <Profile />,
            children: [
              { path: "/profile", element: <Bio /> },
              { path: "social", element: <Social /> },
              { path: "info", element: <Info /> },
              { path: "payments", element: <Payments /> },
              { path: "history", element: <History /> },
              { path: "transactions", element: <Transaction /> },
            ],
          },
          {
            path: "/settings",
            element: <Settings />,
            children: [
              { path: "/settings", element: <Account /> },
              { path: "privacy", element: <Privacy /> },
              { path: "notification", element: <Notification /> },
              { path: "security", element: <Security /> },
              { path: "payment", element: <Payment /> },
              { path: "gameplay", element: <Gameplay /> },
              { path: "friends", element: <Friends /> },
              { path: "delete", element: <Delete /> },
            ],
          },
        ],
      },
    ],
  },
  {
    path: "/admin",
    element: <Admin />,
    children: [
      { path: "/admin", element: <Dashboard /> },
      { path: "users", element: <Users /> },
      { path: "game", element: <GameManage /> },
      { path: "payments", element: <Walletpayment /> },
      { path: "betting", element: <Betting /> },
      { path: "leaderboard", element: <Leaderboards /> },
      { path: "site", element: <Site /> },
      { path: "settings", element: <SettingAdmin /> },
    ],
  },
  {
    path: "/auth",
    element: <Auth />,
    children: [
      { path: "login", element: <Login /> },
      { path: "register", element: <Register /> },
    ],
  },
]);