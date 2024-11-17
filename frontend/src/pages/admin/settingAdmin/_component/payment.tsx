import { useState, useEffect } from "react";
import { useBranding } from "../../../../context/branding";
import { useToastNotification } from "../../../../context/toastNotificationContext";

function Payment() {
  const { branding, updateBranding } = useBranding();
  const { addNotification } = useToastNotification();

  // Initialize local state for the payment settings
  const [formData, setFormData] = useState({
    paymentGateway: "",
    currency: "",
    dailyTransactionLimit: "",
  });

  // Keep track of the initial state for comparison
  const [initialPaymentSettings, setInitialPaymentSettings] =
    useState(formData);

  // Set default values from branding context on initial load
  useEffect(() => {
    if (branding) {
      const initialData = {
        paymentGateway: branding?.adminSettings?.paymentGateway || "",
        currency: branding?.adminSettings?.currency || "",
        dailyTransactionLimit:
          branding?.adminSettings?.dailyTransactionLimit || "",
      };
      setFormData(initialData);
      setInitialPaymentSettings(initialData); // Store the initial state
    }
  }, [branding]);

  // Handle input change for form fields
  const handleChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  // Handle form submission to update payment settings
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    await updateBranding({
      adminSettings: { ...branding!.adminSettings, ...formData },
    });
    addNotification({ message: "Updated successfully" });
  };

  // Check if any field has changed
  const isChanged =
    JSON.stringify(formData) !== JSON.stringify(initialPaymentSettings);

  return (
    <div>
      <h2 className="font-jua text-xl mb-4 mt-8">Payment Settings</h2>
      <form onSubmit={handleSubmit}>
        <div className="grid grid-cols-3 gap-8">
          {/* Payment Gateway */}
          <div>
            <div className="text-sm mb-2">Payment Gateway</div>
            <select
              name="paymentGateway"
              value={formData.paymentGateway}
              onChange={handleChange}
              className="w-full p-4 bg-light_blue text-white rounded-md focus:outline-none"
            >
              <option value="" disabled>
                Select gateway
              </option>
              <option value="paypal">PayPal</option>
              {/* <option value="stripe">Stripe</option>
              <option value="razorpay">Razorpay</option> */}
            </select>
          </div>

          {/* Default Currency */}
          <div>
            <div className="text-sm mb-2">Default Currency</div>
            <select
              name="currency"
              value={formData.currency}
              onChange={handleChange}
              className="w-full p-4 bg-light_blue text-white rounded-md focus:outline-none"
            >
              <option value="" disabled>
                Select currency
              </option>
              <option value="ngn">NGN</option>
              <option value="usd">USD</option>
              <option value="eur">EUR</option>
              <option value="inr">INR</option>
            </select>
          </div>

          {/* Transaction Limit Per Day */}
          <div>
            <div className="text-sm mb-2">Transaction Limit Per Day</div>
            <select
              name="dailyTransactionLimit"
              value={formData.dailyTransactionLimit}
              onChange={handleChange}
              className="w-full p-4 bg-light_blue text-white rounded-md focus:outline-none"
            >
              <option value="" disabled>
                Select limit
              </option>
              <option value="1000">1000</option>
              <option value="5000">5000</option>
              <option value="10000">10000</option>
            </select>
          </div>
        </div>

        {/* Submit Button */}
        {isChanged && (
          <div className="mt-8">
            <button
              type="submit"
              className="px-4 py-2 bg-cream text-black rounded-md font-medium hover:opacity-75 ransition duration-300"
            >
              Update Payment Settings
            </button>
          </div>
        )}
      </form>
    </div>
  );
}

export default Payment;
