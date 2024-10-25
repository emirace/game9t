import { useEffect, useState } from "react";
import ICONS from "../../../assets/icons/icons";
import { useNavigate } from "react-router-dom";
import { useGame } from "../../../context/game";
import { useToastNotification } from "../../../context/toastNotificationContext";
import { imageUrl } from "../../../services/api";

function BrowseGame() {
  const { games, fetchGames } = useGame();
  const { addNotification } = useToastNotification();
  const [isFreeGames, setIsFreeGames] = useState(true);
  const [searchInput, setSearchInput] = useState("");
  const [loading, setLoading] = useState(true);
  const router = useNavigate();

  const toggleSwitch = () => {
    setIsFreeGames(!isFreeGames);
  };

  useEffect(() => {
    const refreshGames = async () => {
      try {
        setLoading(true);
        await fetchGames({
          search: searchInput,
          freeOnly: isFreeGames,
          page: 1,
          limit: 12,
        });
      } catch (error: any) {
        addNotification({ message: error, error: true });
      } finally {
        setLoading(false);
      }
    };
    refreshGames();
  }, [isFreeGames, searchInput]);

  return (
    <div>
      <div className="flex items-center justify-between my-3 md:my-8">
        <div
          className="relative hidden md:block w-56 h-10 bg-black rounded-full p-1 cursor-pointer transition-all"
          onClick={toggleSwitch}
        >
          <div
            className={`absolute w-1/2 h-full top-0 left-0 p-3 px-10 rounded-full transition-transform duration-300 bg-light_blue ${
              isFreeGames
                ? "transform translate-x-0 "
                : "transform translate-x-28 "
            }`}
          />
          <div className="absolute top-0 left-0 w-full h-full flex items-center justify-between px-6 ">
            <div className="text-xs font-bold ">Free Games</div>
            <div className="text-xs font-bold ">All Games</div>
          </div>
        </div>
        <div className="font-jua text-3xl">Browse Games</div>

        <div className="bg-black p-2 hidden md:flex gap-2 items-center">
          <img src={ICONS.search} alt="search" className="w-4 h-4" />
          <input
            placeholder="Search games"
            value={searchInput}
            onChange={(e) => setSearchInput(e.target.value)}
            className="bg-black"
          />
        </div>
      </div>
      <div className="flex justify-center mb-4">
        <div
          className="relative  md:hidden w-56 h-6 bg-black rounded-full p-1 cursor-pointer transition-all"
          onClick={toggleSwitch}
        >
          <div
            className={`absolute w-1/2 h-full top-0 left-0 p-2 px-8 rounded-full transition-transform duration-300 bg-light_blue ${
              isFreeGames
                ? "transform translate-x-0 "
                : "transform translate-x-28 "
            }`}
          />
          <div className="absolute top-0 left-0 w-full h-full flex items-center justify-between px-6 ">
            <div className="text-xs font-bold ">Free Games</div>
            <div className="text-xs font-bold ">All Games</div>
          </div>
        </div>
      </div>
      {loading ? (
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 ">
          <div className="animate-pulse bg-medium_blue rounded-lg h-40 p-4" />
        </div>
      ) : games.games.length <= 0 ? (
        <div>No games available</div>
      ) : (
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 ">
          {games.games.map((game, index) => (
            <div
              onClick={() => router(`/game/${game._id}`)}
              key={index}
              className="bg-light_blue bg-opacity-35 mb-4"
            >
              <div className="relative">
                <img src={imageUrl + game.image} alt="game" />
                <img
                  src={ICONS.play_green}
                  alt="play"
                  className="absolute top-1/2 left-1/2 w-8 md:w-16 h-8 md:h-16 -translate-x-1/2 -translate-y-1/2 "
                />
              </div>
              <div className="flex items-center justify-between p-2">
                <div className="font-jua text-xs">{game.name}</div>
                <div className="flex items-center gap-1 ">
                  <img
                    src={ICONS.play}
                    alt="play"
                    className="w-3 md:w-4 h-3 md:h-4"
                  />
                  <div className="mr-2">{game.totalPlays}</div>
                  <img
                    src={ICONS.heart}
                    alt="like"
                    className="w-3 md:w-4 h-3 md:h-4"
                  />
                  <img
                    src={ICONS.share}
                    alt="share"
                    className="w-3 md:w-4 h-3 md:h-4"
                  />
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
      <div className="flex justify-center pt-8">
        <button
          //   onClick={onButtonClick}
          className="px-8 py-3 min-w-48 bg-black text-white font-semibold rounded-full hover:bg-dark_blue transition-colors"
        >
          Load More
        </button>
      </div>
    </div>
  );
}

export default BrowseGame;
