import { Outlet } from "react-router-dom";
import { GameSessionProvider } from "../context/gameSession";
import ScrollToTop from "./_components/ScrollToTop";

function Main() {
  return (
    <GameSessionProvider>
      <ScrollToTop />
      <Outlet />
    </GameSessionProvider>
  );
}

export default Main;
