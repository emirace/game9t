import { useState } from "react";
import ICONS from "../../../../../assets/icons/icons";
import { useBranding } from "../../../../../context/branding";

interface Props {
  selectedAmount: string;
  setSelectedAmount: (value: string) => void;
}

function PlaceBet({ selectedAmount, setSelectedAmount }: Props) {
  const { branding } = useBranding();
  const [showCustom, setShowCustom] = useState(false);
  return (
    <>
      <div className="grid grid-cols-3 gap-2 mb-4">
        {branding?.predefinedBets.map((amount) => (
          <button
            key={amount}
            onClick={() => setSelectedAmount(amount)}
            className={`bg-black flex items-center justify-center gap-1 hover:bg-cream hover:text-black font-bold p-2 rounded-full ${
              selectedAmount === amount ? "bg-cream text-black" : null
            }`}
          >
            <img
              src={
                selectedAmount === amount ? ICONS.coin_black : ICONS.coin_cream
              }
              alt="coin"
              className="w-auto h-3"
            />
            {amount}
          </button>
        ))}
        <button
          onClick={() => setShowCustom(!showCustom)}
          className={`bg-black flex items-center justify-center gap-1 hover:bg-cream hover:text-black font-bold py-2 rounded-full ${
            showCustom ? "bg-cream text-black" : null
          }`}
        >
          Custom
        </button>
      </div>
      {showCustom && (
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
