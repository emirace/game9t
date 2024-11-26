import React, { useEffect, useState } from "react";
import { ITransaction } from "../../../../../types/transaction";
import { fetchTransaction } from "../../../../../services/transaction";
import Loading from "../../../../_components/loading";

interface TransactionDetailProps {
  id: string; // The ID of the transaction to fetch
}

const Detail: React.FC<TransactionDetailProps> = ({ id }) => {
  const [transaction, setTransaction] = useState<ITransaction | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchTransactionDetail = async () => {
      try {
        if (!id) return;
        setLoading(true);
        const response = await fetchTransaction(id);
        setTransaction(response);
      } catch (err: any) {
        setError(
          err.response?.data?.message || "Failed to fetch transaction details"
        );
      } finally {
        setLoading(false);
      }
    };

    fetchTransactionDetail();
  }, [id]);

  if (loading) {
    return (
      <div className="w-full h-full flex justify-center items-center">
        <Loading />
      </div>
    );
  }

  if (error) {
    return <div className="text-red-500">Error: {error}</div>;
  }

  if (!transaction) {
    return <div>No transaction details found.</div>;
  }

  return (
    <div className="p-4 ">
      <h1 className="text-xl font-bold mb-4">Transaction Details</h1>
      <div className="space-y-2">
        <div>
          <strong>Transaction ID:</strong> {transaction._id}
        </div>
        <div>
          <strong>User:</strong> {transaction.user.username} (
          {transaction.user.email})
        </div>
        <div>
          <strong>Amount:</strong> ${transaction.amount.toFixed(2)}
        </div>
        <div>
          <strong>Status:</strong>{" "}
          <span
            className={`${
              transaction.status === "Completed"
                ? "text-green-600"
                : transaction.status === "Pending"
                ? "text-yellow-600"
                : "text-red-600"
            }`}
          >
            {transaction.status}
          </span>
        </div>
        <div>
          <strong>Type:</strong> {transaction.type}
        </div>
        <div>
          <strong>Payment Method:</strong> {transaction.paymentMethod}
        </div>
        <div>
          <strong>Reference:</strong> {transaction.reference || "N/A"}
        </div>
        <div>
          <strong>Created At:</strong>{" "}
          {new Date(transaction.createdAt).toLocaleString()}
        </div>
      </div>
    </div>
  );
};

export default Detail;
