import { useState, useEffect } from "react";
import { fetchAllBets, updateBetStatus } from "../../../../services/bet";
import { IBet } from "../../../../types/bet";
import { useToastNotification } from "../../../../context/toastNotificationContext";

function Settlement() {
  const { addNotification } = useToastNotification();
  const [bets, setBets] = useState<IBet[]>([]);

  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(0);
  const [totalCount, setTotalCount] = useState(0);

  useEffect(() => {
    const loadBets = async () => {
      try {
        const data = await fetchAllBets({ status: "pending", page, limit: 10 });
        setBets(data.bets);
        setTotalPages(data.totalPages);
        setTotalCount(data.total);
      } catch (error) {
        console.log("Error loading bet:", error);
      }
    };

    loadBets();
  }, [page]);

  async function handleBetStatusUpdate(
    betId: string,
    newStatus: "completed" | "rejected"
  ) {
    try {
      const response = await updateBetStatus(betId, newStatus);
      setBets((prev) =>
        prev.map((bet) => (bet._id === response._id ? response : bet))
      );
      addNotification({ message: `Bet status updated to ${newStatus}` });
    } catch (error: any) {
      console.error("Error updating bet status:", error.message);
      addNotification({ message: `Error updating bet status`, error: true });
    }
  }

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
                <td className="p-4">
                  {bet?.session.players[1]?.username || "AI(cpu)"}
                </td>
                <td className="p-4">{bet?.winner?.username}</td>
                <td className="p-4"> {bet.amount}</td>
                <td className="p-4 capitalize">{bet.status}</td>
                <td className="p-4 font-bold">
                  <div className="flex items-center justify-center gap-3">
                    <button
                      onClick={() =>
                        handleBetStatusUpdate(bet._id, "completed")
                      }
                      className="bg-cream text-black text-xs p-1 px-4 rounded-full"
                    >
                      Approve
                    </button>
                    <button
                      onClick={() => handleBetStatusUpdate(bet._id, "rejected")}
                      className="bg-cream text-black text-xs p-1 px-4 rounded-full"
                    >
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

export default Settlement;
