import { Link } from "react-router-dom";
import ICONS from "../../assets/icons/icons";
import AvailableGame from "./_components/availableGame";
import Sidebar from "./_components/sidebar";
import SaerchPlayer from "./_components/saerchPlayer";
import { useUser } from "../../context/user";
import { useState } from "react";
import SideModel from "../_components/sideModel";
import IMAGES from "../../assets/images/images";
import { imageUrl } from "../../services/api";

function Lobby() {
  const { user, logout } = useUser();
  const [showSideBar, setShowSideBar] = useState(false);
  return (
    <div className="px-4 md:px-20 py-10">
      <nav className="mb-6 flex items-center gap-2">
        <img src={ICONS.home} alt="home" className="w-4 h-4" />
        <Link to="/" className="hover:text-cream hover:underline">
          Home
        </Link>
        / <span className="text-white">Lobby</span>
      </nav>
      <h1 className="text-4xl font-bold mb-8 text-cream">Lobby</h1>
      <div className="flex gap-16">
        <div className="flex-[2]">
          <div className="bg-cream p-4 rounded-md text-black flex flex-col md:flex-row items-center justify-between ">
            <div className="">
              <div className=" font-jua text-xl mb-4">Welcome,</div>
              <div className=" flex items-center justify-between">
                <div className="flex items-center space-x-4 mb-4">
                  <img
                    src={
                      imageUrl + user?.personalInfo?.profilePictureUrl ||
                      IMAGES.user2
                    }
                    alt="Profile"
                    className="w-12 h-12 rounded-full bg-white"
                  />
                  <div>
                    <p className="font-jua capitalize">{user?.username}</p>
                    <p className="text-xs font-light">
                      <span className="text-green">●</span> online
                    </p>
                  </div>
                </div>
              </div>
            </div>
            <button
              onClick={logout}
              className="px-8 py-3 min-w-48 bg-black text-white font-semibold rounded-full hover:bg-dark_blue transition-colors"
            >
              Logout
            </button>
          </div>

          <div className="flex justify-center md:hidden  mb-4">
            <button
              onClick={() => setShowSideBar(true)}
              className="bg-black font-jua rounded-full text-white font-bold py-2 px-10  mt-4"
            >
              Place Bet
            </button>
          </div>
          <AvailableGame />
          <SaerchPlayer />
        </div>

        <SideModel isOpen={showSideBar} onClose={() => setShowSideBar(false)}>
          <div className="absolute left-0 top-0 overflow-y-auto h-screen">
            <Sidebar />
          </div>
        </SideModel>
        <div className="hidden md:block flex-1">
          <Sidebar />
        </div>
      </div>
    </div>
  );
}

export default Lobby;
