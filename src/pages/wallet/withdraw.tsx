import React from "react";
import { Link } from "react-router-dom";
import ICONS from "../../assets/icons/icons";
import IMAGES from "../../assets/images/images";

const Withdraw: React.FC = () => {
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
          <div className="flex items-center gap-2">
            <div className="w-40 bg-dark_blue p-2">₦200</div>
            <img src={ICONS.check_green} alt="" className="w-4 h-4" />
          </div>
          <div className="font-jua my-4">Withdraw in</div>
          <div className="bg-light_blue p-4 px-8 rounded-lg mb-6">
            <img
              src={IMAGES.paystack}
              alt="paystack"
              className="w-auto h-12 mb-4"
            />
            <div className="text-sm max-w-xl mb-4">
              Easily deposit and withdraw funds using Paystack's secure payment
              gateway. Accepts debit/credit cards, bank transfers, and more.
            </div>
            <button className="px-4 py-2 min-w-48 bg-black font-semibold rounded-full hover:bg-dark_blue transition-colors">
              Pay Now
            </button>
          </div>
          <div className="bg-light_blue p-4 px-8 rounded-lg">
            <img
              src={IMAGES.nowpayment}
              alt="paystack"
              className="w-auto h-12 mb-4"
            />
            <div className="text-sm max-w-xl mb-4">
              Make quick and secure deposits and withdrawals using NOWPayments,
              supporting a wide range of cryptocurrencies
            </div>
            <button className="px-4 py-2 min-w-48 bg-black font-semibold rounded-full hover:bg-dark_blue transition-colors">
              Pay Now
            </button>
          </div>
        </div>
        <div className="flex-1 text-sm">
          <div className="rounded-lg mb-8">
            <h2 className="text-2xl mb-2">
              <span className="font-jua">
                <span className="text-cream">$</span> Current Balance :
              </span>
              <span className="bg-cream text-black px-4 py-1 rounded-md ml-2 font-jua">
                ₦200
              </span>
            </h2>
            <span className="bg-red text-xs px-4 py-1 rounded-lg">
              Not Verified
            </span>
          </div>
          <div className="mb-8">
            <div className="font-jua mb-2 text-xl">Withdraw Limit</div>
            <div className="">
              <b>Minimun Withdraw:</b> ₦200
            </div>
            <div className="">
              <b>Maximun Withdraw:</b> ₦100,000 per transaction
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
