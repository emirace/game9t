import React, { useEffect, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import ICONS from "../../assets/icons/icons";
import OtherGames from "./_component/otherGames";
import Sidebar from "./_component/sidebar";
import SideModel from "../_components/sideModel";
import { useGame } from "../../context/game";
import { IGame } from "../../types/game";
import { useToastNotification } from "../../context/toastNotificationContext";
import Loading from "../_components/loading";
import { useUser } from "../../context/user";

const Game: React.FC = () => {
  const params = useParams();
  const { id } = params;
  const { fetchGameById } = useGame();
  const { user } = useUser();
  const { addNotification } = useToastNotification();
  const [game, setGame] = useState<IGame | null>(null);
  const [showSideBar, setShowSideBar] = useState(false);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchGame = async () => {
      if (!id) {
        addNotification({ message: "Game not found", error: true });
        navigate(-1);
        return;
      }
      try {
        const res = await fetchGameById(id);
        setGame(res);
        setLoading(false);
      } catch (error: any) {
        addNotification({ message: error, error: true });
      }
    };
    fetchGame();
  }, []);
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
          <div className="border-4 border-light_blue mb-6 h-96">
            {/* <iframe
              src={`/src/games/${game?.slug}/index.html`}
              className="w-full h-full"
            /> */}
          </div>

          {/* Challenge Stats & Player Stats */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-6 mb-6">
            <div className="bg-cream text-black p-4 rounded-lg">
              <h3 className=" text-xl mb-2 font-jua">Challenge Stats</h3>
              <div className="flex items-center gap-8">
                <p>
                  <b>Bet:</b> Nil
                </p>
                <p>
                  <b>Win:</b> Nil
                </p>
                <p>
                  <b>Lose:</b> Nil
                </p>
              </div>
              <div className="flex space-x-4 mt-2">
                <p>
                  <b>Stat:</b>
                </p>
                <span className="bg-green text-white px-1 rounded">
                  Running challenge
                </span>
                <span className="bg-red text-white px-1 rounded">
                  Cancel challenge
                </span>
              </div>
            </div>

            <div className="bg-cream text-black p-4 px-6 rounded-lg">
              <h3 className="font-jua text-xl mb-2">Player Stats</h3>
              <div className="flex items-start mb-1">
                <p className="flex-[2]">AI (cpu) </p>
                <div className="flex items-center gap-3">
                  <img src={ICONS.arrow_red} alt="main" className="w-3 h-2" />
                  <p className="flex-1"> 0 Points</p>
                </div>
              </div>
              <div className="flex items-start gap-8">
                <p className="flex-[2]">{user?.username} (You) </p>
                <div className="flex items-center gap-3">
                  <img src={ICONS.arrow_green} alt="main" className="w-3 h-2" />
                  <p className="flex-1">0 Points</p>
                </div>
              </div>
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
              <p className="md:col-span-2"> {game?.platforms.join(", ")}</p>
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
            <Sidebar />
          </div>
        </SideModel>

        {/* Sidebar */}
        <div className="hidden md:block">
          <Sidebar />
        </div>
      </div>
      <OtherGames />
    </div>
  );
};

export default Game;
