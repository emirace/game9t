import { useState } from "react";

function AdjustBalance({
  id,
  handleSubmit,
}: {
  id: string;
  handleSubmit: (value: { id: string; balance: any }) => void;
}) {
  const [balanceAdjustment, setBalanceAdjustment] = useState<number | "">("");
  const [showBalance, setShowBalance] = useState(false);

  return (
    <div className="relative">
      <button
        onClick={() => setShowBalance(!showBalance)}
        className="bg-cream text-black text-xs p-1 px-4 rounded-full whitespace-nowrap"
      >
        Adjust Balance
      </button>
      {showBalance && (
        <div className="absolute top-10 left-0 bg-dark_blue z-30 p-2 rounded-md font-normal space-y-3 shadow shadow-white">
          <input
            type="number"
            value={balanceAdjustment}
            onChange={(e) => setBalanceAdjustment(Number(e.target.value))}
            className="bg-black p-2"
            placeholder="Enter amount"
          />
          <button
            type="button"
            className="font-jua text-sm bg-cream text-black rounded-md px-4"
            onClick={() => {
              handleSubmit({ id, balance: balanceAdjustment });
              setShowBalance(false);
            }}
          >
            Adjust Wallet
          </button>
        </div>
      )}
    </div>
  );
}

export default AdjustBalance;
