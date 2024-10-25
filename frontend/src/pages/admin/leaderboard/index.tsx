import Overview from "./_component/overview";
import OnGoingBet from "./_component/table";

function Leaderboards() {
  return (
    <div>
      <h1 className="font-jua text-xl">Leaderboard Management</h1>
      <div className="text-sm mb-6">Manage Global Leaderborad</div>
      <Overview />
      <OnGoingBet />
      <div className="text-lg font-jua ">Reset Leaderboards </div>
      <div className="flex items-center gap-4 mt-4 mb-6">
        <button className="bg-white text-black text-xs p-1 px-4 rounded-md">
          Reset Monthly LeaderBoard
        </button>
        <button className="bg-white text-black text-xs p-1 px-4 rounded-md">
          Reset Weekly LeaderBoard
        </button>
      </div>

      <div className="text-lg font-jua ">Admin Actions</div>
      <div className="flex items-center gap-4 mt-2">
        <button className="bg-white text-black text-xs p-1 px-4 rounded-md">
          Generate Leaderboard Report
        </button>
        <button className="bg-white text-black text-xs p-1 px-4 rounded-md">
          Send Notifications to Top Players
        </button>
      </div>
    </div>
  );
}

export default Leaderboards;
