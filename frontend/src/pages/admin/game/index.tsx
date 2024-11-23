import { useEffect, useState } from "react";
import ICONS from "../../../assets/icons/icons";
import { useGame } from "../../../context/game";
import { useToastNotification } from "../../../context/toastNotificationContext";
import Model from "../../_components/model";
import AddGame from "./_components/addGame";
import { imageUrl } from "../../../services/api";
import { IGame } from "../../../types/game";

function GameManage() {
  const { gamesAdmin: games, fetchGamesAdmin } = useGame();
  const { addNotification } = useToastNotification();
  const [searchInput, setSearchInput] = useState("");
  const [loading, setLoading] = useState(true);
  const [page, setPage] = useState(1);
  const [showAddGame, setShowAddGame] = useState(false);
  const [isEditMode, setIsEditMode] = useState(false);
  const [editGameId, setEditGameId] = useState<string | undefined>();
  const [initialGameData, setInitialGameData] = useState<IGame | undefined>();

  useEffect(() => {
    const refreshGames = async () => {
      try {
        setLoading(true);
        await fetchGamesAdmin({
          search: searchInput,
          freeOnly: false,
          page,
          limit: 12,
        });
      } catch (error: any) {
        addNotification({ message: error, error: true });
      } finally {
        setLoading(false);
      }
    };
    refreshGames();
  }, [page, searchInput]);

  const openEditGameForm = (gameId: string, gameData: IGame) => {
    setShowAddGame(true);
    setIsEditMode(true);
    setEditGameId(gameId);
    setInitialGameData(gameData);
  };

  const closeEditGameForm = () => {
    setShowAddGame(false);
    setIsEditMode(false);
    setEditGameId(undefined);
    setInitialGameData(undefined);
  };

  return (
    <div>
      <h1 className="font-jua text-xl">Game Management</h1>
      <div className="text-sm mb-6">Manage Your Games</div>
      <div className="flex flex-col md:flex-row md:items-center justify-between mb-4">
        <div className="font-jua text-lg">All Games ({games.totalGames})</div>
        <div className="flex items-center gap-3">
          <img src={ICONS.filter} className="w-4" />
          <input
            placeholder="Search"
            className="bg-black w-full p-2 rounded-md"
            value={searchInput}
            onChange={(e) => setSearchInput(e.target.value)}
          />
          <button
            onClick={() => setShowAddGame(true)}
            className="rounded-md bg-white text-black whitespace-nowrap p-1 px-2"
          >
            Add Game
          </button>
        </div>
      </div>

      {loading ? (
        <div className="grid md:grid-cols-3 gap-4 ">
          <div className="animate-pulse bg-medium_blue rounded-lg h-40 p-4" />
        </div>
      ) : games.games.length <= 0 ? (
        <div>No games available</div>
      ) : (
        <div className="grid md:grid-cols-3 gap-4">
          {games.games.map((game) => (
            <div key={game._id} className=" rounded-lg overflow-hidden  ">
              <div className="flex-1 relative h-40">
                <img
                  src={imageUrl + game.image}
                  className="w-full h-40"
                  alt="game"
                />

                <div className=" absolute right-0 top-0 w-1/2 h-full bg-light_blue p-4 text-sm rounded-r-lg">
                  <div className="font-jua text-base">{game.name}</div>
                  <div className="mb-2">{game.genre}</div>
                  <div className="mb-4">{game.totalPlays} plays</div>
                  <div className="flex items-center justify-between">
                    <button
                      className={`${
                        game.active ? "bg-green" : "bg-red"
                      } text-xs p-1 px-4 rounded-full`}
                    >
                      {game.active ? "Active" : "Inactive"}
                    </button>
                    <button
                      onClick={() => openEditGameForm(game._id, game)}
                      className="text-sm"
                    >
                      Edit
                    </button>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}

      <div className="flex justify-between items-center mt-6 mb-16 ">
        <span>
          Showing: {games.games.length} / {games.totalGames}
        </span>
        <div>
          <button
            disabled={page <= 1}
            onClick={() => (page > 1 ? setPage(page - 1) : null)}
            className="hover:underline mr-4 disabled:text-gray-500"
          >
            PREVIOUS /
          </button>
          <button
            onClick={() => (page < games.totalGames ? setPage(page + 1) : null)}
            disabled={page >= games.totalPages}
            className="hover:underline disabled:text-gray-500"
          >
            NEXT
          </button>
        </div>
      </div>
      <Model isOpen={showAddGame} onClose={() => closeEditGameForm()}>
        <AddGame
          onClose={() => setShowAddGame(false)}
          gameId={isEditMode ? editGameId : undefined}
          initialGameData={isEditMode ? initialGameData : undefined}
        />
      </Model>
    </div>
  );
}

export default GameManage;
