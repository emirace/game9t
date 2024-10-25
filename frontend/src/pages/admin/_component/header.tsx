import { useState } from "react";
import { useNavigate } from "react-router-dom";
import ICONS from "../../../assets/icons/icons";
import IMAGES from "../../../assets/images/images";
import SideModel from "../../_components/sideModel";
import Notification from "../../_components/notification";
import Sidebar from "../../_components/sidebar";
import { useUser } from "../../../context/user";
import { imageUrl } from "../../../services/api";

function Header() {
  const { user } = useUser();
  const navigate = useNavigate();
  const [showNotification, setShowNotification] = useState(false);
  const [showSidebar, setShowSidebar] = useState(false);
  return (
    <div className="relative">
      <div className="flex items-center justify-between bg-light_blue p-3 md:px-20">
        <div
          onClick={() => navigate("/")}
          className="flex items-center gap-2 cursor-pointer"
        >
          <img src={IMAGES.logo} alt="logo" className="w-8 h-8" />
          <div className="font-jua  text-xl">Game9t</div>
        </div>
        <div className="text-xl font-bold text-cream">Admin Control Panel</div>
        <div className="flex items-center gap-4">
          <img
            src={ICONS.bell}
            onClick={() => setShowNotification(true)}
            alt="faq"
            className="w-4 h-4 cursor-pointer"
          />
          <img
            src={imageUrl + user?.image}
            alt="faq"
            onClick={() => setShowSidebar(true)}
            className="w-8 h-8 cursor-pointer"
          />
        </div>
      </div>
      <SideModel
        isOpen={showNotification}
        onClose={() => setShowNotification(false)}
      >
        <Notification />
      </SideModel>
      <SideModel isOpen={showSidebar} onClose={() => setShowSidebar(false)}>
        <Sidebar onClose={() => setShowSidebar(false)} />
      </SideModel>
    </div>
  );
}

export default Header;
