import { Link, Outlet } from "react-router-dom";
import ICONS from "../../assets/icons/icons";
import Sidebar from "./_component/sidebar";

function Settings() {
  return (
    <div className="px-4 md:px-20 py-10">
      <nav className="mb-6 flex items-center gap-2">
        <img src={ICONS.home} alt="home" className="w-4 h-4" />
        <Link to="/" className="hover:text-cream hover:underline">
          Home
        </Link>
        / <span className="text-white">Settings</span>
      </nav>
      <h1 className="text-4xl font-bold mb-8 text-cream">
        Settings & Preferences
      </h1>
      <div className="flex flex-col md:flex-row py-16 gap-8">
        <div className="flex-1">
          <Sidebar />
        </div>
        <div className="flex-[2] bg-[#142635] rounded-md p-4 px-8 ">
          <Outlet />
        </div>
      </div>
    </div>
  );
}

export default Settings;
