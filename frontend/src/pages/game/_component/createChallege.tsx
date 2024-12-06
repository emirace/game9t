import { useState } from "react";
import PlaceBet from "./sidebar/_component/placeBet";
import { useSocket } from "../../../context/socket";
import ICONS from "../../../assets/icons/icons";
import { imageUrl } from "../../../services/api";
import IMAGES from "../../../assets/images/images";
import { useToastNotification } from "../../../context/toastNotificationContext";
import { useGameSession } from "../../../context/gameSession";
import Loading from "../../_components/loading";

interface Props {
  gameId?: string;
}

function CreateChallege({ gameId }: Props) {
  const { onlineUsers } = useSocket();
  const {
    selectedAmount,
    setSelectedAmount,
    createChallenge,
    mode,
    gameSession,
    startComputerGame,
    startPlayerGame,
  } = useGameSession();
  const { addNotification } = useToastNotification();
  const [step, setStep] = useState("bet");
  const [opponent, setOpponent] = useState("");
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);

  const handleChallenge = async () => {
    if (!gameId) return;
    try {
      setLoading(true);
      await createChallenge({
        gameId,
        amount: parseFloat(selectedAmount),
        compete: opponent,
      });
      setSuccess(true);
      setSelectedAmount("");
    } catch (error: any) {
      console.log(error);
      addNotification({ message: error.message, error: true });
    } finally {
      setLoading(false);
    }
  };

  const handleContinue = async () => {
    if (!gameId) return;
    if (parseFloat(selectedAmount) < 100) {
      addNotification({ message: "Enter a valid amount", error: true });
      return;
    }
    if (mode === "computer") {
      setOpponent("");
      startComputerGame(gameId, parseFloat(selectedAmount));
    } else {
      setStep("players");
    }
  };

  const handleStart = () => {
    startPlayerGame(opponent);
  };

  const renderScreen = () => {
    switch (step) {
      case "bet":
        return (
          <div>
            <div className="font-jua text-2xl mb-6">Place Bet</div>
            <PlaceBet
              selectedAmount={selectedAmount}
              setSelectedAmount={setSelectedAmount}
            />
            <div className="flex items-center justify-center mt-6 gap-4 ">
              <button
                onClick={handleContinue}
                className="bg-cream flex items-center rounded-full text-black font-bold py-2 px-10  mt-4 disabled:bg-gray-300"
                disabled={!selectedAmount}
              >
                {loading && <Loading size="sm" />}
                Continue
              </button>
            </div>
          </div>
        );
        break;
      case "players":
        return (
          <div>
            <h2 className="font-jua text-2xl mb-6 ">Search Players</h2>

            <div className="bg-black p-2 flex gap-2 items-center rounded-md mb-6">
              <img src={ICONS.search} alt="search" className="w-4 h-4" />
              <input
                placeholder="Search players..."
                className="bg-black w-full"
              />
            </div>
            {onlineUsers.length <= 0 && (
              <div className="p-4">No player available</div>
            )}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              {onlineUsers.map((player) => (
                <div
                  key={player.userId}
                  className={`flex flex-col gap-2 justify-center items-center p-4 ${
                    opponent === player.userId ? "bg-medium_blue" : "bg-dark"
                  } rounded-lg`}
                >
                  <img
                    src={player.image ? imageUrl + player.image : IMAGES.user2}
                    alt="Profile"
                    className="w-12 h-12 rounded-full"
                  />
                  <div className="font-jua">{player.username} </div>
                  <div className="text-xs">
                    <span className="text-green">●</span> online
                  </div>
                  <button
                    onClick={() =>
                      opponent === player.userId
                        ? setOpponent("")
                        : setOpponent(player.userId)
                    }
                    className={`${
                      opponent === player.userId ? "bg-black" : ""
                    } text-xs font-jua py-1 px-2 mt-2 rounded-md hover:bg-gray-600 disabled:hidden`}
                    disabled={!!gameSession || success}
                  >
                    {opponent === player.userId ? "Seleted" : "Compete"}
                  </button>
                </div>
              ))}
            </div>

            {gameSession || success ? (
              <div className="flex items-center flex-col justify-center mt-6 gap-4 ">
                <div>Challenge created sucessfully</div>
                <button
                  onClick={handleStart}
                  className="bg-cream flex items-center rounded-full text-black font-bold py-2 px-10  mt-4 disabled:bg-gray-300"
                >
                  {!opponent ? "Continue" : "Start Game"}
                </button>
              </div>
            ) : (
              <div className="flex items-center justify-end mt-6 gap-4 ">
                <button
                  onClick={() => setStep("bet")}
                  className="bg-black rounded-full text-white font-bold py-2 px-10  mt-4"
                >
                  Back
                </button>
                <button
                  onClick={handleChallenge}
                  className="bg-cream flex items-center rounded-full text-black font-bold py-2 px-10  mt-4 disabled:bg-gray-300"
                >
                  {loading && <Loading size="sm" />}
                  Create Challenge
                </button>
              </div>
            )}
          </div>
        );
        break;

      default:
        return <div></div>;
        break;
    }
  };

  return renderScreen();
}

export default CreateChallege;
