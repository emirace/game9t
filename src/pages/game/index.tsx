import React, { useState } from "react";
import { Link } from "react-router-dom";
import ICONS from "../../assets/icons/icons";
import IMAGES from "../../assets/images/images";
import OtherGames from "./_component/otherGames";
import Sidebar from "./_component/sidebar";
import SideModel from "../_components/sideModel";

const Game: React.FC = () => {
  const [showSideBar, setShowSideBar] = useState(false);
  return (
    <div className="p-4  md:p-20">
      {/* Breadcrumb */}
      <nav className="mb-6 flex items-center gap-2">
        <img src={ICONS.home} alt="home" className="w-4 h-4" />
        <Link to="/" className="hover:text-cream hover:underline">
          Home
        </Link>
        / <span className="text-white">Connect Four</span>
      </nav>

      {/* Title */}
      <h1 className="text-2xl md:text-4xl text-cream font-bold mb-6  ">
        Play Connect Four Online Game
      </h1>
      <div className=" flex flex-col md:flex-row gap-8">
        {/* Main Content */}
        <div className="flex-1">
          {/* Game Mode Selection */}
          <div className="border-4 border-light_blue mb-6">
            <img
              src={IMAGES.connectfour_main}
              alt="main"
              className="w-full h-full"
            />
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
                <p className="flex-[2]">MrXyz (cpu) </p>
                <div className="flex items-center gap-3">
                  <img src={ICONS.arrow_red} alt="main" className="w-3 h-2" />
                  <p className="flex-1"> 100 Points</p>
                </div>
              </div>
              <div className="flex items-start gap-8">
                <p className="flex-[2]">MrYogesh (You) </p>
                <div className="flex items-center gap-3">
                  <img src={ICONS.arrow_green} alt="main" className="w-3 h-2" />
                  <p className="flex-1">130 Points</p>
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
              <p className="md:col-span-2"> Connect Four</p>
              <p className="font-bold">Platforms:</p>
              <p className="md:col-span-2"> Web, Android, iOS</p>
              <p className="font-bold">Popularity:</p>
              <p className="md:col-span-2"> 1,50,000+ players</p>
              <p className="font-bold">Technology:</p>
              <p className="md:col-span-2"> HTML5</p>
              <p className="font-bold">Features:</p>
              <p className="md:col-span-2"> Single Player, MultiPlayer</p>
            </div>
            <p className="mt-4">
              Connect Four is an HTML5 game where 2 player game in which the
              objective is to connect four cultured disks by dropping them into
              the holder, play against computer or against a friend. Challenge
              yourself from a traditional 7 x 6 grid, or custom board size from
              7×6 to 9×8.
            </p>
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
