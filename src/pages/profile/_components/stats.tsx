import ICONS from "../../../assets/icons/icons";

const data = [
  {
    name: "Total Wins",
    value: 20,
    icon: ICONS.trophy3,
  },
  {
    name: "Total Loses",
    value: 20,
    icon: ICONS.chart,
  },
  {
    name: "Total Games",
    value: 20,
    icon: ICONS.game,
  },
  {
    name: "Total Bets",
    value: 20,
    icon: ICONS.dollar,
  },
];

function Stats() {
  return (
    <div>
      <div className="font-jua text-3xl mt-8 text-center">Game Statistics</div>
      <div className="grid grid-cols-4 gap-4">
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
