import { useState } from "react";
import ICONS from "../../../assets/icons/icons";
import IMAGES from "../../../assets/images/images";
import Model from "../../_components/model";
import Rating from "../../_components/rating";

const games = [
  { image: IMAGES.connectfour, name: "Connect Four" },
  { image: IMAGES.wordsearch, name: "Word Search" },
  { image: IMAGES.chess, name: "Master Chess" },
  { image: IMAGES.checkers, name: "Master Checker" },
];
function SaerchPlayer() {
  const [showConfirm, setShowConfirm] = useState(false);
  return (
    <div className="mb-30">
      <h2 className="font-jua text-2xl mb-6 text-center ">Search Players</h2>

      <div className="bg-black p-2 flex gap-2 items-center rounded-md mb-6">
        <img src={ICONS.search} alt="search" className="w-4 h-4" />
        <input placeholder="Search players..." className="bg-black" />
      </div>
      <div className="flex flex-col gap-4">
        {["player", "player", "player", "player"].map(() => (
          <div
            onClick={() => setShowConfirm(true)}
            className="flex gap-2 items-center justify-between p-4 bg-medium_blue rounded-lg  "
          >
            <div className="flex items-center gap-4">
              <img
                src={IMAGES.user2}
                alt="Profile"
                className="w-12 h-12 rounded-full"
              />
              <div>
                <div className="font-jua">Mr Yogesh </div>
                <div className="text-xs">
                  <span className="text-green">●</span> online
                </div>
              </div>
              <div className="ml-10">
                <Rating rating={4} />
              </div>
            </div>
            <button className="bg-black text-xs font-jua py-2 px-4 mt-2 rounded-md hover:bg-gray-600">
              Challege Opponent
            </button>
          </div>
        ))}
      </div>
      <div className="mt-6">Total Available Players: 8</div>

      <Model isOpen={showConfirm} onClose={() => setShowConfirm(false)}>
        <div className="flex flex-col gap-4 justify-center items-center h-full px-20">
          <div className="text-lg font-jua">
            Please Select Game to Challenge
          </div>
          <div className="grid grid-cols-4 gap-4 ">
            {games.map((game) => (
              <div>
                <img src={game.image} alt="game" className="h-" />
                <div className="font-jua text-center mt-2">{game.name}</div>
              </div>
            ))}
          </div>
        </div>
      </Model>
    </div>
  );
}

export default SaerchPlayer;
