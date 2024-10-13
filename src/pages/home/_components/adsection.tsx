import ICONS from "../../../assets/icons/icons";
import IMAGES from "../../../assets/images/images";

function Adsection() {
  return (
    <div className="flex bg-dark">
      <div className="flex-1 flex flex-col justify-center pl-20 ">
        <div className="w-3/4 ">
          <div className="font-jua text-3xl">Unite and Conquer!</div>
          <div className="mb-6">
            Join the ultimate online multiplayer gaming experience where friends
            can team up, compete, and Bet!
          </div>
          <button className="p-1 px-2 bg-black text-white rounded-full hover:bg-dark_blue transition-colors">
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
