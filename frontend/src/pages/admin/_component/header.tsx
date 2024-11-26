import { useState } from "react";
import { useNavigate } from "react-router-dom";
import ICONS from "../../../assets/icons/icons";
import SideModel from "../../_components/sideModel";
import AdminSideModel from "./sideModel";
import Notification from "../../_components/notification";
import Sidebar from "../../_components/sidebar";
import AdminSidebar from "./sidebar";
import { useUser } from "../../../context/user";
import { imageUrl } from "../../../services/api";
import { useBranding } from "../../../context/branding";
import { IoMdMenu } from "react-icons/io";

function Header() {
  const { user } = useUser();
  const navigate = useNavigate();
  const { branding } = useBranding();
  const [showNotification, setShowNotification] = useState(false);
  const [showSidebar, setShowSidebar] = useState(false);
  const [showAdminSide, setShowAdminSide] = useState(false);
  return (
    <div className="relative">
      <div className="flex items-center justify-between bg-light_blue p-3 md:px-20">
        <div className="flex items-center gap-2">
          <IoMdMenu
            className="text-cream text-2xl md:hidden"
            onClick={() => setShowAdminSide(true)}
          />
          <div
            onClick={() => navigate("/")}
            className="flex items-center gap-2 cursor-pointer"
          >
            <img
              src={imageUrl + branding?.logo}
              alt="logo"
              className="w-8 h-8 hidden md:block"
            />
            <div className="font-jua  text-xl">{branding?.name}</div>
          </div>
        </div>
        <div className="text-xl font-bold text-cream hidden md:block">
          Admin Control Panel
        </div>
        <div className="flex items-center gap-4">
          <img
            src={ICONS.bell}
            onClick={() => setShowNotification(true)}
            alt="faq"
            className="w-4 h-4 cursor-pointer"
          />
          <img
            src={imageUrl + user?.personalInfo?.profilePictureUrl}
            alt="faq"
            onClick={() => setShowSidebar(true)}
            className="w-8 h-8 cursor-pointer"
          />
        </div>
      </div>
      <AdminSideModel
        isOpen={showAdminSide}
        onClose={() => setShowAdminSide(false)}
      >
        <AdminSidebar onClick={() => setShowAdminSide(false)} />
      </AdminSideModel>
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
