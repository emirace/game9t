import { Outlet } from "react-router-dom";
import { GameSessionProvider } from "../context/gameSession";

function Main() {
  return (
    <GameSessionProvider>
      <Outlet />
    </GameSessionProvider>
  );
}

export default Main;
