import React, { useState } from "react";
import ICONS from "../../assets/icons/icons";
import Checkbox from "./_components/checkbox";

const Payments: React.FC = () => {
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    cvv: "",
    phoneNumber: "",
    dateOfBirth: "",
    bankName: "",
    country: "",
    city: "",
    address: "",
  });

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

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Handle form submission here
    console.log(formData);
  };

  return (
    <form onSubmit={handleSubmit} className="">
      <h2 className="text-lg  text-white mb-6">Add Payment Method</h2>
      <div className="bg-light_blue p-2 flex items-center justify-between rounded-md mb-2">
        <div>Credit/Debit</div>
        <Checkbox onChange={() => {}} />
      </div>
      <div className="grid grid-cols-3 gap-4 mb-2">
        <input
          type="text"
          name="firstName"
          value={formData.firstName}
          onChange={handleInputChange}
          placeholder="Card Holder Name"
          className="p-2 bg-black rounded-md focus:outline-none "
        />

        <input
          type="text"
          name="lastName"
          value={formData.lastName}
          onChange={handleInputChange}
          placeholder="Card Number"
          className="p-2 bg-black text-white rounded-md focus:outline-none "
        />
        <div className=" relative">
          <input
            type="date"
            name="dateOfBirth"
            value={formData.dateOfBirth}
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

      <div className="bg-light_blue p-2 flex items-center justify-between rounded-md mb-2">
        <div>Bank Transfer</div>
        <Checkbox onChange={() => {}} />
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
          name="lastName"
          value={formData.lastName}
          onChange={handleInputChange}
          placeholder="Account Holder Name"
          className="p-2 bg-black text-white rounded-md focus:outline-none "
        />
        <input
          type="text"
          name="cvv"
          value={formData.cvv}
          onChange={handleInputChange}
          placeholder="Account Number"
          className="p-2 bg-black text-white rounded-md focus:outline-none "
        />
        <input
          type="text"
          name="cvv"
          value={formData.cvv}
          onChange={handleInputChange}
          placeholder="Enter Swift/BTC Code"
          className="p-2 bg-black text-white rounded-md focus:outline-none "
        />
      </div>
      <div className="bg-light_blue p-2 flex items-center justify-between rounded-md mb-2">
        <div>Cryptocurrency</div>
        <Checkbox onChange={() => {}} />
      </div>
      <div className="grid grid-cols-3 gap-4 mb-2">
        <div className=" relative">
          <select
            name="country"
            value={formData.country}
            onChange={handleInputChange}
            className="w-full p-3 bg-black text-white rounded-md focus:outline-none"
          >
            <option value="" disabled>
              Select Currency
            </option>
            {currencies.map((country) => (
              <option key={country} value={country}>
                {country}
              </option>
            ))}
          </select>
          <span className="absolute right-3 top-1/2 transform -translate-y-1/2">
            <img src={ICONS.arrow_down_cream} className="h-2" />
          </span>
        </div>

        <input
          type="text"
          name="lastName"
          value={formData.lastName}
          onChange={handleInputChange}
          placeholder="Enter Wallet Address"
          className="p-2 bg-black text-white rounded-md focus:outline-none "
        />
      </div>

      <button
        type="submit"
        className="mt-6 px-4 py-1 bg-white text-black font-light text-xs rounded-full transition duration-300"
      >
        Update Changes
      </button>
    </form>
  );
};

export default Payments;
