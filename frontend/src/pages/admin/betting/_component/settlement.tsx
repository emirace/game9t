function Settlement() {
  return (
    <div>
      <div className="font-jua text-lg mb-4">Bet Settlements</div>
      <div className="overflow-x-auto">
        <table className="min-w-full table-auto rounded-lg">
          <thead>
            <tr className="bg-dark text-white text-left">
              <th className="p-4 font-jua">Bet ID</th>
              <th className="p-4 font-jua">Game</th>
              <th className="p-4 font-jua">User 1</th>
              <th className="p-4 font-jua">User 2</th>
              <th className="p-4 font-jua">Winner</th>
              <th className="p-4 font-jua">Stack Amount</th>
              <th className="p-4 font-jua">Status</th>
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
                <td className="p-4">BET{index + 1}</td>
                <td className="p-4">Ludo</td>
                <td className="p-4">player 1</td>
                <td className="p-4">player 2</td>
                <td className="p-4">player 1</td>
                <td className="p-4"> 800</td>
                <td className="p-4">Pending</td>
                <td className="p-4 font-bold">
                  <div className="flex items-center justify-center gap-3">
                    <button className="bg-cream text-black text-xs p-1 px-4 rounded-full">
                      Approve
                    </button>
                    <button className="bg-cream text-black text-xs p-1 px-4 rounded-full">
                      Reject
                    </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
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

export default Settlement;
