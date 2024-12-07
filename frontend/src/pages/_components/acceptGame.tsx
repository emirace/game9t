import { useEffect, useState } from "react";
import { IGameSession } from "../../types/gameSession";
import { fetchGameSessionById } from "../../services/gameSession";
import { useToastNotification } from "../../context/toastNotificationContext";
import ICONS from "../../assets/icons/icons";
import { useGameSession } from "../../context/gameSession";
import { useNavigate } from "react-router-dom";
import Loading from "./loading";

function AcceptGame() {
  const { addNotification } = useToastNotification();
  const {
    acceptChallenge,
    acceptSessionId: sessionId,
    setAcceptSessionId,
    declineChallenge,
  } = useGameSession();
  const [gameSession, setGameSession] = useState<IGameSession | null>(null);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();
  const [accepting, setAccepting] = useState(false);
  const [declining, setDeclining] = useState(false);

  useEffect(() => {
    const loadGamesesseion = async () => {
      if (!sessionId) return;
      try {
        const res = await fetchGameSessionById(sessionId);
        setGameSession(res);
      } catch (error: any) {
        addNotification({ message: error, error: true });
      } finally {
        setLoading(false);
      }
    };
    loadGamesesseion();
  }, [sessionId]);

  const handleAcceptChallenge = async () => {
    try {
      setAccepting(true);
      await acceptChallenge({
        sessionId: gameSession!._id,
      });
      setAcceptSessionId("");
      navigate(
        `/game/${gameSession?.initiatedGame?._id}?sessionid=${gameSession?._id}`
      );
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
        sessionId: gameSession!._id,
      });
      setAcceptSessionId("");
    } catch (error: any) {
      addNotification({ message: error.message, error: true });
    } finally {
      setDeclining(false);
    }
  };

  return (
    !!sessionId && (
      <>
        <div className=" fixed top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 bg-light_blue font-jua text-white rounded-lg p-4 my-2 max-w-md w-full shadow-md flex justify-center z-40 ">
          {loading ? (
            <div className="p-4">
              <Loading />
            </div>
          ) : (
            <div className="space-y-2">
              <div className="text-2xl text-cream font-jua">
                Challenge Received !
              </div>
              <div className="flex gap-2">
                <div className="">Game Name</div>
                <div className="flex-1">
                  : {gameSession?.initiatedGame?.name}
                </div>
              </div>
              <div className="flex gap-2">
                <div className="">Bet Amount</div>
                <div className="flex-1 flex items-center gap-2">
                  :
                  <div className="items-center gap-2 border border-cream rounded-md px-1 flex cursor-pointer">
                    <img
                      src={ICONS.coin_cream}
                      alt="faq"
                      className="w-auto h-4"
                    />
                    <div className="font-jua  text-lg text-cream">
                      {gameSession?.amount}
                    </div>
                  </div>
                </div>
              </div>
              <div className="flex gap-2">
                <div className="">Challenger</div>
                <div className="flex-1 capitalize">
                  : {gameSession?.players[0]?.username}
                </div>
              </div>
              <div className="flex items-center justify-center gap-2">
                <button
                  onClick={handleAcceptChallenge}
                  className=" flex gap-2 items-center justify-center px-2 py-1 bg-black text-cream *: text-jua text-sm rounded-full flex-1"
                >
                  {accepting && <Loading size="sm" />}
                  Accept
                </button>
                <button
                  onClick={handleDeclineChallenge}
                  className="flex gap-2 items-center justify-center  px-2 py-1 bg-cream *:  text-black text-jua text-sm rounded-full flex-1"
                >
                  {declining && <Loading size="sm" />}
                  Decline
                </button>
              </div>
            </div>
          )}

          <img
            src={ICONS.close}
            alt="close"
            className="w-4 h-4 cursor-pointer absolute top-4 right-4"
            onClick={() => setAcceptSessionId("")}
          />
        </div>
        {!!sessionId && (
          <div
            className="fixed inset-0 bg-black opacity-50 z-30"
            onClick={() => setAcceptSessionId("")}
          ></div>
        )}
      </>
    )
  );
}

export default AcceptGame;
