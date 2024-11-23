import Overview from "./_component/overview";
import OnGoingBet from "./_component/ongoingbet";
import History from "./_component/history";
import Settlement from "./_component/settlement";

function Betting() {
  return (
    <div>
      <h1 className="font-jua text-xl">Betting Management</h1>
      <div className="text-sm mb-6">Manage Your Wallet & Payment Here</div>
      <Overview />
      <OnGoingBet />
      <Settlement />
      <History />
      <div className="text-lg font-jua ">Betting Fraud Monitoring</div>
      <div className="">
        Monitor and manage any fraudulent activities related to betting to
        maintain platform integrity.
      </div>
      <div className="flex items-center gap-4 mt-4 mb-6">
        <button className="bg-white text-black text-xs p-1 px-4 rounded-md">
          View Flagged Bets
        </button>
        <button className="bg-white text-black text-xs p-1 px-4 rounded-md">
          Generate Report
        </button>
      </div>

      <div className="text-lg font-jua ">Admin Actions</div>
      <div className="flex flex-wrap items-center gap-4 mt-2">
        <button className="bg-white text-black text-xs p-1 px-4 rounded-md">
          Generate Betting Report
        </button>
        <button className="bg-white text-black text-xs p-1 px-4 rounded-md">
          Export Betting Data
        </button>
        <button className="bg-white text-black text-xs p-1 px-4 rounded-md">
          View Bet Audit Logs
        </button>
      </div>
    </div>
  );
}

export default Betting;
