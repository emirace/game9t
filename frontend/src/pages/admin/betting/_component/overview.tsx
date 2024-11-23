const stats = [
  { name: "Total Bets Placed", value: "8,500" },
  { name: "Total Amount Bet:", value: " 2,400,000" },
  { name: "Total Bets Settled:", value: "6,400" },
  { name: "Pending Bets:", value: "2,300" },
];

function Overview() {
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
