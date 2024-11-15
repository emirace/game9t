import { useEffect, useState } from "react";
import { useToastNotification } from "../../context/toastNotificationContext";
import { fetchUserGameplays } from "../../services/gameplay";
import { IGameplay } from "../../types/gameplay";
import Loading from "../_components/loading";
import { useUser } from "../../context/user";
import moment from "moment";

function History() {
  const { user } = useUser();
  const { addNotification } = useToastNotification();
  const [history, setHistory] = useState<IGameplay[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchgameHistory = async () => {
      try {
        const res = await fetchUserGameplays();
        setHistory(res);
        setLoading(false);
      } catch (error: any) {
        addNotification({ message: error, error: true });
      }
    };
    fetchgameHistory();
  }, []);
  return (
    <div className="text-sm">
      <h2 className="text-lg  mb-6">Game History</h2>
      <div className="overflow-x-auto ">
        <table className="min-w-full table-auto rounded-lg">
          <thead>
            <tr className="bg-dark text-white text-left">
              <th className="p-4 font-jua">ID</th>
              <th className="p-4 font-jua whitespace-nowrap">Game Type</th>
              <th className="p-4 font-jua whitespace-nowrap">Opponent</th>
              <th className="p-4 font-jua whitespace-nowrap">Date & Time</th>
              <th className="p-4 font-jua whitespace-nowrap">Result</th>
              <th className="p-4 font-jua whitespace-nowrap">Bet Amount</th>
              <th className="p-4 font-jua whitespace-nowrap">Score</th>
            </tr>
          </thead>
          {loading ? (
            <Loading />
          ) : history.length <= 0 ? (
            <div className="p-4">No game history</div>
          ) : (
            <tbody>
              {history.map((his, index) => {
                // Determine if the current user is player1 or player2
                const isPlayer1 = his.player1.userId._id === user?._id;
                const opponent = isPlayer1
                  ? his.player2?.userId
                  : his.player1.userId;
                const currentUserScore = isPlayer1
                  ? his.player1.score
                  : his.player2?.score;
                const opponentScore = isPlayer1
                  ? his.player2?.score
                  : his.player1.score;

                // Determine win/loss status
                const didWin = his.winner && his.winner._id === user?._id;
                const result = !his.winner ? "Draw" : didWin ? "Win" : "Loss";
                return (
                  <tr
                    key={index}
                    className={`${
                      index % 2 ? "bg-light_blue" : null
                    } text-white hover:bg-dark_blue`}
                  >
                    <td className="p-4">{his._id}</td>
                    <td className="p-4">{his.game.name}</td>
                    <td className="p-4">{opponent?.username}</td>
                    <td className="p-4">{moment(his.createdAt).calendar()}</td>
                    <td className="p-4">{result}</td>
                    <td className="p-4">
                      {his.bet ? `₦${his.bet.amount}` : 0}
                    </td>
                    <td className="p-4">
                      {currentUserScore} - {opponentScore}
                    </td>
                  </tr>
                );
              })}
            </tbody>
          )}
        </table>
      </div>
      <div className="flex justify-between items-center mt-6 mb-16 ">
        <span>Showing: 0 / 0</span>
        <div>
          <button className="hover:underline mr-4">PREVIOUS /</button>
          <button className="hover:underline">NEXT</button>
        </div>
      </div>
    </div>
  );
}

export default History;
