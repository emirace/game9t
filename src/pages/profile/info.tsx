import React, { useState } from "react";
import ICONS from "../../assets/icons/icons";

const Info: React.FC = () => {
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    phoneNumber: "",
    dateOfBirth: "",
    country: "",
    city: "",
    address: "",
  });

  const countries = ["USA", "Canada", "Nigeria", "India", "UK"]; // Example country list

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
    <form onSubmit={handleSubmit} className=" rounded-lg max-w-lg ">
      <h2 className="text-lg  text-white mb-6">Add Personal Information</h2>

      <div className="grid grid-cols-2 gap-4">
        {/* First Name */}
        <input
          type="text"
          name="firstName"
          value={formData.firstName}
          onChange={handleInputChange}
          placeholder="First Name"
          className="p-2 bg-black rounded-md focus:outline-none "
        />

        {/* Last Name */}
        <input
          type="text"
          name="lastName"
          value={formData.lastName}
          onChange={handleInputChange}
          placeholder="Last Name"
          className="p-2 bg-black text-white rounded-md focus:outline-none "
        />
      </div>

      {/* Phone Number */}
      <div className="mt-4">
        <input
          type="tel"
          name="phoneNumber"
          value={formData.phoneNumber}
          onChange={handleInputChange}
          placeholder="Phone Number"
          className="w-full p-2 bg-black text-white rounded-md focus:outline-none "
        />
      </div>

      {/* Date of Birth */}
      <div className="mt-4 relative">
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

      {/* Country Selection */}
      <div className="mt-4 relative">
        <select
          name="country"
          value={formData.country}
          onChange={handleInputChange}
          className="w-full p-3 bg-black text-white rounded-md focus:outline-none"
        >
          <option value="" disabled>
            Select Country
          </option>
          {countries.map((country) => (
            <option key={country} value={country}>
              {country}
            </option>
          ))}
        </select>
        <span className="absolute right-3 top-1/2 transform -translate-y-1/2">
          <img src={ICONS.arrow_down_cream} className="h-2" />
        </span>
      </div>

      <div className="grid grid-cols-2 gap-4 mt-4">
        {/* City */}
        <input
          type="text"
          name="city"
          value={formData.city}
          onChange={handleInputChange}
          placeholder="City"
          className="p-3 bg-black text-white rounded-md focus:outline-none"
        />

        {/* Address */}
        <input
          type="text"
          name="address"
          value={formData.address}
          onChange={handleInputChange}
          placeholder="Address"
          className="p-3 bg-black text-white rounded-md focus:outline-none"
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

export default Info;
