import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import ICONS from "../../assets/icons/icons";
import { useWallet } from "../../context/wallet";
import Loading from "../_components/loading";
import { useUser } from "../../context/user";
import { useTransaction } from "../../context/transaction";
import moment from "moment";
import { useToastNotification } from "../../context/toastNotificationContext";
import { sendVerificationEmail } from "../../services/auth";

const Wallet: React.FC = () => {
  const { balance, loading } = useWallet();
  const { userTransactions } = useTransaction();
  const { addNotification } = useToastNotification();
  const { user } = useUser();
  const navigate = useNavigate();
  const [verifying, setVerifying] = useState(false);

  const handleVerify = async () => {
    try {
      setVerifying(true);
      await sendVerificationEmail();
      addNotification({
        message: "A verification link has been sent to your email",
      });
    } catch (error: any) {
      addNotification({ message: error, error: true });
    } finally {
      setVerifying(false);
    }
  };

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
        <h2 className="text-2xl flex items-center">
          <span className="font-jua flex items-center gap-1">
            <img src={ICONS.coin_cream} alt="coin" className="w-auto h-6" />
            Current Balance :
          </span>
          <div className="bg-cream flex items-center text-black px-4 py-1 rounded-md ml-2">
            {loading ? <Loading size="md" color="black" /> : ` ${balance}`}
          </div>
        </h2>
        {user?.verified ? (
          <span className="bg-green text-xs px-4 py-1 rounded-lg">
            Verified
          </span>
        ) : (
          <span className="bg-red text-xs px-4 py-1 rounded-lg">
            Not Verified
          </span>
        )}
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
        {!user?.verified &&
          (verifying ? (
            <Loading size="sm" />
          ) : (
            <button
              className="bg-black py-2 px-4 font-jua rounded-full disabled:bg-gray-300"
              disabled={user?.verified}
              onClick={handleVerify}
            >
              Verify
            </button>
          ))}
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
              <th className="p-4 font-jua whitespace-nowrap">Amount ( )</th>
              <th className="p-4 font-jua">Method</th>
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
                  <td className="p-4">
                    {moment(transaction.createdAt).calendar()}
                  </td>
                  <td className="p-4">{transaction.type}</td>
                  <td className="p-4">{transaction.amount}</td>
                  <td className="p-4">{transaction.paymentMethod}</td>
                  <td className="p-4">{transaction.status}</td>
                </tr>
              ))}
            </tbody>
          )}
        </table>
      </div>

      {/* Pagination */}
      <div className="flex justify-between items-center mt-6 text-white px-4 md:px-20">
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
};

export default Wallet;
