import React from "react";
import ProgressBar from "./progressBar";

const GamesPlayed: React.FC = () => {
  const games = [
    { name: "Connect Four", percentage: 90 },
    { name: "Word Search", percentage: 60 },
    { name: "Master Chess", percentage: 50 },
    { name: "Master Checkers", percentage: 70 },
    { name: "Head Soccer", percentage: 40 },
    { name: "Tic Tac Toe", percentage: 75 },
    { name: "Snakes & Ladders", percentage: 55 },
    { name: "Rock Paper Scissors", percentage: 30 },
    { name: "Memory Chess", percentage: 65 },
  ];

  return (
    <div className="p-4 bg-chart  rounded-lg">
      <h2 className="text-white text-lg mb-4">Games Played</h2>
      {games.map((game, index) => (
        <ProgressBar
          key={index}
          label={game.name}
          percentage={game.percentage}
        />
      ))}
    </div>
  );
};

export default GamesPlayed;
