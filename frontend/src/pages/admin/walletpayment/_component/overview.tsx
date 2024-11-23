const stats = [
  { name: "Total Users", value: "5,000" },
  { name: "Total Funds Deposit", value: " 1,200,000" },
  { name: "Total Funds Withdrawn", value: " 800,000" },
  { name: "Pending Withdrawals", value: "12" },
];

function Overview() {
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
