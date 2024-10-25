import ICONS from "../../../assets/icons/icons";
import { useUser } from "../../../context/user";

function Stats() {
  const { user } = useUser();

  const data = [
    {
      name: "Total Wins",
      value: user?.totalWins,
      icon: ICONS.trophy3,
    },
    {
      name: "Total Loses",
      value: user?.totalLosses,
      icon: ICONS.chart,
    },
    {
      name: "Total Games",
      value: user?.totalGamesPlayed,
      icon: ICONS.game,
    },
    {
      name: "Total Bets",
      value: user?.totalBets,
      icon: ICONS.dollar,
    },
  ];
  return (
    <div>
      <div className="font-jua text-3xl mt-8 text-center mb-5">
        Game Statistics
      </div>
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        {data.map((item, index) => (
          <div
            key={index}
            className="flex items-center justify-center gap-3 bg-dark rounded-md p-10"
          >
            <img src={item.icon} slot="icon" className="w-auto h-10" />
            <div className="">
              <div className="font-jua text-lg">{item.name}</div>
              <div className="text-lg">{item.value}</div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default Stats;
