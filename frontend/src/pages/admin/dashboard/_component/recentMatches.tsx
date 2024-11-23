function RecentMatches() {
  return (
    <div className="bg-chart col-span-2 rounded-lg p-3 text-xs">
      <h2 className="text-lg  mb-3">Transactions</h2>
      <div className="overflow-x-auto">
        <table className="min-w-full table-auto rounded-lg">
          <thead>
            <tr className="bg-dark text-white text-left">
              <th className="p-3 font-jua">ID</th>
              <th className="p-3 font-jua">Player 1</th>
              <th className="p-3 font-jua whitespace-nowrap">Player 2</th>
              <th className="p-3 font-jua whitespace-nowrap">Game</th>
              <th className="p-3 font-jua">Result</th>
              <th className="p-3 font-jua whitespace-nowrap">Bet Amount</th>
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
                <td className="p-3 whitespace-nowrap">{index + 1}</td>
                <td className="p-3 whitespace-nowrap">johndoe123</td>
                <td className="p-3 whitespace-nowrap">Janesmith123</td>
                <td className="p-3 whitespace-nowrap">Tic Tac Toe</td>
                <td className="p-3 whitespace-nowrap">Player 1 wins</td>
                <td className="p-3 whitespace-nowrap"> 500</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default RecentMatches;
