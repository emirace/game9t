import { useEffect, useState } from "react";
import { fetchWalletStats } from "../../../../services/wallet";
import { IWalletStat } from "../../../../types/wallet";

function Overview() {
  const [stat, setStat] = useState<IWalletStat | null>(null);

  const stats = [
    { name: "Total Users", value: stat?.totalWallets },
    { name: "Total Funds Deposit", value: stat?.totalDepositAmount },
    { name: "Total Funds Withdrawn", value: stat?.totalWithdrawalAmount },
    { name: "Pending Withdrawals", value: stat?.pendingWithdrawalCount },
  ];

  useEffect(() => {
    const loadStats = async () => {
      try {
        const res = await fetchWalletStats();
        setStat(res);
      } catch (error) {
        console.log(error);
      }
    };
    loadStats();
  }, []);

  return (
    <div className="mb-6">
      <div className="font-jua text-lg mb-2">Wallet Overview</div>
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
