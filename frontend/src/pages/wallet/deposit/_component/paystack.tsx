import { usePaystackPayment } from "react-paystack";
import { HookConfig } from "react-paystack/dist/types";
import { useUser } from "../../../../context/user";
import { PaystackResponse } from "../../../../types/payment";
import { useWallet } from "../../../../context/wallet";
import { useToastNotification } from "../../../../context/toastNotificationContext";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

const Paystack: React.FC<{ amount: string }> = ({ amount }) => {
  const { user } = useUser();
  const { fund } = useWallet();
  const { addNotification } = useToastNotification();
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

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
      navigate("/wallet");
    } catch (error: any) {
      addNotification({ message: error, error: true });
    } finally {
      setLoading(false);
    }
  };

  const onClose = () => {
    console.log("closed");
    // onClose();
  };

  const initializePayment = usePaystackPayment(config);
  return (
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
      className="px-4 py-2 min-w-48 bg-black font-semibold rounded-full hover:bg-dark_blue transition-colors disabled:bg-gray-500"
      disabled={loading}
    >
      Pay Now
    </button>
  );
};

export default Paystack;
