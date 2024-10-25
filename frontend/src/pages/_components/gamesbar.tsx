import { Link } from "react-router-dom";
import ICONS from "../../assets/icons/icons";

const sidelists = [
  { icon: ICONS.games, label: "Free Games", path: "/" },
  { icon: ICONS.games, label: "Paid Games", path: "/" },
];
function Gamesbar() {
  return (
    <div className="overflow-y-auto h-screen ">
      <div className="py-6 flex flex-col gap-6">
        {sidelists.map((item, index) => (
          <Link to={item.path} key={index} className="flex items-center gap-1">
            <img src={item.icon} alt="close" className="w-4 h-4 " />
            <div className="font-jua">{item.label}</div>
          </Link>
        ))}
      </div>
    </div>
  );
}

export default Gamesbar;
