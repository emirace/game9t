import React, { useState, useEffect } from "react";
import { fetchBet } from "../../../../../services/bet";
import { IBet } from "../../../../../types/bet";
import Loading from "../../../../_components/loading";

const Detail: React.FC<{ id: string }> = ({ id }) => {
  const [bet, setBet] = useState<IBet | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchBetDetails = async () => {
      try {
        const response = await fetchBet(id);
        setBet(response);
      } catch (err: any) {
        setError("Error fetching bet details");
      } finally {
        setLoading(false);
      }
    };

    fetchBetDetails();
  }, [id]);

  if (loading)
    return (
      <div className="flex justify-center items-center h-full w-full">
        <Loading />
      </div>
    );
  if (error) return <div className="text-red-500">{error}</div>;

  return (
    <div className="max-w-4xl mx-auto p-4">
      <h2 className="text-2xl font-semibold mb-4">Bet Details</h2>

      {bet ? (
        <div className="space-y-4">
          <div className="flex justify-between">
            <div className="font-medium">Bet ID:</div>
            <div>{bet._id}</div>
          </div>

          <div className="flex justify-between">
            <div className="font-medium">Game:</div>
            <div>{bet?.game?.game?.name}</div>
          </div>

          <div className="flex justify-between">
            <div className="font-medium">Player 1:</div>
            <div>{bet?.game?.player1?.userId?.username}</div>
          </div>

          <div className="flex justify-between">
            <div className="font-medium">Player 2:</div>
            <div>{bet?.game?.player2?.userId?.username}</div>
          </div>

          <div className="flex justify-between">
            <div className="font-medium">Amount Bet:</div>
            <div>${bet.amount}</div>
          </div>

          <div className="flex justify-between">
            <div className="font-medium">Status:</div>
            <div>{bet.status}</div>
          </div>

          {bet.winner && (
            <div className="flex justify-between">
              <div className="font-medium">Winner:</div>
              <div>{bet.winner.username}</div>
            </div>
          )}

          <div className="flex justify-between">
            <div className="font-medium">Created At:</div>
            <div>{new Date(bet.createdAt).toLocaleString()}</div>
          </div>
        </div>
      ) : (
        <div>No bet found.</div>
      )}
    </div>
  );
};

export default Detail;
