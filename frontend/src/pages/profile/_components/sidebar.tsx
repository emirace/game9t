import { NavLink } from "react-router-dom";
import ICONS from "../../../assets/icons/icons";

const tabs = [
  // {
  //   name: "Biography",
  //   path: "/profile",
  // },
  // {
  //   name: "Social",
  //   path: "social",
  // },
  {
    name: "Personal Information",
    path: "/profile",
  },
  {
    name: "Payment Methods",
    path: "payments",
  },
  {
    name: "Game History",
    path: "history",
  },
  {
    name: "Transactions",
    path: "transactions",
  },
  // {
  //   name: "Notifications",
  //   path: "#",
  // },
];

function Sidebar() {
  return (
    <div className="flex flex-row md:flex-col overflow-x-auto gap-2">
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
          <div className="font-jua whitespace-nowrap">{tab.name}</div>
          <div className="bg-cream p-2 px-1 rounded-sm hidden md:block">
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
