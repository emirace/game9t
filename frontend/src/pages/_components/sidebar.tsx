import { Link } from "react-router-dom";
import ICONS from "../../assets/icons/icons";
import { useUser } from "../../context/user";
import { imageUrl } from "../../services/api";

const sidelists = [
  { icon: ICONS.dashboard, label: "Dashboard", path: "/" },
  { icon: ICONS.box, label: "Profile", path: "/profile" },
  { icon: ICONS.wallet, label: "Wallet", path: "/wallet" },
  { icon: ICONS.flag, label: "Challenge", path: "/" },
  { icon: ICONS.settings, label: "Settings", path: "/settings" },
  { icon: ICONS.support, label: "Support", path: "/support" },
];

interface Props {
  onClose: () => void;
}
const Sidebar: React.FC<Props> = ({ onClose }) => {
  const { user, logout } = useUser();
  return (
    <div className="overflow-y-auto h-screen ">
      <div className="flex items-center gap-4 bg-black px-6 p-4 absolute top-0 left-0 right-0 ">
        <div>
          <img
            src={imageUrl + user?.image}
            className="h-10 w-10 rounded-full bg-white"
            alt="user"
          />
        </div>
        <div className="">
          <div className="font-jua">{user?.username}</div>
          <div className="flex items-center gap-2">
            <div className="w-1 h-1 rounded-full bg-green" />
            <div className="text-xs font-extralight">Online</div>
          </div>
        </div>
      </div>
      <div className="py-6 flex flex-col gap-6 pt-20">
        {sidelists.map((item, index) => (
          <Link
            to={item.path}
            onClick={onClose}
            key={index}
            className="flex items-center gap-1"
          >
            <img src={item.icon} alt="close" className="w-4 h-4 " />
            <div className="font-jua">{item.label}</div>
          </Link>
        ))}

        <div
          onClick={() => {
            logout();
            onClose();
          }}
          className="flex items-center gap-1"
        >
          <img src={ICONS.logout} alt="close" className="w-4 h-4 " />
          <div className="font-jua">Logout</div>
        </div>
      </div>
    </div>
  );
};

export default Sidebar;
