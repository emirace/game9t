import ICONS from "../../assets/icons/icons";
import IMAGES from "../../assets/images/images";

const sidelists = [
  { icon: ICONS.dashboard, label: "Dashboard" },
  { icon: ICONS.box, label: "Profile" },
  { icon: ICONS.wallet, label: "Wallet" },
  { icon: ICONS.flag, label: "Challenge" },
  { icon: ICONS.settings, label: "Setting" },
  { icon: ICONS.support, label: "Support" },
  { icon: ICONS.logout, label: "Logout" },
];

function Sidebar() {
  return (
    <div>
      <div className="flex items-center gap-4 bg-black px-6 p-4 absolute top-0 left-0 right-0 ">
        <img src={IMAGES.user} className="h-10 w-10 rounded-full" alt="user" />
        <div className="">
          <div className="font-jua">Mr Yagesh</div>
          <div className="flex items-center gap-2">
            <div className="w-1 h-1 rounded-full bg-green" />
            <div className="text-xs font-extralight">Online</div>
          </div>
        </div>
      </div>
      <div className="py-6 flex flex-col gap-6">
        {sidelists.map((item, index) => (
          <div key={index} className="flex items-center gap-1">
            <img src={item.icon} alt="close" className="w-4 h-4 " />
            <div className="font-jua">{item.label}</div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default Sidebar;
