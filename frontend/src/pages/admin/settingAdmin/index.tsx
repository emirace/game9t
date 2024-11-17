import { FiEye } from "react-icons/fi";
import User from "./_component/user";
import Payment from "./_component/payment";
import Notification from "./_component/notification";
import Support from "./_component/support";
import Bet from "./_component/bet";
function SettingAdmin() {
  return (
    <div>
      <h1 className="font-jua text-xl">Admin Settings</h1>
      <div className="text-sm mb-6">
        Manage site color, brand identity, Typography and More
      </div>
      <User />
      <Payment />
      <Bet />

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
      <Notification />

      <Support />
    </div>
  );
}

export default SettingAdmin;
