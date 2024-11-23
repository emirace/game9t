const stats = [
  { name: "Total Players", value: "1,200" },
  { name: "Total Player: user_king", value: "15,000" },
  { name: "Average Ranking", value: "7,800" },
];

function Overview() {
  return (
    <div className="mb-6">
      <div className="font-jua text-lg mb-2">Betting Overview</div>
      <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mb-5">
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
