import { useNavigate } from "react-router-dom";
import ICONS from "../../../assets/icons/icons";
import IMAGES from "../../../assets/images/images";

function Adsection() {
  const navigate = useNavigate();
  return (
    <div className="flex flex-col md:flex-row bg-dark">
      <div className="flex-1 flex flex-col justify-center p-4 md:pl-20 ">
        <div className="md:w-3/4 ">
          <div className="font-jua text-3xl text-center md:text-left mb-4 md:mb-0">
            Unite and Conquer!
          </div>
          <div className="mb-6 text-center md:text-left">
            Join the ultimate online multiplayer gaming experience where friends
            can team up, compete, and Bet!
          </div>
          <button
            onClick={() => navigate("/auth/login")}
            className="p-2 px-4 bg-black text-white rounded-full hover:bg-dark_blue transition-colors"
          >
            Start Your Adventure Now!
          </button>
          <div className="flex flex-col gap-3 bg-light_blue p-4 rounded-md mt-10">
            <img src={ICONS.star_color} className="w-4 h-4" alt="star" />
            <div className="text-xs">
              "Epic experience and unforgettable friendships!"
            </div>
            <div className="flex items-center gap-4">
              <img src={IMAGES.user} className="w-6 h-6" alt="image" />
              <div className="text-xs">GameMaster99</div>
            </div>
          </div>
        </div>
      </div>
      <div className="flex-1">
        <img src={IMAGES.playinggames} className="w-full" alt="stat" />
      </div>
    </div>
  );
}

export default Adsection;
