import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import ICONS from "../../assets/icons/icons";
import { useWallet } from "../../context/wallet";
import { useUser } from "../../context/user";
import { createWithdrawalRequest } from "../../services/withdrawalRequest";
import { useToastNotification } from "../../context/toastNotificationContext";
import Loading from "../_components/loading";

const Withdraw: React.FC = () => {
  const { balance } = useWallet();
  const { user } = useUser();
  const { addNotification } = useToastNotification();
  const [formData, setFormData] = useState({
    type: "",
    amount: "",
    crypto: user?.paymentMethods.details.crypto?.currency,
    network: user?.paymentMethods.details.crypto?.network,
    bankName: user?.paymentMethods.details.bankTransfer?.bankName,
    accountNumber: user?.paymentMethods.details.bankTransfer?.accountNumber,
    accountName: user?.paymentMethods.details.bankTransfer?.accountHolderName,
    address: user?.paymentMethods.details.crypto?.walletAddress,
  });
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleInputChange = (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement
    >
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();
    setLoading(true);
    if (!formData.type) {
      addNotification({ message: "Select withdrawal type", error: true });
      return;
    }
    if (!formData.amount || parseFloat(formData.amount) < 1000) {
      addNotification({ message: "Enter a valid amount", error: true });
      return;
    }
    try {
      await createWithdrawalRequest(formData);
      addNotification({ message: "Withdrawal request sent successfully" });
      setFormData((prev) => ({ ...prev, type: "", amount: "" }));
      navigate(-1);
    } catch (err: any) {
      addNotification({ message: err, error: true });
    } finally {
      setLoading(false);
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
        / <span className="text-white">Withdraw Funds</span>
      </nav>

      {/* Title */}
      <h1 className="text-4xl font-bold mb-4 text-cream">Withdraw Funds</h1>
      <div className="text-3xl  font-jua text-center mb-10 ">
        Choose Withdraw Method
      </div>
      <div className="flex flex-col md:flex-row gap-8">
        <div className="flex-[2]">
          <div className="bg-[#142635] flex-1 rounded-md p-4 md:p-12 md:w-3/4">
            <div className="mb-4">
              <select
                name="type"
                value={formData.type}
                onChange={handleInputChange}
                className="w-full p-4 bg-black rounded-md focus:outline-none"
              >
                <option value="" disabled>
                  Select Withdrawal Method
                </option>
                <option value="Naira">Naira</option>
                <option value="Cryptocurrency">Cryptocurrency</option>
              </select>
            </div>

            {formData.type === "Naira" ? (
              <>
                <div className="mb-4">
                  <select
                    name="bankName"
                    value={formData.bankName}
                    onChange={handleInputChange}
                    className="w-full p-4 bg-black rounded-md focus:outline-none"
                  >
                    <option value="" disabled>
                      Bank Name
                    </option>
                    <option value="First Bank">First Bank</option>
                    <option value="Zenith Bank">Zenith Bank</option>
                  </select>
                </div>

                <div className="my-4 relative">
                  <input
                    type="text"
                    name="accountNumber"
                    value={formData.accountNumber}
                    onChange={handleInputChange}
                    placeholder="Enter Account Number"
                    className="p-3 bg-black rounded-md focus:outline-none w-full "
                  />
                  {user?.paymentMethods.details.bankTransfer?.accountNumber && (
                    <img
                      src={ICONS.check_green}
                      className="h-4 w-auto absolute top-1/2 -translate-y-1/2 right-4"
                    />
                  )}
                </div>

                <div className="my-4 relative">
                  <input
                    type="text"
                    name="accountName"
                    value={formData.accountName}
                    onChange={handleInputChange}
                    placeholder="Enter Account Name"
                    className="p-3 bg-black rounded-md focus:outline-none w-full "
                  />

                  {user?.paymentMethods.details.bankTransfer?.accountNumber && (
                    <img
                      src={ICONS.check_green}
                      className="h-4 w-auto absolute top-1/2 -translate-y-1/2 right-4"
                    />
                  )}
                </div>
              </>
            ) : formData.type === "Cryptocurrency" ? (
              <>
                <div className="mb-4">
                  <select
                    name="crypto"
                    value={formData.crypto}
                    onChange={handleInputChange}
                    className="w-full p-4 bg-black rounded-md focus:outline-none"
                  >
                    <option value="" disabled>
                      Select Cryptocurrency
                    </option>
                    <option value="USDT">USDT</option>
                  </select>
                </div>

                <div className="mb-4">
                  <select
                    name="network"
                    value={formData.network}
                    onChange={handleInputChange}
                    className="w-full p-4 bg-black rounded-md focus:outline-none"
                  >
                    <option value="" disabled>
                      Select Network
                    </option>
                    <option value="TRC20">TRC20</option>
                  </select>
                </div>

                <div className="my-4 relative">
                  <input
                    type="text"
                    name="address"
                    value={formData.address}
                    onChange={handleInputChange}
                    placeholder="Enter Wallet Address"
                    className="p-3 bg-black rounded-md focus:outline-none w-full "
                  />

                  {user?.paymentMethods.details.crypto?.walletAddress && (
                    <img
                      src={ICONS.check_green}
                      className="h-4 w-auto absolute top-1/2 -translate-y-1/2 right-4"
                    />
                  )}
                </div>
              </>
            ) : null}

            <div className="my-4">
              <input
                type="text"
                name="amount"
                value={formData.amount}
                onChange={handleInputChange}
                placeholder="Enter Amount (Min 1000 Points)"
                className="p-3 bg-black rounded-md focus:outline-none w-full "
              />
            </div>

            <button
              onClick={handleSubmit}
              disabled={loading}
              className="flex items-center gap-2 px-8 py-3 min-w-48 bg-black text-white font-jua rounded-full hover:bg-dark_blue transition-colors disabled:bg-gray-600"
            >
              {loading && <Loading size="sm" />}
              Send Request
            </button>
          </div>
        </div>
        <div className="flex-1 text-sm">
          <div className="rounded-lg mb-8">
            <h2 className="text-2xl mb-2 flex items-center">
              <span className="font-jua flex gap-2">
                <img src={ICONS.coin_cream} alt="coin" className="w-auto h-6" />
                Current Balance :
              </span>
              <span className="bg-cream text-black px-4 py-1 rounded-md ml-2 font-jua">
                {balance}
              </span>
            </h2>
            <span className="bg-red text-xs px-4 py-1 rounded-lg cursor-pointer">
              Not Verified
            </span>
          </div>
          <div className="mb-8">
            <div className="font-jua mb-2 text-xl">Withdraw Limit</div>
            <div className="flex items-center gap-1">
              <b>Minimun Withdraw:</b>
              <img src={ICONS.coin} alt="coin" className="w-auto h-3" />
              1000
            </div>
            <div className="flex items-center gap-1">
              <b>Maximun Withdraw:</b>
              <img src={ICONS.coin} alt="coin" className="w-auto h-3" />
              100,000 per transaction
            </div>
          </div>

          <div className="mb-8">
            <div className="font-jua mb-2 text-xl">Verification Required</div>
            <div className="">
              First-Time Withdraw? Make sure your account is verified to deposit
              fund
            </div>
          </div>

          <div className="mb-8">
            <div className="font-jua mb-2 text-xl">How to Withdraw:</div>
            <ul className="ml-4">
              <li className="list-disc mb-2">
                Choose the method that suits you best
              </li>
              <li className="list-disc mb-2">
                Specify the amount you want to deposit. Ensure it falls within
                the minimum and maximum limits.
              </li>
              <li className="list-disc mb-2">
                Review your deposit details and confirm the transaction.
              </li>
              <li className="list-disc mb-2">
                Depending on the method, your funds will either be available
                instantly or after processing.
              </li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Withdraw;
