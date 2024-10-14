import React from "react";
import { Link, useNavigate } from "react-router-dom";
import ICONS from "../../assets/icons/icons";

const Wallet: React.FC = () => {
  const navigate = useNavigate();
  const transactions = [
    {
      date: "2024-09-20",
      type: "Deposit",
      amount: "₦5,000",
      method: "Debit Card",
      status: "Completed",
    },
    {
      date: "2024-09-22",
      type: "Bet",
      amount: "₦500",
      method: "Ludo",
      status: "Won",
    },
    {
      date: "2024-09-23",
      type: "Withdrawal",
      amount: "₦3,000",
      method: "Bank Transfer",
      status: "Completed",
    },
    {
      date: "2024-09-20",
      type: "Deposit",
      amount: "₦5,000",
      method: "Debit Card",
      status: "Completed",
    },
    {
      date: "2024-09-20",
      type: "Deposit",
      amount: "₦5,000",
      method: "Debit Card",
      status: "Completed",
    },
    {
      date: "2024-09-20",
      type: "Deposit",
      amount: "₦5,000",
      method: "Debit Card",
      status: "Completed",
    },
    {
      date: "2024-09-20",
      type: "Deposit",
      amount: "₦5,000",
      method: "Debit Card",
      status: "Completed",
    },
    {
      date: "2024-09-20",
      type: "Deposit",
      amount: "₦5,000",
      method: "Debit Card",
      status: "Completed",
    },
    // More dummy data...
  ];

  return (
    <div className="bg-dark-900 text-white min-h-screen p-6 pb-40 md:px-20">
      {/* Breadcrumb */}
      <nav className="mb-6 flex items-center gap-2">
        <img src={ICONS.home} alt="home" className="w-4 h-4" />
        <Link to="/" className="hover:text-cream hover:underline">
          Home
        </Link>
        / <span className="text-white">Wallet</span>
      </nav>

      {/* Title */}
      <h1 className="text-4xl font-bold mb-4 text-cream">Wallet</h1>

      {/* Current Balance */}
      <div className=" p-6 rounded-lg flex flex-col md:flex-row justify-center items-center gap-6">
        <h2 className="text-2xl">
          <span className="font-jua">
            <span className="text-cream">$</span> Current Balance :
          </span>
          <span className="bg-cream text-black px-4 py-1 rounded-md ml-2">
            ₦200
          </span>
        </h2>
        <span className="bg-red text-xs px-4 py-1 rounded-lg">
          Not Verified
        </span>
      </div>

      {/* Action Buttons */}
      <div className="flex items-center justify-center space-x-4 mb-12">
        <button
          onClick={() => navigate("/wallet/deposit")}
          className="bg-black py-2 px-4 font-jua rounded-full"
        >
          Add Funds
        </button>
        <button
          onClick={() => navigate("/wallet/withdraw")}
          className="bg-black py-2 px-4 font-jua rounded-full"
        >
          Withdraw Funds
        </button>
        <button className="bg-black py-2 px-4 font-jua rounded-full">
          Verify
        </button>
      </div>

      {/* Transaction History */}
      <h2 className="font-jua text-lg text-center mb-4">Transaction History</h2>
      <div className="overflow-x-auto px-4 md:px-20">
        <table className="min-w-full table-auto rounded-lg">
          <thead>
            <tr className="bg-dark text-white text-left">
              <th className="p-4 font-jua">Date</th>
              <th className="p-4 font-jua whitespace-nowrap">
                Transaction Type
              </th>
              <th className="p-4 font-jua whitespace-nowrap">Amount (₦)</th>
              <th className="p-4 font-jua">Method</th>
              <th className="p-4 font-jua">Status</th>
            </tr>
          </thead>
          <tbody>
            {transactions.map((transaction, index) => (
              <tr
                key={index}
                className={`${
                  index % 2 ? "bg-light_blue" : null
                } text-white hover:bg-dark_blue`}
              >
                <td className="p-4">{transaction.date}</td>
                <td className="p-4">{transaction.type}</td>
                <td className="p-4">{transaction.amount}</td>
                <td className="p-4">{transaction.method}</td>
                <td className="p-4">{transaction.status}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Pagination */}
      <div className="flex justify-between items-center mt-6 text-white px-4 md:px-20">
        <span>Showing: 12 / 30</span>
        <div>
          <button className="hover:underline mr-4">PREVIOUS /</button>
          <button className="hover:underline">NEXT</button>
        </div>
      </div>
    </div>
  );
};

export default Wallet;
