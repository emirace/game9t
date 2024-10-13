import { useState } from "react";
import IMAGES from "../../../assets/images/images";
import ICONS from "../../../assets/icons/icons";
import { useNavigate } from "react-router-dom";

const games = [
  { image: IMAGES.connectfour, name: "Connect Four" },
  { image: IMAGES.wordsearch, name: "Word Search" },
  { image: IMAGES.chess, name: "Master Chess" },
  { image: IMAGES.checkers, name: "Master Checker" },
  { image: IMAGES.headsoccer, name: "Head Soccer" },
  { image: IMAGES.tictactoe, name: "Tic Tac Toe" },
  { image: IMAGES.snake, name: "Snake & Ladder" },
  { image: IMAGES.rock, name: "Rock Papper Scissors" },
  { image: IMAGES.memory, name: "Memory Chess" },
  { image: IMAGES.tictactoe, name: "Tic Tac Toe" },
  { image: IMAGES.connectfour, name: "Connect Four" },
  { image: IMAGES.checkers, name: "Master Checker" },
];
function BrowseGame() {
  const [isFreeGames, setIsFreeGames] = useState(true);
  const router = useNavigate();

  const toggleSwitch = () => {
    setIsFreeGames(!isFreeGames);
  };
  return (
    <div>
      <div className="flex items-center justify-between my-4 md:my-8">
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
          <input placeholder="Search games" className="bg-black" />
        </div>
      </div>
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 ">
        {games.map((game, index) => (
          <div
            onClick={() => router("/game")}
            key={index}
            className="bg-light_blue bg-opacity-35 mb-4"
          >
            <div className="relative">
              <img src={game.image} alt="game" />
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
                <div className="mr-2">3k</div>
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
