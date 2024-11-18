import BarChart from "./_component/barchart";
import BarChart2 from "./_component/barchart2";
import GamesPlayed from "./_component/gamePlayed";
import PieChart from "./_component/piechart";
import RecentMatches from "./_component/recentMatches";
import RevenueSources from "./_component/revenueSources";
import Stat from "./_component/stat";

const userGrowthData = [
  {
    name: "Users",
    data: [4000, 6000, 8000, 12000, 16000, 20000],
  },
];

const categories = ["1 Day", "", "1 Week", "", "", "1 Year"];
const userTypeData = [1000, 300, 100, 50];
const userLabels = ["Active", "Inactive", "New", "Others"];

function Dashboard() {
  return (
    <div>
      <Stat />
      <div className="font-jua mt-6 mb-2 text-lg">Overview</div>
      <div className="grid grid-cols-3 gap-3">
        <BarChart
          title="User Growth"
          categories={categories}
          series={userGrowthData}
          yAxisTitle="Users"
        />
        <BarChart
          title="Revenue Growth"
          categories={categories}
          series={userGrowthData}
          yAxisTitle="Revenue( )"
        />
        <BarChart
          title="Active Games"
          categories={categories}
          series={userGrowthData}
          yAxisTitle="Active Games"
        />
        <PieChart
          title="User Types"
          series={userTypeData}
          labels={userLabels}
          colors={["#ff5252", "#42a5f5", "#8bc34a", "#004d40"]} // Same colors as in the image
          height={320}
        />
        <GamesPlayed />
        <RevenueSources />
        <BarChart2 />
        <RecentMatches />
      </div>
    </div>
  );
}

export default Dashboard;
