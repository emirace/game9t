import React, { useState } from "react";
import { Link } from "react-router-dom";
import ICONS from "../../../assets/icons/icons";
import Paystack from "./_component/paystack";
import Model from "../../_components/model";
import Nowpayment from "./_component/nowpayment";

const Deposit: React.FC = () => {
  const [showNowpayment, setShowNowpayment] = useState(false);
  const [showPaystack, setShowPaystack] = useState(false);

  return (
    <div className="bg-dark-900 text-white min-h-screen p-6 pb-40 md:px-20">
      {/* Breadcrumb */}
      <nav className="mb-6 flex items-center gap-2">
        <img src={ICONS.home} alt="home" className="w-4 h-4" />
        <Link to="/" className="hover:text-cream hover:underline">
          Home
        </Link>
        / <span className="text-white">Add Funds</span>
      </nav>

      {/* Title */}
      <h1 className="text-4xl font-bold mb-4 text-cream">Add Funds</h1>
      <div className="text-3xl  font-jua text-center mb-8 ">
        Choose Deposit Method & Amount
      </div>
      <div className="flex flex-col md:flex-row gap-8">
        <div className="flex-[2]">
          <div className="font-jua my-4">Pay With</div>
          <div className="bg-light_blue p-4 px-8 rounded-lg mb-6">
            <div className="font-jua my-4 text-xl uppercase">Naira ₦</div>

            <div className="text-sm max-w-xl mb-4">
              Easily deposit and withdraw funds using secure payment gateway.
              Accepts debit/credit cards, bank transfers, and more.
            </div>

            <button
              onClick={() => setShowPaystack(true)}
              className="px-4 py-2 min-w-48 bg-black font-semibold rounded-full hover:bg-dark_blue transition-colors"
            >
              Pay Now
            </button>
          </div>
          <div className="bg-light_blue p-4 px-8 rounded-lg">
            <div className="font-jua text-xl my-4 uppercase">Crypto</div>
            <div className="text-sm max-w-xl mb-4">
              Make quick and secure deposits and withdrawals using stable coin
            </div>
            <button
              onClick={() => setShowNowpayment(true)}
              className="px-4 py-2 min-w-48 bg-black font-semibold rounded-full hover:bg-dark_blue transition-colors"
            >
              Pay Now
            </button>
          </div>
        </div>
        <div className="flex-1 text-sm">
          <div className="mb-8">
            <div className="font-jua mb-2 text-xl">Deposit Limit</div>
            <div className="flex gap-2 items-center">
              <b>Minimun Deposit:</b>
              <img src={ICONS.coin} alt="coin" className="w-auto h-3" />
              200
            </div>
            <div className="flex gap-2 items-center">
              <b>Maximun Deposit:</b>
              <img src={ICONS.coin} alt="coin" className="w-auto h-3" />
              100,000 per transaction
            </div>
          </div>

          <div className="mb-8">
            <div className="font-jua mb-2 text-xl">Verification Required</div>
            <div className="">
              First-Time Deposit? Make sure your account is verified to deposit
              fund
            </div>
          </div>

          <div className="mb-8">
            <div className="font-jua mb-2 text-xl">How to Deposit:</div>
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
      <Model isOpen={showPaystack} onClose={() => setShowPaystack(false)}>
        <Paystack onClose={() => setShowPaystack(false)} />
      </Model>
      <Model isOpen={showNowpayment} onClose={() => setShowNowpayment(false)}>
        <Nowpayment />
      </Model>
    </div>
  );
};

export default Deposit;
