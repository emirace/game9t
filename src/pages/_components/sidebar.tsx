import { Link } from "react-router-dom";
import ICONS from "../../assets/icons/icons";
import IMAGES from "../../assets/images/images";

const sidelists = [
  { icon: ICONS.dashboard, label: "Dashboard", path: "/" },
  { icon: ICONS.box, label: "Profile", path: "/" },
  { icon: ICONS.wallet, label: "Wallet", path: "/wallet" },
  { icon: ICONS.flag, label: "Challenge", path: "/" },
  { icon: ICONS.settings, label: "Setting", path: "/" },
  { icon: ICONS.support, label: "Support", path: "/" },
  { icon: ICONS.logout, label: "Logout", path: "/" },
];

const quickLinks = [
  "Home",
  "Games",
  "Leaderboard",
  "Wallet",
  "Challenges",
  "Support",
  "FAQ",
];

const legalLinks = [
  "Terms",
  "Disclaimer",
  "Privacy Policy",
  "Terms & Conditions",
  "Responsible Gaming",
];

function Sidebar() {
  return (
    <div className="overflow-y-auto h-screen ">
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
          <Link to={item.path} key={index} className="flex items-center gap-1">
            <img src={item.icon} alt="close" className="w-4 h-4 " />
            <div className="font-jua">{item.label}</div>
          </Link>
        ))}
      </div>

      {/* Quick Links */}
      <div className="md:hidden mb-6">
        <h4 className=" text-lg font-jua mb-2">Quick Links</h4>
        <ul className="space-y-2">
          {quickLinks.map((link, index) => (
            <li key={index}>{link}</li>
          ))}
        </ul>
      </div>

      {/* Legal */}
      <div className="md:hidden mb-6">
        <h4 className="font-jua text-lg mb-2">Legal</h4>
        <ul className="space-y-2">
          {legalLinks.map((link, index) => (
            <li key={index}>{link}</li>
          ))}
        </ul>
      </div>
    </div>
  );
}

export default Sidebar;
