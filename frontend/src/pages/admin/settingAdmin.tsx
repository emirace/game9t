import { FiEye } from "react-icons/fi";
function SettingAdmin() {
  return (
    <div>
      <h1 className="font-jua text-xl">Admin Settings</h1>
      <div className="text-sm mb-6">
        Manage site color, brand identity, Typography and More
      </div>
      <h2 className="font-jua text-xl mb-4">User Management Settings</h2>
      <div className="grid grid-cols-3 gap-8">
        <div>
          <div className="text-sm mb-2">Maximum Users</div>
          <select
            name="country"
            // value={formData.country}
            // onChange={handleInputChange}
            className="w-full p-4 bg-light_blue text-white rounded-md focus:outline-none"
          >
            <option value="" disabled>
              0
            </option>
            {/* {countries.map((country) => (
            <option key={country} value={country}>
              {country}
            </option>
          ))} */}
          </select>
        </div>
        <div>
          <div className="text-sm mb-2">Default User Role</div>
          <select
            name="country"
            // value={formData.country}
            // onChange={handleInputChange}
            className="w-full p-4 bg-light_blue text-white rounded-md focus:outline-none"
          >
            <option value="" disabled>
              Select role
            </option>
            {/* {countries.map((country) => (
            <option key={country} value={country}>
              {country}
            </option>
          ))} */}
          </select>
        </div>
        <div>
          <div className="text-sm mb-2">User Verification</div>
          <select
            name="country"
            // value={formData.country}
            // onChange={handleInputChange}
            className="w-full p-4 bg-light_blue text-white rounded-md focus:outline-none"
          >
            <option value="" disabled>
              Select role
            </option>
            {/* {countries.map((country) => (
            <option key={country} value={country}>
              {country}
            </option>
          ))} */}
          </select>
        </div>
      </div>
      <h2 className="font-jua text-xl mb-4 mt-8">Payment Settings</h2>
      <div className="grid grid-cols-3 gap-8">
        <div>
          <div className="text-sm mb-2">Payment Gateway</div>
          <select
            name="country"
            // value={formData.country}
            // onChange={handleInputChange}
            className="w-full p-4 bg-light_blue text-white rounded-md focus:outline-none"
          >
            <option value="" disabled>
              Select gateway
            </option>
            {/* {countries.map((country) => (
            <option key={country} value={country}>
              {country}
            </option>
          ))} */}
          </select>
        </div>
        <div>
          <div className="text-sm mb-2">Default Currency</div>
          <select
            name="country"
            // value={formData.country}
            // onChange={handleInputChange}
            className="w-full p-4 bg-light_blue text-white rounded-md focus:outline-none"
          >
            <option value="" disabled>
              Select currency
            </option>
            {/* {countries.map((country) => (
            <option key={country} value={country}>
              {country}
            </option>
          ))} */}
          </select>
        </div>
        <div>
          <div className="text-sm mb-2">Transaction Limit Per Day</div>
          <select
            name="country"
            // value={formData.country}
            // onChange={handleInputChange}
            className="w-full p-4 bg-light_blue text-white rounded-md focus:outline-none"
          >
            <option value="" disabled>
              Select limit
            </option>
            {/* {countries.map((country) => (
            <option key={country} value={country}>
              {country}
            </option>
          ))} */}
          </select>
        </div>
      </div>
      <h2 className="font-jua text-xl mb-4 mt-8">Predefined Bets</h2>
      <div className="grid grid-cols-7 gap-8">
        {["1", "2", "3", "4", "5", "6"].map((number) => (
          <div key={number}>
            <div className="text-sm mb-2">Bet {number}</div>
            <select
              name="country"
              // value={formData.country}
              // onChange={handleInputChange}
              className="w-full p-4 bg-light_blue text-white rounded-md focus:outline-none"
            >
              <option value="" disabled>
                Select amount
              </option>
              {/* {countries.map((country) => (
            <option key={country} value={country}>
              {country}
            </option>
          ))} */}
            </select>
          </div>
        ))}
      </div>

      <h2 className="font-jua text-xl mb-4 mt-8">Security Settings</h2>
      <div className="grid grid-cols-3 gap-8">
        <div>
          <div className="text-sm mb-2">Admin Email</div>
          <input
            type="text"
            name="name"
            placeholder="Enter Email"
            className="w-full p-4 bg-black text-white rounded-md focus:outline-none "
          />
        </div>
        <div>
          <div className="text-sm mb-2">Admin Password</div>
          <div className="relative">
            <input
              type="password"
              name="name"
              placeholder="***********"
              className="w-full p-4 bg-black text-white rounded-md focus:outline-none "
            />
            <button className=" absolute top-1/2 right-4 -translate-y-1/2 rounded-full transition duration-300">
              <FiEye className="text-cream" />
            </button>
          </div>
        </div>
        <div>
          <div className="text-sm mb-2">Set New Password</div>
          <input
            type="text"
            name="name"
            placeholder="Set Password"
            className="w-full p-4 bg-black text-white rounded-md focus:outline-none "
          />
        </div>
      </div>

      <h2 className="font-jua text-xl mb-4 mt-8">Notification Settings</h2>
      <div className="grid grid-cols-3 gap-8">
        <div>
          <div className="text-sm mb-2">Email Notification</div>
          <select
            name="country"
            // value={formData.country}
            // onChange={handleInputChange}
            className="w-full p-4 bg-light_blue text-white rounded-md focus:outline-none"
          >
            <option value={"Enable"}>{"Enable"}</option>
            <option value={"Disable"}>{"Disable"}</option>
          </select>
        </div>
        <div>
          <div className="text-sm mb-2">SMS Notification</div>
          <select
            name="country"
            // value={formData.country}
            // onChange={handleInputChange}
            className="w-full p-4 bg-light_blue text-white rounded-md focus:outline-none"
          >
            <option value={"Enable"}>{"Enable"}</option>
            <option value={"Disable"}>{"Disable"}</option>
          </select>
        </div>
        <div>
          <div className="text-sm mb-2">Live Chat</div>
          <select
            name="country"
            // value={formData.country}
            // onChange={handleInputChange}
            className="w-full p-4 bg-light_blue text-white rounded-md focus:outline-none"
          >
            <option value={"Enable"}>{"Enable"}</option>
            <option value={"Disable"}>{"Disable"}</option>
          </select>
        </div>
      </div>

      <h2 className="font-jua text-xl mb-4 mt-8">Support and Contact</h2>
      <div className="grid grid-cols-3 gap-8">
        <div>
          <div className="text-sm mb-2">Support Email</div>
          <input
            type="text"
            name="name"
            placeholder="Enter Email"
            className="w-full p-4 bg-black text-white rounded-md focus:outline-none "
          />
        </div>
        <div>
          <div className="text-sm mb-2">Contact Number</div>
          <input
            type="text"
            name="name"
            placeholder="Enter Number"
            className="w-full p-4 bg-black text-white rounded-md focus:outline-none "
          />
        </div>
        <div>
          <div className="text-sm mb-2">Live Chat Link</div>
          <input
            type="text"
            name="name"
            placeholder="Paste link here"
            className="w-full p-4 bg-black text-white rounded-md focus:outline-none "
          />
        </div>
      </div>
    </div>
  );
}

export default SettingAdmin;
