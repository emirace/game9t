import { NavLink } from "react-router-dom";
import ICONS from "../../../assets/icons/icons";

const tabs = [
  {
    name: "Dashboard",
    path: "/admin",
  },
  {
    name: "User Management",
    path: "users",
  },
  {
    name: "Game Management",
    path: "game",
  },
  {
    name: "Wallet & Payment",
    path: "payments",
  },
  {
    name: "Betting Management",
    path: "betting",
  },
  {
    name: "Leaderboard Management",
    path: "leaderboard",
  },
  {
    name: "Site Customization",
    path: "site",
  },
  {
    name: "Admin Settings",
    path: "settings",
  },
];

function Sidebar() {
  return (
    <div className="flex flex-col gap-2 bg-dark px-4 py-8 h-full">
      {tabs.map((tab, index) => (
        <NavLink
          to={tab.path}
          end
          key={index}
          className={({ isActive }) =>
            `flex items-center justify-between p-3 px-6 ${
              isActive ? "bg-black" : "bg-[#282828]"
            } rounded-md`
          }
        >
          <div className="font-jua">{tab.name}</div>
        </NavLink>
      ))}
      <img
        src={ICONS.settings}
        className={`w-4 cursor-pointer`}
        alt="setting"
      />
    </div>
  );
}

export default Sidebar;
