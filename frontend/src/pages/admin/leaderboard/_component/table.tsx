function OnGoingBet() {
  return (
    <div>
      <div className="font-jua text-lg mb-4">Ongoing Bets</div>

      <table className="min-w-full table-auto rounded-lg">
        <thead>
          <tr className="bg-dark text-white text-left">
            <th className="p-4 font-jua">Rank</th>
            <th className="p-4 font-jua">Player Name</th>
            <th className="p-4 font-jua">User ID</th>
            <th className="p-4 font-jua">Total Games Played</th>
            <th className="p-4 font-jua">Wins/Loses</th>
            <th className="p-4 font-jua">Current Score</th>
            <th className="p-4 font-jua text-center">Earnings</th>
            <th className="p-4 font-jua text-center">Actions</th>
          </tr>
        </thead>
        <tbody>
          {[1, 2, 3, 4, 5, 6].map((_, index) => (
            <tr
              key={index}
              className={`${
                index % 2 ? "bg-light_blue" : null
              } text-white hover:bg-dark_blue`}
            >
              <td className="p-4">{index + 1}</td>
              <td className="p-4">Player_ace</td>
              <td className="p-4">USER123</td>
              <td className="p-4">250</td>
              <td className="p-4">180/70</td>
              <td className="p-4">15,000</td>
              <td className="p-4"> 100,000</td>
              <td className="p-4 font-bold">
                <div className="flex items-center justify-center gap-3">
                  <button className="bg-cream text-black text-xs p-1 px-4 rounded-full">
                    Edit
                  </button>
                  <button className="bg-cream text-black text-xs p-1 px-4 rounded-full">
                    View Details
                  </button>
                </div>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      <div className="flex justify-between items-center mt-6 mb-16 ">
        <span>Showing: 12 / 30</span>
        <div>
          <button className="hover:underline mr-4">PREVIOUS /</button>
          <button className="hover:underline">NEXT</button>
        </div>
      </div>
    </div>
  );
}

export default OnGoingBet;
