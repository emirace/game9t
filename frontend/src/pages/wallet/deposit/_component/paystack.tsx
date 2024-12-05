import { usePaystackPayment } from "react-paystack";
import { HookConfig } from "react-paystack/dist/types";
import { useUser } from "../../../../context/user";
import { PaystackResponse } from "../../../../types/payment";
import { useWallet } from "../../../../context/wallet";
import { useToastNotification } from "../../../../context/toastNotificationContext";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import ICONS from "../../../../assets/icons/icons";
import Loading from "../../../_components/loading";

const POINT_TO_NGN_RATE = 5;

const Paystack: React.FC<{ onClose: () => void }> = ({ onClose }) => {
  const { user } = useUser();
  const { fund } = useWallet();
  const { addNotification } = useToastNotification();
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const [points, setPoints] = useState("");
  const [amount, setAmount] = useState("");

  const config: HookConfig = {
    reference:
      "REP_" +
      Math.floor(Math.random() * 1000 + 1) +
      new Date().getTime().toString(),
    email: user?.email,
    amount: parseFloat(amount) * 100,
    publicKey: "pk_test_e39bc08f564bd294a0d9f97e27e0099c540052f8",
    currency: "NGN",
  };

  const onSuccess = async (reference: PaystackResponse) => {
    console.log(reference);
    try {
      setLoading(true);
      await fund(amount, reference.reference);
      addNotification({ message: "Wallet funded successfully" });
      onClose();
      navigate("/wallet");
    } catch (error: any) {
      addNotification({ message: error, error: true });
    } finally {
      setLoading(false);
    }
  };

  const initializePayment = usePaystackPayment(config);

  useEffect(() => {
    if (points) {
      setAmount(`${parseFloat(points) * POINT_TO_NGN_RATE}`);
    } else {
      setAmount("");
    }
  }, [points]);

  return (
    <div className="p-6">
      <h1 className="text-2xl mb-4 font-jua">Fund Wallet</h1>
      <div className="flex gap-2 items-center mb-6">
        <input
          placeholder="Enter amount"
          className="bg-black p-2 w-1/2"
          onChange={(e) => setPoints(e.target.value)}
        />

        {parseFloat(amount) >= 200 && (
          <img src={ICONS.check_green} alt="" className="w-4 h-4" />
        )}
      </div>

      {!!amount && (
        <div>
          {points} credit = ₦{amount}
        </div>
      )}

      <button
        onClick={() => {
          if (!amount || parseFloat(amount) < 200) {
            addNotification({
              message: "Please enter a valid amount",
              error: true,
            });
            return;
          }
          setLoading(true);
          initializePayment({ onSuccess, onClose });
        }}
        className="px-4 py-2 flex items-center gap-2 min-w-48 bg-black font-semibold rounded-full hover:bg-dark_blue transition-colors disabled:bg-gray-500"
        disabled={loading}
      >
        {loading && <Loading size="sm" />} Pay Now
      </button>
    </div>
  );
};

export default Paystack;
