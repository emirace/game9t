import { Link } from "react-router-dom";
import ICONS from "../../assets/icons/icons";
import IMAGES from "../../assets/images/images";

// const leaderboards = [
//   {
//     rank: 1,
//     avatar: IMAGES.user2,
//   },
// ];

function Leaderboard() {
  return (
    <div className="px-20 py-10">
      <nav className="mb-6 flex items-center gap-2">
        <img src={ICONS.home} alt="home" className="w-4 h-4" />
        <Link to="/" className="hover:text-cream hover:underline">
          Home
        </Link>
        / <span className="text-white">Leaderboard</span>
      </nav>
      <h1 className="text-4xl font-bold mb-10 text-cream">
        Leaderboard & Rankings
      </h1>
      <h2 className="text-2xl flex items-center gap-4 justify-center mb-8">
        <span className="font-jua text-3xl"> My Ranking</span>
        <div className="relative w-10 h-10">
          <img src={ICONS.trophy2} alt="trophy" className="w-full h-full" />
          <div className="absolute top-1/2 -translate-y-1/2 left-1/2 -translate-x-1/2 text-xl font-bold">
            1
          </div>
        </div>
        <span className="font-jua text-3xl"> My Earnings</span>
        <span className="bg-cream text-black px-4 py-1 rounded-md ml-2">
          ₦0
        </span>
      </h2>
      <div className="flex items-center justify-between my-6">
        <div className="w-14" />
        <div className="bg-black p-2 flex gap-2 items-center rounded-md  w-1/3">
          <img src={ICONS.search} alt="search" className="w-4 h-4" />
          <input placeholder="Search players..." className="bg-black w-full" />
        </div>
        <div className="flex items-center gap-2 bg-cream p-1 rounded-md">
          <div className="text-black ">Monthly</div>
          <img src={ICONS.arrow_down_dark} alt="search" className="w-2 h-2" />
        </div>
      </div>

      <div className="overflow-x-auto px-4 md:px-20 ">
        <table className="min-w-full table-auto rounded-lg">
          <thead>
            <tr className="bg-dark text-white text-left">
              <th className="p-4 font-jua">Rank</th>
              <th className="p-4 font-jua whitespace-nowrap">avatar</th>
              <th className="p-4 font-jua whitespace-nowrap">Username</th>
              <th className="p-4 font-jua">Games Played</th>
              <th className="p-4 font-jua">Games Won</th>
              <th className="p-4 font-jua">Win Ratio</th>
              <th className="p-4 font-jua">Earnings</th>
            </tr>
          </thead>
          <div className="p-4">Leaddrboard not available </div>
          <tbody>
            {[].map((_, index) => (
              <tr
                key={index}
                className={`${
                  index % 2 ? "bg-light_blue" : null
                } text-white hover:bg-dark_blue`}
              >
                <td className="p-4">{index + 1}</td>
                <td className="p-4">
                  <img src={ICONS.trophy2} className="h-6 w-6" />
                </td>
                <td className="p-4">
                  <div className="flex items-center gap-2">
                    <img src={IMAGES.user2} className="h-6 w-6" />
                    <div className="font-jua text-xs">Mr Yogesh</div>
                  </div>
                </td>
                <td className="p-4">300</td>
                <td className="p-4">120</td>
                <td className="p-4">80%</td>
                <td className="p-4">₦25,000</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Pagination */}
      <div className="flex justify-between items-center mt-6 mb-16 text-white px-4 md:px-20">
        <span>Showing: 12 / 30</span>
        <div>
          <button className="hover:underline mr-4">PREVIOUS /</button>
          <button className="hover:underline">NEXT</button>
        </div>
      </div>
    </div>
  );
}

export default Leaderboard;
