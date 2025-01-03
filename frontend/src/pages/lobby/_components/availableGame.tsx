import { useNavigate } from "react-router-dom";
import ICONS from "../../../assets/icons/icons";
import { useGame } from "../../../context/game";
import { imageUrl } from "../../../services/api";

function AvailableGame() {
  const router = useNavigate();
  const { games, loading } = useGame();

  return (
    <div className="py-20">
      <div className="flex items-center justify-center my-8">
        <div className="font-jua text-3xl">Available Games</div>
      </div>
      {loading ? (
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 ">
          <div className="animate-pulse bg-medium_blue rounded-lg h-40 p-4" />
        </div>
      ) : (
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 ">
          {games.games.map((game, index) => (
            <div
              onClick={() => router(`/game/${game._id}`)}
              key={index}
              className="mb-4 cursor-pointer hover:scale-105 transition-all duration-300 "
            >
              <div className="relative">
                <img src={imageUrl + game.image} alt="game" />
                <img
                  src={ICONS.play_green}
                  alt="play"
                  className="absolute top-1/2 left-1/2 w-16 h-16 -translate-x-1/2 -translate-y-1/2 "
                />
              </div>
              <div className="flex items-center justify-center p-2">
                <div className="font-jua">{game.name}</div>
              </div>
            </div>
          ))}
        </div>
      )}
      <div className="mt-6">Total Available Games: {games.games.length}</div>
    </div>
  );
}

export default AvailableGame;
