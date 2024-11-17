import { useState, useEffect } from "react";
import { useBranding } from "../../../../context/branding";

function Bet() {
  const { branding, updateBranding } = useBranding();

  // Local state for bet amounts
  const [betAmounts, setBetAmounts] = useState<string[]>([
    "",
    "",
    "",
    "",
    "",
    "",
  ]);

  // Store initial values for change detection
  const [initialBetAmounts, setInitialBetAmounts] = useState(betAmounts);

  // Populate default bet values from branding context
  useEffect(() => {
    if (branding?.predefinedBets) {
      const initialData = branding.predefinedBets.slice(0, 6); // Ensure it matches the 6 predefined bets
      setBetAmounts(initialData);
      setInitialBetAmounts(initialData); // Store initial state for comparison
    }
  }, [branding]);

  // Handle changes to a specific bet amount
  const handleBetChange = (index: number, value: string) => {
    setBetAmounts((prevBets) => {
      const updatedBets = [...prevBets];
      updatedBets[index] = value;
      return updatedBets;
    });
  };

  // Submit updated bet amounts
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    updateBranding({ predefinedBets: betAmounts });
  };

  // Check if there are any changes
  const isChanged =
    JSON.stringify(betAmounts) !== JSON.stringify(initialBetAmounts);

  return (
    <div>
      <h2 className="font-jua text-xl mb-4 mt-8">Predefined Bets</h2>
      <form onSubmit={handleSubmit}>
        <div className="grid grid-cols-7 gap-8">
          {["1", "2", "3", "4", "5", "6"].map((number, index) => (
            <div key={number}>
              <div className="text-sm mb-2">Bet {number}</div>
              <input
                type="number"
                name={`bet${number}`}
                value={betAmounts[index]}
                onChange={(e) => handleBetChange(index, e.target.value)}
                placeholder="Enter amt"
                className="w-full p-4 bg-light_blue text-white rounded-md focus:outline-none"
              />
            </div>
          ))}
        </div>

        {/* Submit Button */}
        {isChanged && (
          <div className="mt-8">
            <button
              type="submit"
              className="px-4 py-2 bg-cream text-black rounded-md font-medium hover:opacity-75 transition duration-300"
            >
              Update Predefined Bets
            </button>
          </div>
        )}
      </form>
    </div>
  );
}

export default Bet;
