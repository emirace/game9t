import { useState, useEffect } from "react";
import ICONS from "../../../../assets/icons/icons";
import { getDashboardStat } from "../../../../services/admin";

function Stat() {
  const [stat, setStat] = useState<any>(null);

  const stats = [
    {
      icon: ICONS.profile_outline,
      name: "Active Users",
      value: stat?.activeUsers || 0,
    },
    { icon: "", name: "Ongoing Games", value: stat?.ongoingGames || 0 },
    { icon: ICONS.dollar, name: "Revenue", value: stat?.totalRevenue || 0 },
  ];

  useEffect(() => {
    const loadStat = async () => {
      try {
        const data = await getDashboardStat();
        setStat(data);
      } catch (error) {
        console.log("Error loading stat:", error);
      }
    };

    loadStat();
  }, []);

  return (
    <div className="grid grid-cols-2 md:grid-cols-3 gap-2 md:gap-6 mb-5">
      {stats.map((item, index) => (
        <div key={index} className="bg-light_blue p-4 rounded-md">
          <div className="flex items-center gap-2">
            <img src={item.icon} className=" h-4" />
            <div className="font-jua">{item.name}</div>
          </div>
          <div className="text-2xl font-bold">{item.value}</div>
        </div>
      ))}
    </div>
  );
}

export default Stat;
