import { useNavigate } from "react-router-dom";
import IMAGES from "../../../assets/images/images";
import ICONS from "../../../assets/icons/icons";

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
function OtherGames() {
  const router = useNavigate();

  return (
    <div className="py-20">
      <div className="flex items-center justify-center my-8">
        <div className="font-jua text-3xl">Play Other Games</div>
      </div>
      <div className="grid grid-cols-4 gap-4 ">
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
                className="absolute top-1/2 left-1/2 w-16 h-16 -translate-x-1/2 -translate-y-1/2 "
              />
            </div>
            <div className="flex items-center justify-between p-2">
              <div className="font-jua">{game.name}</div>
              <div className="flex items-center gap-2 ">
                <img src={ICONS.play} alt="play" className="w-4 h-4" />
                <div className="mr-2">3k</div>
                <img src={ICONS.heart} alt="like" className="w-4 h-4" />
                <img src={ICONS.share} alt="share" className="w-4 h-4" />
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default OtherGames;
