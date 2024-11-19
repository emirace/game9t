import React, { useState, useEffect } from "react";
import {
  createPayment,
  getConversionEstimate,
  getCurrenciesWithFixedRate,
  getMinAmount,
} from "../../../../services/nowpayment";
import QRCode from "react-qr-code";
import { FaRegCopy } from "react-icons/fa";

const PointsToCurrency: React.FC = () => {
  const POINT_TO_USD_RATE = 0.003; // Conversion rate: 1 point = 0.003 USD
  const [currencies, setCurrencies] = useState<string[]>([]);
  const [filteredCurrencies, setFilteredCurrencies] = useState<string[]>([]);
  const [searchTerm, setSearchTerm] = useState<string>("");
  const [selectedCurrency, setSelectedCurrency] = useState<string>("");
  const [points, setPoints] = useState<number>(0);
  const [usdAmount, setUsdAmount] = useState<number>(0);
  const [cryptoAmount, setCryptoAmount] = useState<number | null>(null);
  const [address, setAddress] = useState("");
  const [copied, setCopied] = useState(false);
  const [showSelect, setShowSelect] = useState(false);
  const [minimalAmount, setMinimalAmount] = useState(0);

  const handleCreatePayment = async () => {
    try {
      const paymentDetails = {
        price_amount: usdAmount,
        price_currency: "usd",
        pay_currency: selectedCurrency,
        order_id: `order-${Date.now()}`,
        order_description: "Top up wallet",
        ipn_callback_url: import.meta.env.VITE_BACKEND_URL + "/api/wallets/ipn",
      };

      const payment = await createPayment(paymentDetails);
      setAddress(payment.pay_address);
    } catch (error) {
      console.error("Error creating payment:", error);
    }
  };

  // Fetch available currencies on component mount
  useEffect(() => {
    const fetchCurrencies = async () => {
      try {
        const availableCurrencies = await getCurrenciesWithFixedRate();
        setCurrencies(availableCurrencies.currencies);
      } catch (error) {
        console.error("Error fetching currencies:", error);
      }
    };
    fetchCurrencies();
  }, []);

  // Update USD amount whenever points change
  useEffect(() => {
    setUsdAmount(points * POINT_TO_USD_RATE);
  }, [points]);

  // Fetch estimated cryptocurrency amount when currency or USD amount changes
  useEffect(() => {
    const fetchCryptoAmount = async () => {
      if (!selectedCurrency || usdAmount < 0.3) return;
      try {
        const estimate = await getConversionEstimate({
          amount: usdAmount,
          currencyFrom: "usd",
          currencyTo: selectedCurrency,
        });
        setCryptoAmount(parseFloat(estimate.estimated_amount));
      } catch (error) {
        console.error("Error fetching crypto amount:", error);
        setCryptoAmount(null);
      }
    };
    fetchCryptoAmount();
  }, [selectedCurrency, usdAmount]);

  useEffect(() => {
    const fetchMinimalAmount = async () => {
      if (!selectedCurrency) return;
      const minAmount = await getMinAmount({
        currencyFrom: selectedCurrency,
      });
      setMinimalAmount(parseFloat(minAmount.min_amount) / POINT_TO_USD_RATE);
    };
    fetchMinimalAmount();
  }, [selectedCurrency]);

  useEffect(() => {
    if (searchTerm.trim() === "") {
      setFilteredCurrencies(currencies);
    } else {
      setFilteredCurrencies(
        currencies.filter((currency) =>
          currency.toLowerCase().includes(searchTerm.toLowerCase())
        )
      );
    }
  }, [searchTerm, currencies]);

  const handleCurrencySelect = (currency: string) => {
    setSelectedCurrency(currency);
    setSearchTerm(currency);
    setShowSelect(false);
  };

  const handleCopy = () => {
    navigator.clipboard.writeText(address);
    setCopied(true);

    // Hide the copied message after 3 seconds
    setTimeout(() => {
      setCopied(false);
    }, 3000);
  };

  return (
    <div className="p-6">
      <h1 className="text-2xl mb-4 font-jua">Fund Wallet</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 ">
        <div>
          {/* Points Input */}
          <div className="mb-4">
            <label htmlFor="points" className="block mb-2">
              Enter Points: (Max 100,000)
            </label>
            <input
              type="number"
              id="points"
              value={points}
              onChange={(e) => setPoints(Number(e.target.value))}
              className="border p-2 rounded w-full bg-black"
            />
            {minimalAmount && <p>Minimal amount: {minimalAmount}</p>}
          </div>
          <div className="mb-4 relative">
            <label htmlFor="currency" className="block mb-2">
              Select Payment Currency:
            </label>
            <input
              type="text"
              id="currency"
              placeholder="Search or select a currency..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="border p-2 rounded w-full bg-black"
              onClick={() => setShowSelect(true)}
            />
            {showSelect && (
              <ul className="absolute z-10 bg-white border rounded w-full max-h-40 overflow-y-auto mt-1">
                {filteredCurrencies.map((currency) => (
                  <li
                    key={currency}
                    className="p-2 hover:bg-cream hover:text-black cursor-pointer bg-black"
                    onClick={() => handleCurrencySelect(currency)}
                  >
                    {currency}
                  </li>
                ))}
              </ul>
            )}
          </div>

          {/* Display USD and Crypto Amounts */}
          <div className="mb-4">
            {cryptoAmount !== null && (
              <p>
                Total Amount in {selectedCurrency}:{" "}
                <strong>
                  {cryptoAmount.toFixed(8)} {selectedCurrency}
                </strong>
              </p>
            )}
          </div>

          {/* Alert if no currency is selected */}
          {!selectedCurrency && (
            <p className="text-red-500">
              Please select a currency to see the conversion.
            </p>
          )}

          <button
            onClick={handleCreatePayment}
            className="px-4 py-2 min-w-48 bg-cream text-black font-semibold rounded-full hover:bg-dark_blue transition-colors disabled:bg-gray-400"
            disabled={!selectedCurrency || !usdAmount}
          >
            Pay Now
          </button>
        </div>
        <div className="flex flex-col gap-4 justify-center items-center">
          {address && (
            <div className="flex flex-col items-center ">
              <div className="font-jua text-xl mb-4">
                Make payment to this address
              </div>

              <p className="mb-2 text-xs">
                Always double-check the address and the amount before sending.
                We cannot recover funds sent to the wrong address. The final
                amount is calculated once your deposit confirms on the network.
              </p>
              <p className="text-xs mb-2">
                Scan the QR code or copy the address and send your desired
                amount. Your deposit will be confirmed after 1 confirmation on
                the network.
              </p>
              <div className="bg-white h-[178px] w-[178px] p-1 flex justify-center items-center">
                <QRCode
                  value={address}
                  style={{ height: "170px", width: "170px" }}
                />
              </div>

              <div className="flex items-center gap-4 bg-secondary w-full rounded-full p-4">
                <>
                  <input
                    type="text"
                    id="trxAddress"
                    value={address}
                    readOnly
                    className="bg-transparent outline-none w-full text-white placeholder-gray-400"
                  />
                  {copied ? (
                    <span className="text-primary ml-2">Copied!</span>
                  ) : (
                    <FaRegCopy
                      className="text-white"
                      onClick={handleCopy}
                      size={24}
                    />
                  )}
                </>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default PointsToCurrency;
