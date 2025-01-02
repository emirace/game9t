import { useEffect, useState } from "react";
import ICONS from "../../../assets/icons/icons";
import { useGameSession } from "../../../context/gameSession";
import { useUser } from "../../../context/user";
import Loading from "../../_components/loading";
import { fetchGameSessionById } from "../../../services/gameSession";
import { useToastNotification } from "../../../context/toastNotificationContext";
import { useSocket } from "../../../context/socket";
import { IGameSession } from "../../../types/gameSession";
import { useNavigate, useSearchParams } from "react-router-dom";

interface Props {
  winner?: string;
  amount?: string;
  show?: boolean;
  sessionId?: string;
  close: () => void;
}

function GameOver({ amount, winner, show, sessionId, close }: Props) {
  const { user } = useUser();
  const { socket } = useSocket();
  const { addNotification } = useToastNotification();
  const {
    replayChallenge,
    startComputerGame,
    acceptChallenge,
    declineChallenge,
    cancelChallenge,
    startPlayerGame,
  } = useGameSession();
  const [_, setSearchParams] = useSearchParams();
  const [loading, setLoading] = useState(false);
  const [waiting, setWaiting] = useState<IGameSession | null>(null);
  const [replayRequest, setReplayRequest] = useState<IGameSession | null>(null);
  const [accepting, setAccepting] = useState(false);
  const [declining, setDeclining] = useState(false);
  const [cancelling, setCancelling] = useState(false);
  const [accepted, setAccepted] = useState(false);
  const navigate = useNavigate();

  const replay = async () => {
    if (!sessionId) return;
    setLoading(true);
    try {
      const initialGameSession = await fetchGameSessionById(sessionId);
      if (initialGameSession.players.length >= 2) {
        const res = await replayChallenge({ gameSessionId: sessionId });
        setWaiting(res);
      } else {
        startComputerGame(
          initialGameSession.initiatedGame._id,
          initialGameSession.amount || 0
        );
        close();
      }
    } catch (error: any) {
      addNotification({ message: error, error: true });
    } finally {
      setLoading(false);
    }
  };

  const handleAcceptChallenge = async () => {
    try {
      setAccepting(true);
      await acceptChallenge({
        sessionId: replayRequest!._id,
      });
      navigate(
        `/game/${replayRequest?.initiatedGame?._id}?sessionid=${replayRequest?._id}`
      );
      close();
      setReplayRequest(null);
    } catch (error: any) {
      addNotification({ message: error.message, error: true });
    } finally {
      setAccepting(false);
    }
  };

  const handleDeclineChallenge = async () => {
    try {
      setDeclining(true);
      await declineChallenge({
        sessionId: replayRequest!._id,
      });
      setReplayRequest(null);
    } catch (error: any) {
      addNotification({ message: error.message, error: true });
    } finally {
      setDeclining(false);
    }
  };

  const handleCancelChallenge = async () => {
    try {
      if (!waiting) {
        close();
        return;
      }
      setCancelling(true);
      const res = await cancelChallenge({ sessionId: waiting?._id });
      setWaiting(null);
      addNotification({ message: res.message });
      setSearchParams((params) => {
        params.set("sessionid", "");
        return params;
      });
    } catch (error: any) {
      addNotification({ message: error.message, error: true });
    } finally {
      setCancelling(false);
    }
  };

  const handleStart = () => {
    if (!waiting) return;
    startPlayerGame(waiting?._id);
    setWaiting(null);
    setAccepted(false);
    close();
  };

  useEffect(() => {
    if (!socket) return;
    socket?.on("replayRequest", ({ gameSession }) => {
      setReplayRequest(gameSession);
    });

    socket.on("challengeAccepted", ({ gameSession }) => {
      if (gameSession._id === waiting?._id) {
        setAccepted(true);
      }
    });
  }, [socket]);

  useEffect(() => {
    setAccepted(false);
  }, [show]);

  const isWinner = user?._id === winner;

  var title, message, result;

  switch (isWinner) {
    case true:
      title = (
        <div className="flex items-center gap-2">
          <img src={ICONS.trophy3} alt="faq" className="w-auto h-5" />
          Congratulation !
        </div>
      );
      message =
        "You have won the game! Your strategic skills and efforts have paid off.";
      result = "You won";
      break;
    case false:
      title = (
        <div className="flex items-center gap-2">
          <img src={ICONS.cancel} alt="faq" className="w-auto h-5" />
          Game Over !
        </div>
      );
      message =
        "Unfortunately, you lost this round. Keep trying, and you'll achieve victory!";
      result = "You Loss";
      break;
    default:
      title = "";
      message = "";
      result = "";
      break;
  }

  return (
    show && (
      <>
        <div className=" fixed top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 bg-light_blue text-white rounded-lg p-4 my-2 max-w-md w-full shadow-md flex justify-center z-40 ">
          <div className="space-y-2 flex flex-col items-center px-8">
            <div className="text-2xl text-cream font-jua">
              {winner ? (
                title
              ) : (
                <div className="flex items-center gap-2">
                  <img src={ICONS.draw} alt="faq" className="w-auto h-5" />
                  It's a Draw !
                </div>
              )}
            </div>
            <div className="text-center text-sm">
              {winner
                ? message
                : "Neither side prevailed this time. Try again for a decisive victory!"}
            </div>
            <div className="flex gap-2">
              <div className="font-jua">
                {winner ? result : "No Points Deduction"}
              </div>
              {winner && (
                <div className="flex-1 flex items-center gap-2">
                  :
                  <div className="items-center gap-2 border border-cream rounded-md px-1 flex cursor-pointer">
                    <img
                      src={ICONS.coin_cream}
                      alt="faq"
                      className="w-auto h-4"
                    />
                    <div className="font-jua  text-lg text-cream">
                      {amount && parseFloat(amount) * (isWinner ? 2 : 1)}
                    </div>
                  </div>
                </div>
              )}
            </div>

            {replayRequest ? (
              <div className="border-2 border-cream p-4 rounded-md">
                <div>Replay Requested:</div>
                <div className="flex gap-4 w-full items-center mt-2">
                  <button
                    type="button"
                    onClick={handleAcceptChallenge}
                    className=" px-12 py-2 bg-black font-jua flex-1 rounded-full whitespace-nowrap hover:bg-cream flex gap-2 hover:text-black"
                  >
                    {accepting && <Loading size="sm" />}
                    Play
                  </button>

                  <button
                    type="button"
                    onClick={handleDeclineChallenge}
                    className=" ml-4 px-12 py-2 bg-cream flex gap-2 font-jua flex-1 text-black rounded-full hover:bg-black whitespace-nowrap hover:text-white"
                  >
                    {declining && <Loading size="sm" />}
                    Cancel
                  </button>
                </div>
              </div>
            ) : accepted ? (
              <button
                type="button"
                onClick={handleStart}
                className=" px-12 py-2 bg-black font-jua flex-1 rounded-full whitespace-nowrap hover:bg-cream flex gap-2 hover:text-black"
              >
                Start Game
              </button>
            ) : (
              <div className="flex gap-4 w-full items-center mt-4">
                {waiting ? (
                  <div className="text-cream font-jua flex-1">Waiting...</div>
                ) : (
                  <button
                    type="button"
                    onClick={replay}
                    className=" px-12 py-2 bg-black font-jua flex-1 rounded-full whitespace-nowrap hover:bg-cream flex gap-2 hover:text-black"
                  >
                    {loading && <Loading size="sm" />}
                    Play Again
                  </button>
                )}
                <button
                  type="button"
                  onClick={handleCancelChallenge}
                  className=" ml-4 px-12 py-2 flex gap-2 bg-cream font-jua flex-1 text-black rounded-full hover:bg-black whitespace-nowrap hover:text-white"
                >
                  {cancelling && <Loading size="sm" />}
                  {waiting ? "Cancel" : "Exit"}
                </button>
              </div>
            )}
          </div>

          <img
            src={ICONS.close}
            alt="close"
            className="w-4 h-4 cursor-pointer absolute top-4 right-4"
            onClick={close}
          />
        </div>
        {show && (
          <div
            className="fixed inset-0 bg-black opacity-50 z-30"
            onClick={close}
          ></div>
        )}
      </>
    )
  );
}

export default GameOver;
