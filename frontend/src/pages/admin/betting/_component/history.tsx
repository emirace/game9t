import { useState, useEffect } from "react";
import { fetchAllBets } from "../../../../services/bet";
import { IBet } from "../../../../types/bet";
import moment from "moment";

function History() {
  const [bets, setBets] = useState<IBet[]>([]);

  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(0);
  const [totalCount, setTotalCount] = useState(0);

  useEffect(() => {
    const loadBets = async () => {
      try {
        const data = await fetchAllBets({
          status: "completed",
          page,
          limit: 10,
        });
        setBets(data.bets);
        setTotalPages(data.totalPages);
        setTotalCount(data.total);
      } catch (error) {
        console.log("Error loading bet:", error);
      }
    };

    loadBets();
  }, [page]);

  return (
    <div>
      <div className="font-jua text-lg mb-4">Bet History</div>
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
              <th className="p-4 font-jua">Date Settled</th>
              <th className="p-4 font-jua text-center">Actions</th>
            </tr>
          </thead>
          {bets.length <= 0 && <div>No bets available</div>}
          <tbody>
            {bets.map((bet, index) => (
              <tr
                key={bet._id}
                className={`${
                  index % 2 ? "bg-light_blue" : null
                } text-white hover:bg-dark_blue`}
              >
                <td className="p-4">{bet._id}</td>
                <td className="p-4">{bet?.session.initiatedGame.name}</td>
                <td className="p-4">{bet?.session.players[0].username}</td>
                <td className="p-4">{bet?.session.players[1].username}</td>
                <td className="p-4">{bet?.winner?.username}</td>
                <td className="p-4"> {bet.amount}</td>
                <td className="p-4">{moment(bet.settlementDate).calendar()}</td>
                <td className="p-4 font-bold text-center">Settled</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <div className="flex justify-between items-center mt-6 mb-16 ">
        <span>
          Showing: {bets.length} / {totalCount}
        </span>
        <div>
          <button
            disabled={page <= 1}
            onClick={() => (page > 1 ? setPage(page - 1) : null)}
            className="hover:underline mr-4 disabled:text-gray-500"
          >
            PREVIOUS /
          </button>
          <button
            disabled={page >= totalPages}
            onClick={() => (page < totalPages ? setPage(page + 1) : null)}
            className="hover:underline disabled:text-gray-500"
          >
            NEXT
          </button>
        </div>
      </div>
    </div>
  );
}

export default History;
