import { useEffect, useState } from "react";
import { ITransaction } from "../../../../../types/transaction";
import { fetchAllTransaction } from "../../../../../services/transaction";
import moment from "moment";
import Model from "../../../../_components/model";
import Detail from "./detail";

function Transaction() {
  const [transactions, setTransactions] = useState<ITransaction[]>([]);
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(0);
  const [totalCount, setTotalCount] = useState(0);
  const [showDetail, setShowDetail] = useState(false);
  const [id, setId] = useState("");

  useEffect(() => {
    const loadTransaction = async () => {
      try {
        const data = await fetchAllTransaction({ page, limit: 20 });
        setTransactions(data.transactions);
        setTotalPages(data.totalPages);
        setTotalCount(data.totalCount);
      } catch (error) {
        console.log("Error loading withdrawal requests:", error);
      }
    };

    loadTransaction();
  }, [page]);

  const handleShowDetail = (id: string) => {
    setShowDetail(true);
    setId(id);
  };

  const handleCloseDetail = () => {
    setShowDetail(false);
    setId("");
  };

  return (
    <div>
      <div className="font-jua text-lg mb-4">Transaction Oversight</div>

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
              <th className="p-4 font-jua text-center">Actions</th>
            </tr>
          </thead>
          {transactions.length <= 0 && (
            <div className="p-5">No transaction available</div>
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
                <td className="p-4 font-bold">
                  <div className="flex items-center justify-center gap-3">
                    {transaction.type === "Withdrawal" &&
                      transaction.status === "Pending" && (
                        <>
                          <button className="bg-cream text-black text-xs p-1 px-4 rounded-full whitespace-nowrap">
                            Approve
                          </button>
                          <button className="bg-cream text-black text-xs p-1 px-4 rounded-full whitespace-nowrap">
                            Reject
                          </button>
                        </>
                      )}
                    <button
                      onClick={() => handleShowDetail(transaction._id)}
                      className="bg-cream text-black text-xs p-1 px-4 rounded-full whitespace-nowrap"
                    >
                      View Details
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
      <Model isOpen={showDetail} onClose={handleCloseDetail}>
        <Detail id={id} />
      </Model>
    </div>
  );
}

export default Transaction;
