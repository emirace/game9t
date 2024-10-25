import moment from "moment";
import { useTransaction } from "../../context/transaction";

function Transaction() {
  const { userTransactions } = useTransaction();
  return (
    <div className="text-sm">
      <h2 className="text-lg  mb-6">Transactions</h2>
      <div className="overflow-x-auto ">
        <table className="min-w-full table-auto rounded-lg">
          <thead>
            <tr className="bg-dark text-white text-left">
              <th className="p-4 font-jua">ID</th>
              <th className="p-4 font-jua whitespace-nowrap">Date & Time</th>
              <th className="p-4 font-jua whitespace-nowrap">
                Transaction Type
              </th>
              <th className="p-4 font-jua whitespace-nowrap">Payment Method</th>
              <th className="p-4 font-jua">Amount</th>
              <th className="p-4 font-jua">Status</th>
            </tr>
          </thead>
          {userTransactions.length <= 0 ? (
            <div className="p-4">No transaction available</div>
          ) : (
            <tbody>
              {userTransactions.map((transaction, index) => (
                <tr
                  key={transaction._id}
                  className={`${
                    index % 2 ? "bg-light_blue" : null
                  } text-white hover:bg-dark_blue`}
                >
                  <td className="p-4">{transaction._id}</td>
                  <td className="p-4">
                    {moment(transaction.createdAt).calendar()}
                  </td>
                  <td className="p-4">{transaction.type}</td>
                  <td className="p-4">{transaction.paymentMethod}</td>
                  <td className="p-4">₦{transaction.amount}</td>
                  <td className="p-4">{transaction.amount}</td>
                </tr>
              ))}
            </tbody>
          )}
        </table>
      </div>
      <div className="flex justify-between items-center mt-6 mb-16 ">
        <span>
          Showing: {userTransactions.length} / {userTransactions.length}
        </span>
        <div>
          <button className="hover:underline mr-4">PREVIOUS /</button>
          <button className="hover:underline">NEXT</button>
        </div>
      </div>
    </div>
  );
}

export default Transaction;
