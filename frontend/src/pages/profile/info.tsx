import React, { useState } from "react";
import ICONS from "../../assets/icons/icons";
import { useUser } from "../../context/user";
import { useToastNotification } from "../../context/toastNotificationContext";
import Loading from "../_components/loading";

const Info: React.FC = () => {
  const { user, updateUser } = useUser();
  const { addNotification } = useToastNotification();
  const [formData, setFormData] = useState({
    firstName: user?.personalInfo?.firstName,
    lastName: user?.personalInfo?.lastName,
    phoneNumber: user?.personalInfo?.phone,
    dateOfBirth: user?.personalInfo?.dateOfBirth,
    country: user?.personalInfo?.country,
    city: user?.personalInfo?.city,
    address: user?.personalInfo?.address,
  });
  const [loading, setLoading] = useState(false);

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

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      if (!formData.firstName) {
        addNotification({ message: "First name is require", error: true });
        return;
      }

      if (!formData.lastName) {
        addNotification({ message: "Last name is require", error: true });
        return;
      }
      setLoading(true);
      await updateUser({
        personalInfo: {
          firstName: formData.firstName,
          lastName: formData.lastName,
          address: formData.address,
          city: formData.city,
          country: formData.country,
          dateOfBirth: formData.dateOfBirth,
          phone: formData.phoneNumber,
        },
      });
      addNotification({ message: "Personal info updated successfully" });
    } catch (error: any) {
      addNotification({ message: error, error: true });
    } finally {
      setLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className=" rounded-lg  ">
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
      <div className="flex items-center gap-4 mt-6">
        <button
          type="submit"
          className="px-4 py-1 bg-white text-black font-light text-xs rounded-full transition duration-300"
          disabled={loading}
        >
          Update Changes
        </button>
        {loading && <Loading size="sm" />}
      </div>
    </form>
  );
};

export default Info;
