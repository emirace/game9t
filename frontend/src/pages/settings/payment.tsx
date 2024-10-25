import { Link } from "react-router-dom";

function Payment() {
  return (
    <div>
      <div className="text-lg font-medium mb-4">Payment & Wallet Settings</div>
      <div className=" flex items-start justify-between mb-4">
        <div>
          <div className="text-sm">Payment Methods</div>
          <div className="text-xs font-light">
            Add or remove payment options (Debit/Credit Cards, Crypto Wallets).
          </div>
        </div>
        <Link
          to="/profile/payments"
          className="bg-white rounded-full text-xs py-1 px-2 text-black"
        >
          Add
        </Link>
      </div>

      <div className=" flex items-start justify-between mb-4">
        <div>
          <div className="text-sm">Auto-Deposit</div>
          <div className="text-xs font-light">
            Enable or disable automatic deposits when your balance falls below a
            set limit.
          </div>
        </div>
        <button className="bg-white rounded-full text-xs py-1 px-2 text-black">
          Enable
        </button>
      </div>
      <div className=" flex items-start justify-between mb-4">
        <div>
          <div className="text-sm">Withdrawal Preferences</div>
          <div className="text-xs font-light">
            Set default withdrawal method (Bank Transfer, Crypto, etc.).
          </div>
        </div>
        <button className="bg-white rounded-full text-xs py-1 px-2 text-black">
          Change
        </button>
      </div>
    </div>
  );
}

export default Payment;
