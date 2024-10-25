import React, { useState } from "react";
import ICONS from "../../assets/icons/icons";
import Checkbox from "./_components/checkbox";
import { useUser } from "../../context/user";
import { useToastNotification } from "../../context/toastNotificationContext";
import Loading from "../_components/loading";

const Payments: React.FC = () => {
  const { user, updateUser } = useUser();
  const { addNotification } = useToastNotification();
  const [formData, setFormData] = useState({
    cardHolderName: user?.paymentMethods?.details?.creditCard?.cardHolderName,
    cardNumber: user?.paymentMethods?.details?.creditCard?.cardNumber,
    cvv: user?.paymentMethods?.details?.creditCard?.cvv,
    expiryDate: user?.paymentMethods?.details?.creditCard?.expiryDate,
    bankName: user?.paymentMethods?.details?.bankTransfer?.bankName,
    accountHolderName:
      user?.paymentMethods?.details?.bankTransfer?.accountHolderName,
    accountNumber: user?.paymentMethods?.details?.bankTransfer?.accountNumber,
    code: user?.paymentMethods?.details?.bankTransfer?.code,
    walletAddress: user?.paymentMethods?.details?.crypto?.walletAddress,
    currency: user?.paymentMethods?.details?.crypto?.currency,
  });
  const [selectedMethod, setSelectedMethod] = useState(
    user?.paymentMethods.preferredMethod || "creditCard"
  );
  const [loading, setLoading] = useState(false);

  const currencies = ["BTC", "Ethereum", "TRX"];

  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const validateForm = () => {
    let isValid = true;
    let message = "";

    if (selectedMethod === "creditCard") {
      if (
        !formData.cardHolderName ||
        !formData.cardNumber ||
        !formData.cvv ||
        !formData.expiryDate
      ) {
        message = "Please fill in all credit card details.";
        isValid = false;
      }
    } else if (selectedMethod === "bankTransfer") {
      if (
        !formData.bankName ||
        !formData.accountHolderName ||
        !formData.accountNumber ||
        !formData.code
      ) {
        message = "Please fill in all bank transfer details.";
        isValid = false;
      }
    } else if (selectedMethod === "crypto") {
      if (!formData.currency || !formData.walletAddress) {
        message = "Please select a currency and provide a wallet address.";
        isValid = false;
      }
    }

    if (!isValid) {
      addNotification({ message, error: true });
    }

    return isValid;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!validateForm()) {
      return;
    }

    try {
      setLoading(true);
      await updateUser({
        paymentMethods: {
          preferredMethod: selectedMethod,
          details: { [selectedMethod]: { ...formData } },
        },
      });
      addNotification({ message: "Payment method updated successfully" });
    } catch (error: any) {
      addNotification({
        message: error.message || "Error updating payment method",
        error: true,
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="">
      <h2 className="text-lg  text-white mb-6">Add Payment Method</h2>
      {/* Credit Card Section */}
      <div className="bg-light_blue p-2 flex items-center justify-between rounded-md mb-2">
        <div>Credit/Debit</div>
        <Checkbox
          checked={selectedMethod === "creditCard"}
          onChange={() => setSelectedMethod("creditCard")}
        />
      </div>
      <div className="grid grid-cols-3 gap-4 mb-2">
        <input
          type="text"
          name="cardHolderName"
          value={formData.cardHolderName}
          onChange={handleInputChange}
          placeholder="Card Holder Name"
          className="p-2 bg-black rounded-md focus:outline-none "
        />
        <input
          type="text"
          name="cardNumber"
          value={formData.cardNumber}
          onChange={handleInputChange}
          placeholder="Card Number"
          className="p-2 bg-black text-white rounded-md focus:outline-none "
        />
        <div className="relative">
          <input
            type="date"
            name="expiryDate"
            value={formData.expiryDate}
            onChange={handleInputChange}
            className="w-full p-2 bg-black text-white rounded-md focus:outline-none "
          />
          <span className="absolute right-3 top-1/2 transform -translate-y-1/2">
            <img src={ICONS.carlendar} className="h-4" />
          </span>
        </div>
        <input
          type="text"
          name="cvv"
          value={formData.cvv}
          onChange={handleInputChange}
          placeholder="Enter CVV"
          className="p-2 bg-black text-white rounded-md focus:outline-none "
        />
      </div>

      {/* Bank Transfer Section */}
      <div className="bg-light_blue p-2 flex items-center justify-between rounded-md mb-2">
        <div>Bank Transfer</div>
        <Checkbox
          checked={selectedMethod === "bankTransfer"}
          onChange={() => setSelectedMethod("bankTransfer")}
        />
      </div>
      <div className="grid grid-cols-3 gap-4 mb-2">
        <input
          type="text"
          name="bankName"
          value={formData.bankName}
          onChange={handleInputChange}
          placeholder="Bank Name"
          className="p-2 bg-black rounded-md focus:outline-none "
        />
        <input
          type="text"
          name="accountHolderName"
          value={formData.accountHolderName}
          onChange={handleInputChange}
          placeholder="Account Holder Name"
          className="p-2 bg-black text-white rounded-md focus:outline-none "
        />
        <input
          type="text"
          name="accountNumber"
          value={formData.accountNumber}
          onChange={handleInputChange}
          placeholder="Account Number"
          className="p-2 bg-black text-white rounded-md focus:outline-none "
        />
        <input
          type="text"
          name="code"
          value={formData.code}
          onChange={handleInputChange}
          placeholder="Enter Swift/BTC Code"
          className="p-2 bg-black text-white rounded-md focus:outline-none "
        />
      </div>

      {/* Cryptocurrency Section */}
      <div className="bg-light_blue p-2 flex items-center justify-between rounded-md mb-2">
        <div>Cryptocurrency</div>
        <Checkbox
          checked={selectedMethod === "crypto"}
          onChange={() => setSelectedMethod("crypto")}
        />
      </div>
      <div className="grid grid-cols-3 gap-4 mb-2">
        <div className="relative">
          <select
            name="currency"
            value={formData.currency}
            onChange={handleInputChange}
            className="w-full p-3 bg-black text-white rounded-md focus:outline-none"
          >
            <option value="" disabled>
              Select Currency
            </option>
            {currencies.map((currency) => (
              <option key={currency} value={currency}>
                {currency}
              </option>
            ))}
          </select>
          <span className="absolute right-3 top-1/2 transform -translate-y-1/2">
            <img src={ICONS.arrow_down_cream} className="h-2" />
          </span>
        </div>
        <input
          type="text"
          name="walletAddress"
          value={formData.walletAddress}
          onChange={handleInputChange}
          placeholder="Enter Wallet Address"
          className="p-2 bg-black text-white rounded-md focus:outline-none "
        />
      </div>

      {/* Submit Button */}
      <div className="flex items-center gap-4 mt-6">
        <button
          type="submit"
          className=" px-4 py-1 bg-white text-black font-light text-xs rounded-full transition duration-300"
        >
          Update Changes
        </button>
        {loading && <Loading size="sm" />}
      </div>
    </form>
  );
};

export default Payments;
