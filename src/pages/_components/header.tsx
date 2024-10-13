import { useState } from "react";
import ICONS from "../../assets/icons/icons";
import IMAGES from "../../assets/images/images";
import SideModel from "./sideModel";
import Notification from "./notification";
import Sidebar from "./sidebar";
import { useNavigate } from "react-router-dom";

function Header() {
  const navigate = useNavigate();
  const [showNotification, setShowNotification] = useState(false);
  const [showSidebar, setShowSidebar] = useState(false);
  return (
    <div className="relative">
      <div className="flex items-center justify-between bg-light_blue p-3 md:px-20">
        <div onClick={() => navigate("/")} className="flex items-center gap-2">
          <img src={IMAGES.logo} alt="logo" className="w-8 h-8" />
          <div className="font-jua  text-xl">Game9t</div>
        </div>
        <div className="md:flex items-center gap-8 hidden">
          <div
            onClick={() => navigate("/")}
            className="flex items-center gap-2"
          >
            <img src={ICONS.home} alt="home" className="w-4 h-4" />
            <div className="font-jua  text-lg">Home</div>
          </div>
          <div
            onClick={() => navigate("/lobby")}
            className="flex items-center gap-2"
          >
            <img src={ICONS.game} alt="game" className="w-4 h-4" />
            <div className="font-jua  text-lg">Games</div>
          </div>
          <div
            onClick={() => navigate("/leaderboard")}
            className="flex items-center gap-2"
          >
            <img src={ICONS.badge} alt="leaderboard" className="w-4 h-4" />
            <div className="font-jua  text-lg">Leaderboard</div>
          </div>
          <div className="flex items-center gap-2">
            <img src={ICONS.faq} alt="faq" className="w-4 h-4" />
            <div className="font-jua  text-lg">FAQ</div>
          </div>
        </div>
        <div className="flex items-center gap-4">
          <img
            src={ICONS.profile}
            alt="faq"
            onClick={() => setShowSidebar(true)}
            className="w-4 h-4"
          />
          <img
            src={ICONS.bell}
            onClick={() => setShowNotification(true)}
            alt="faq"
            className="w-4 h-4"
          />
          <img
            src={ICONS.menu}
            onClick={() => setShowSidebar(true)}
            alt="faq"
            className="w-4 h-4 md:hidden  "
          />
          <div
            onClick={() => navigate("/wallet")}
            className="items-center gap-2 border border-cream rounded-md px-1 hidden md:flex"
          >
            <img src={ICONS.wallet} alt="faq" className="w-4 h-4" />
            <div className="font-jua  text-lg text-cream">₦200</div>
          </div>
        </div>
      </div>
      <SideModel
        isOpen={showNotification}
        onClose={() => setShowNotification(false)}
      >
        <Notification />
      </SideModel>
      <SideModel isOpen={showSidebar} onClose={() => setShowSidebar(false)}>
        <Sidebar />
      </SideModel>
    </div>
  );
}

export default Header;
