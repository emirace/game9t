import { useState } from "react";
import ICONS from "../../../../../assets/icons/icons";
import { useBranding } from "../../../../../context/branding";
import { useGameSession } from "../../../../../context/gameSession";

interface Props {
  selectedAmount: string;
  setSelectedAmount: (value: string) => void;
}

function PlaceBet({ selectedAmount, setSelectedAmount }: Props) {
  const { branding } = useBranding();
  const { gameSession } = useGameSession();
  const [showCustom, setShowCustom] = useState(false);
  return (
    <>
      <div
        className={`grid grid-cols-3 gap-2 mb-4 ${
          gameSession ? "opacity-30" : ""
        }`}
      >
        {branding?.predefinedBets.map((amount) => (
          <button
            key={amount}
            onClick={() => setSelectedAmount(amount)}
            className={`bg-black flex items-center justify-center gap-1 hover:bg-cream hover:text-black font-bold p-2 rounded-full disabled:bg-black disabled:text-cream ${
              !gameSession && selectedAmount === amount
                ? "bg-cream text-black"
                : null
            }`}
            disabled={!!gameSession}
          >
            <img
              src={
                !gameSession && selectedAmount === amount
                  ? ICONS.coin_black
                  : ICONS.coin_cream
              }
              alt="coin"
              className="w-auto h-3"
            />
            {amount}
          </button>
        ))}
        <button
          onClick={() => setShowCustom(!showCustom)}
          className={`bg-black flex items-center justify-center gap-1 hover:bg-cream hover:text-black font-bold py-2 rounded-full disabled:bg-black disabled:text-cream ${
            !gameSession && showCustom ? "bg-cream text-black" : null
          } disabled:bg-black`}
          disabled={!!gameSession}
        >
          Custom
        </button>
      </div>
      {!gameSession && showCustom && (
        <input
          placeholder="Enter amount(100 - 100,000)"
          className="bg-black p-2 px-4 rounded-full w-full"
          onChange={(e) => setSelectedAmount(e.target.value)}
        />
      )}
    </>
  );
}

export default PlaceBet;
