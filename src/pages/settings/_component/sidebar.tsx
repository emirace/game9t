import { NavLink } from "react-router-dom";
import ICONS from "../../../assets/icons/icons";

const tabs = [
  {
    name: "Account Settings",
    path: "/settings",
  },
  {
    name: "Privacy Settings",
    path: "privacy",
  },
  {
    name: "Notifications",
    path: "notification",
  },
  {
    name: "Security Settings",
    path: "security",
  },
  {
    name: "Payment & Wallet Settings",
    path: "payment",
  },
  {
    name: "Gameplay Settings",
    path: "gameplay",
  },
  {
    name: "Friend & Challenge Preferences",
    path: "friends",
  },
  {
    name: "Account Deletion",
    path: "delete",
  },
];

function Sidebar() {
  return (
    <div className="flex flex-col gap-2">
      {tabs.map((tab, index) => (
        <NavLink
          to={tab.path}
          end
          key={index}
          className={({ isActive }) =>
            `flex items-center justify-between p-3 px-6 ${
              isActive ? "bg-black" : "bg-dark"
            } rounded-md`
          }
        >
          <div className="font-jua">{tab.name}</div>
          <div className="bg-cream p-2 px-1 rounded-sm">
            <img
              src={ICONS.arrow_down}
              className={`h-2 -rotate-90`}
              alt="arrow"
            />
          </div>
        </NavLink>
      ))}
    </div>
  );
}

export default Sidebar;
