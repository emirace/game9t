import { useState, useEffect } from "react";
import { useToastNotification } from "../../../../context/toastNotificationContext";
import { fetchLeaderboard } from "../../../../services/gameplay";
import { ILeaderBoard } from "../../../../types/gameplay";
import Loading from "../../../_components/loading";

function OnGoingBet() {
  const { addNotification } = useToastNotification();
  const [leaderboards, setLeaderboards] = useState<ILeaderBoard[]>([]);
  const [loading, setLoading] = useState(true);
  useEffect(() => {
    const loadLeaderBoard = async () => {
      try {
        setLoading(true);
        const res = await fetchLeaderboard();
        setLeaderboards(res);
        setLoading(false);
      } catch (error: any) {
        addNotification({ message: error, error: true });
      }
    };
    loadLeaderBoard();
  }, []);
  return (
    <div>
      <div className="font-jua text-lg mb-4">Leaderboard Table</div>
      <div className="overflow-x-auto">
        <table className="min-w-full table-auto rounded-lg">
          <thead>
            <tr className="bg-dark text-white text-left">
              <th className="p-4 font-jua">Rank</th>
              <th className="p-4 font-jua">Player Name</th>
              <th className="p-4 font-jua">User ID</th>
              <th className="p-4 font-jua">Total Games Played</th>
              <th className="p-4 font-jua">Wins/Loses</th>
              <th className="p-4 font-jua">Points</th>
              <th className="p-4 font-jua text-center">Earnings</th>
            </tr>
          </thead>

          {loading ? (
            <Loading />
          ) : leaderboards.length <= 0 ? (
            <div className="p-4">Leaddrboard not available </div>
          ) : (
            <tbody>
              {leaderboards.map((leaderboard, index) => (
                <tr
                  key={index}
                  className={`${
                    index % 2 ? "bg-light_blue" : null
                  } text-white hover:bg-dark_blue`}
                >
                  <td className="p-4">{index + 1}</td>
                  <td className="p-4">{leaderboard._id.username}</td>
                  <td className="p-4">{leaderboard._id._id}</td>
                  <td className="p-4">{leaderboard.totalGamesPlayed}</td>
                  <td className="p-4">
                    {leaderboard.totalWins}/{leaderboard.totalLosses}
                  </td>
                  <td className="p-4">{leaderboard.currentScore}</td>
                  <td className="p-4"> {leaderboard.totalEarnings}</td>
                </tr>
              ))}
            </tbody>
          )}
        </table>
      </div>
      <div className="flex justify-between items-center mt-6 mb-16 ">
        <span>
          Showing: {leaderboards.length} / {leaderboards.length}
        </span>
        <div>
          <button className="hover:underline mr-4">PREVIOUS /</button>
          <button className="hover:underline">NEXT</button>
        </div>
      </div>
    </div>
  );
}

export default OnGoingBet;
