import { useEffect, useState } from "react";
import { IBetStat, fetchBetStats } from "../../../../services/bet";

function Overview() {
  const [stat, setStat] = useState<IBetStat | null>(null);

  const stats = [
    { name: "Total Bets Placed", value: stat?.totalBetsPlaced || 0 },
    { name: "Total Amount Bet:", value: stat?.totalAmountBet || 0 },
    { name: "Total Bets Settled:", value: stat?.totalSettledBets || 0 },
    { name: "Pending Bets:", value: stat?.totalPendingBets || 0 },
  ];

  useEffect(() => {
    const loadStats = async () => {
      try {
        const res = await fetchBetStats();
        setStat(res);
      } catch (error) {
        console.log(error);
      }
    };
    loadStats();
  }, []);

  return (
    <div className="mb-6">
      <div className="font-jua text-lg mb-2">Betting Overview</div>
      <div className="grid grid-cols-2 md:grid-cols-4 gap-2 md:gap-6 mb-5">
        {stats.map((item, index) => (
          <div key={index} className="bg-light_blue p-4 rounded-md">
            <div className="flex items-center gap-2">
              <div className="font-jua">{item.name}</div>
            </div>
            <div className="text-2xl font-bold">{item.value}</div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default Overview;
