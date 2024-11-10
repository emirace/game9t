import { useState } from "react";
import ICONS from "../../../assets/icons/icons";
import Model from "../../_components/model";
import Rating from "../../_components/rating";
import { useGame } from "../../../context/game";
import { imageUrl } from "../../../services/api";
import { useSocket } from "../../../context/socket";
import { useToastNotification } from "../../../context/toastNotificationContext";
import Loading from "../../_components/loading";
import { useGameSession } from "../../../context/gameSession";
import { IGameSession } from "../../../types/gameSession";

function SaerchPlayer() {
  const { games } = useGame();
  const { onlineUsers, createChallenge } = useSocket();
  const { cancelChallenge } = useGameSession();
  const { addNotification } = useToastNotification();
  const [showConfirm, setShowConfirm] = useState(false);
  const [player, setPlayer] = useState<string | null>(null);
  const [showCompete, setshowCompete] = useState(false);
  const [message, setMessage] = useState("");
  const [success, setSuccess] = useState(false);
  const [gameSession, setGameSession] = useState<IGameSession | null>(null);
  const [cancelling, setCancelling] = useState(false);

  const handleSelectPlayer = (player: string) => {
    setPlayer(player);
    setShowConfirm(true);
  };

  const handleChallenge = async (gameId: string) => {
    if (!player) return;
    // if (!selectedAmount) {
    //   addNotification({ message: "Select an ammount", error: true });
    //   return;
    // }
    try {
      setshowCompete(true);
      setMessage("Craeting Challenge...");
      const res = await createChallenge({
        gameId,
        // amount: parseFloat(selectedAmount),
        compete: player,
      });
      setGameSession(res);
      if (player) {
        setMessage("Wait for opponent to accept challenge");
      } else {
        setMessage("Challenge created Successfully");
        setSuccess(true);
      }
    } catch (error: any) {
      console.log(error);
      addNotification({ message: error.message, error: true });
      setshowCompete(false);
      setSuccess(false);
    }
  };

  const handleCancelChallenge = async () => {
    try {
      if (!gameSession) return;
      setCancelling(true);
      const res = await cancelChallenge({ sessionId: gameSession?._id });

      setMessage("");
      setshowCompete(false);
      setPlayer(null);
      setShowConfirm(false);
      setGameSession(null);
      addNotification({ message: res.message });
    } catch (error: any) {
      addNotification({ message: error.message, error: true });
    } finally {
      setCancelling(false);
    }
  };

  return (
    <div className="mb-30">
      <h2 className="font-jua text-2xl mb-6 text-center ">Search Players</h2>

      <div className="bg-black p-2 flex gap-2 items-center rounded-md mb-6">
        <img src={ICONS.search} alt="search" className="w-4 h-4" />
        <input placeholder="Search players..." className="bg-black" />
      </div>
      {onlineUsers.length <= 0 && (
        <div className="p-4">No player available</div>
      )}
      <div className="flex flex-col gap-4">
        {onlineUsers.map((player) => (
          <div
            onClick={() => handleSelectPlayer(player.userId)}
            className="flex gap-2 items-center justify-between p-4 bg-medium_blue rounded-lg  "
          >
            <div className="flex items-center gap-4">
              <img
                src={player.image}
                alt="Profile"
                className="w-12 h-12 rounded-full"
              />
              <div>
                <div className="font-jua">{player.username}</div>
                <div className="text-xs">
                  <span className="text-green">●</span> online
                </div>
              </div>
              <div className="ml-10">
                <Rating rating={player.rating || 0} />
              </div>
            </div>
            <button className="bg-black text-xs font-jua py-2 px-4 mt-2 rounded-md hover:bg-gray-600">
              Challege Opponent
            </button>
          </div>
        ))}
      </div>
      <div className="mt-6">Total Available Players: {onlineUsers.length}</div>

      <Model isOpen={showConfirm} onClose={() => setShowConfirm(false)}>
        {showCompete ? (
          <div className="flex flex-col justify-center items-center w-full h-full">
            {success ? (
              <img src={ICONS.check_green} className="" />
            ) : (
              <Loading size="lg" />
            )}
            <div className="text-xl font-jua mt-5">{message}</div>

            <button
              onClick={handleCancelChallenge}
              className="bg-red text-white text-xs font-jua py-2 px-4 mt-2 rounded-md disabled:bg-slate-400 "
              disabled={cancelling}
            >
              {cancelling ? "Cancelling" : "Cancel"}
            </button>
          </div>
        ) : (
          <div className="  px-20">
            <div className="text-lg font-jua">
              Please Select Game to Challenge
            </div>
            <div className="grid grid-cols-4 gap-4 ">
              {games.games.map((game) => (
                <div onClick={() => handleChallenge(game._id)}>
                  <img src={imageUrl + game.image} alt="game" className="h-" />
                  <div className="font-jua text-center mt-2">{game.name}</div>
                </div>
              ))}
            </div>
          </div>
        )}
      </Model>
    </div>
  );
}

export default SaerchPlayer;
