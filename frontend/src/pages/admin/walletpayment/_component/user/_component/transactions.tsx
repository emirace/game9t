import { useEffect, useState } from "react";
import { fetchWalletTransactions } from "../../../../../../services/wallet";
import { ITransaction } from "../../../../../../types/transaction";
import moment from "moment";
import Loading from "../../../../../_components/loading";

interface Props {
  id: string;
}
const Transactions: React.FC<Props> = ({ id }) => {
  const [transactions, setTransactions] = useState<ITransaction[]>([]);
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(0);
  const [totalCount, setTotalCount] = useState(0);
  const [loading, setLoading] = useState(true);
  useEffect(() => {
    const loadTransactions = async () => {
      if (!id) return;
      try {
        setLoading(true);
        const data = await fetchWalletTransactions({ id, limit: 20 });
        setTransactions(data.transactions);
        setTotalPages(data.totalPages);
        setTotalCount(data.total);
      } catch (error) {
        console.log("Error loading withdrawal requests:", error);
      } finally {
        setLoading(false);
      }
    };

    loadTransactions();
  }, [id, page]);
  return (
    <div className="p-5">
      <div className="font-jua text-lg mb-4">Transaction</div>

      <div className="overflow-x-auto">
        <table className="min-w-full table-auto rounded-lg">
          <thead>
            <tr className="bg-dark text-white text-left">
              <th className="p-4 font-jua">Transaction ID</th>
              <th className="p-4 font-jua">Username</th>
              <th className="p-4 font-jua">Date</th>
              <th className="p-4 font-jua">Type</th>
              <th className="p-4 font-jua">Amount</th>
              <th className="p-4 font-jua">Status</th>
            </tr>
          </thead>
          {loading ? (
            <Loading />
          ) : (
            transactions.length <= 0 && (
              <div className="p-5">No transaction available</div>
            )
          )}

          <tbody>
            {transactions.map((transaction, index) => (
              <tr
                key={index}
                className={`${
                  index % 2 ? "bg-light_blue" : null
                } text-white hover:bg-dark_blue`}
              >
                <td className="p-4">{transaction._id}</td>
                <td className="p-4">{transaction.user.username}</td>
                <td className="p-4">
                  {moment(transaction.createdAt).calendar()}
                </td>
                <td className="p-4">{transaction.type}</td>
                <td className="p-4"> {transaction.amount}</td>
                <td className="p-4">{transaction.status}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <div className="flex justify-between items-center mt-6 mb-16 ">
        <span>
          Showing: {transactions.length} / {totalCount}
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
};

export default Transactions;
