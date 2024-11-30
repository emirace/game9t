import React, { useEffect, useRef, useState } from "react";
import {
  Link,
  useNavigate,
  useParams,
  useSearchParams,
} from "react-router-dom";
import ICONS from "../../assets/icons/icons";
import OtherGames from "./_component/otherGames";
import Sidebar from "./_component/sidebar";
import SideModel from "../_components/sideModel";
import { useGame } from "../../context/game";
import { IGame } from "../../types/game";
import { useToastNotification } from "../../context/toastNotificationContext";
import Loading from "../_components/loading";
import { useUser } from "../../context/user";
import { fetchGameSessionById } from "../../services/gameSession";
import { IGameSession } from "../../types/gameSession";
import { useGameSession } from "../../context/gameSession";
import { useSocket } from "../../context/socket";

const Game: React.FC = () => {
  const params = useParams();
  const { id } = params;
  const { fetchGameById } = useGame();
  const { user } = useUser();
  const { isOnline } = useSocket();
  const { addNotification } = useToastNotification();
  const [game, setGame] = useState<IGame | null>(null);
  const [showSideBar, setShowSideBar] = useState(false);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();
  const iframeRef = useRef<HTMLIFrameElement>(null);
  const [searchParams, setSearchParams] = useSearchParams();
  const sessionId = searchParams.get("sessionid");
  const [ready, setReady] = useState(false);
  const [gameSession, setGameSession] = useState<IGameSession | null>(null);
  const [selectedAmount, setSelectedAmount] = useState("200");
  const { cancelChallenge } = useGameSession();
  const [cancelling, setCancelling] = useState(false);

  useEffect(() => {
    const fetchGame = async () => {
      if (!id) {
        addNotification({ message: "Game not found", error: true });
        navigate(-1);
        return;
      }
      try {
        setLoading(true);
        const res = await fetchGameById(id);
        setGame(res);
        setLoading(false);
      } catch (error: any) {
        addNotification({ message: error, error: true });
      }
    };
    fetchGame();
  }, [id]);

  useEffect(() => {
    const handleMessage = (event: MessageEvent) => {
      if (event.data.type === "STATUS" && event.data.data === "Ready") {
        console.log("Message from game:", event.data.data);
        setReady(true);
      }
    };

    window.addEventListener("message", handleMessage);
    return () => {
      window.removeEventListener("message", handleMessage);
    };
  }, []);

  useEffect(() => {
    console.log(sessionId, ready, selectedAmount);
    if (ready) {
      if (iframeRef.current?.contentWindow) {
        const message = {
          type: "GAME",
          sessionId,
          selectedAmount,
        };
        iframeRef.current.contentWindow.postMessage(message, "*");
      }
      if (sessionId) {
        fetchGameSessionById(sessionId).then((session) => {
          setGameSession(session);
        });
      }
    }
  }, [sessionId, ready, selectedAmount]);

  const handleCancelChallenge = async () => {
    try {
      if (!gameSession) return;
      setCancelling(true);
      const res = await cancelChallenge({ sessionId: gameSession?._id });
      setGameSession(null);
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

  return loading ? (
    <div className="w-full h-screen">
      <Loading />
    </div>
  ) : (
    <div className="p-4  md:p-20">
      {/* Breadcrumb */}
      <nav className="mb-6 flex items-center gap-2">
        <img src={ICONS.home} alt="home" className="w-4 h-4" />
        <Link to="/" className="hover:text-cream hover:underline">
          Home
        </Link>
        / <span className="text-white capitalize">{game?.name}</span>
      </nav>

      {/* Title */}
      <h1 className="text-2xl md:text-4xl text-cream font-bold mb-6  capitalize">
        Play {game?.name} Online Game
      </h1>
      <div className=" flex flex-col md:flex-row gap-8">
        {/* Main Content */}
        <div className="flex-1">
          {/* Game Mode Selection */}
          <div className="border-4 border-light_blue mb-6 h-[26rem]">
            <iframe
              ref={iframeRef}
              src={`/games/${game?.slug}/index.html`}
              className="w-full h-full"
            />
          </div>

          {/* Challenge Stats & Player Stats */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-6 mb-6">
            <div className="bg-cream text-black p-4 rounded-lg">
              <h3 className=" text-xl mb-2 font-jua">Challenge Stats</h3>
              <div className="flex items-center gap-8">
                <p>
                  <b>Bet:</b> {gameSession?.amount || selectedAmount || "Nil"}
                </p>
                <p>
                  <b>Win:</b> Nil
                </p>
                <p>
                  <b>Lose:</b> Nil
                </p>
              </div>
              <div className="flex items-center space-x-4 mt-2">
                <p>
                  <b>Stat:</b>
                </p>
                <span
                  className={`${
                    gameSession ? "bg-green" : "bg-gray-400"
                  } text-white px-1 rounded`}
                >
                  Running challenge
                </span>
                {gameSession && (
                  <>
                    <button
                      onClick={handleCancelChallenge}
                      className="bg-red text-white px-1 rounded"
                    >
                      Cancel challenge
                    </button>
                    {cancelling && <Loading />}
                  </>
                )}
              </div>
            </div>

            <div className="bg-cream text-black p-4 px-6 rounded-lg">
              <h3 className="font-jua text-xl mb-2">Player Stats</h3>
              <div className="flex items-start mb-1">
                <p className="flex-[2]">{user?.username}</p>
                <div className="font-bold text-sm">
                  {user ? "Active" : "Inactive"}
                </div>
              </div>
              {gameSession?.players && gameSession?.players?.length > 0 ? (
                (() => {
                  const opponent = gameSession?.players.find(
                    (player) => player._id !== user?._id
                  );
                  const opponentUsername = opponent?.username || "AI (cpu)";
                  const isOpponentOnline = isOnline(opponent?._id || "");
                  return (
                    <div className="flex items-start">
                      <div className="flex-[2]">{opponentUsername}</div>
                      <div className="font-bold text-sm">
                        {isOpponentOnline ? "Active" : "Inactive"}
                      </div>
                    </div>
                  );
                })()
              ) : (
                <div className="flex items-start">
                  <p className="flex-[2]">AI (cpu)</p>
                  <div className="font-bold text-sm">Active</div>
                </div>
              )}
            </div>
          </div>

          <div className="flex justify-center md:hidden  mb-4">
            <button
              onClick={() => setShowSideBar(true)}
              className="bg-black font-jua rounded-full text-white font-bold py-2 px-10  mt-4"
            >
              Place Bet
            </button>
          </div>

          {/* Game Details */}
          <div className="bg-medium_blue px-8 p-6 rounded-lg">
            <h3 className="font-jua text-xl mb-4">Game Details</h3>
            <div className="grid grid-cols-2 md:grid-cols-6 gap-2 mb-6 font-light text-sm ">
              <p className="font-bold">Name:</p>
              <p className="md:col-span-2 capitalize"> {game?.name}</p>
              <p className="font-bold">Platforms:</p>
              <p className="md:col-span-2">
                {game?.platforms && game?.platforms.join(", ")}
              </p>
              <p className="font-bold">Popularity:</p>
              <p className="md:col-span-2"> {game?.likes.length}+ players</p>
              <p className="font-bold">Technology:</p>
              <p className="md:col-span-2"> HTML5</p>
              <p className="font-bold">Features:</p>
              <p className="md:col-span-2">
                Single Player, {game?.onlineMultiplayer && "MultiPlayer"}
              </p>
            </div>
            <p className="mt-4">{game?.description}</p>
          </div>
        </div>
        <SideModel isOpen={showSideBar} onClose={() => setShowSideBar(false)}>
          <div className="absolute left-0 top-0 overflow-y-auto h-screen">
            <Sidebar
              gameId={game?._id}
              selectedAmount={selectedAmount}
              setSelectedAmount={setSelectedAmount}
            />
          </div>
        </SideModel>

        {/* Sidebar */}
        <div className="hidden md:block">
          <Sidebar
            gameId={game?._id}
            selectedAmount={selectedAmount}
            setSelectedAmount={setSelectedAmount}
          />
        </div>
      </div>
      <OtherGames />
    </div>
  );
};

export default Game;
