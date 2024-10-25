import Overview from "./_component/overview";
import Transaction from "./_component/transaction";
import User from "./_component/user";
import Withdrawal from "./_component/withdrawal";

function Walletpayment() {
  return (
    <div>
      <h1 className="font-jua text-xl">Wallet & Payment</h1>
      <div className="text-sm mb-6">Manage Your Wallet & Payment Here</div>
      <Overview />
      <User />
      <Transaction />
      <Withdrawal />
      <div className="text-lg font-jua ">Fraud Monitoring</div>
      <div className="">
        Track and manage suspicious activities to maintain the security of the
        platform.
      </div>
      <div className="flex items-center gap-4 mt-4 mb-6">
        <button className="bg-white text-black text-xs p-1 px-4 rounded-md">
          View Flagged Transactions
        </button>
        <button className="bg-white text-black text-xs p-1 px-4 rounded-md">
          Generate Report
        </button>
      </div>

      <div className="text-lg font-jua ">Admin Actions</div>
      <div className="flex items-center gap-4 mt-2">
        <button className="bg-white text-black text-xs p-1 px-4 rounded-md">
          Generate Financial Report
        </button>
        <button className="bg-white text-black text-xs p-1 px-4 rounded-md">
          Export Transactions
        </button>
        <button className="bg-white text-black text-xs p-1 px-4 rounded-md">
          View User Audit
        </button>
      </div>
    </div>
  );
}

export default Walletpayment;
