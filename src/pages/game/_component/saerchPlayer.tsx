import { useState } from "react";
import ICONS from "../../../assets/icons/icons";
import IMAGES from "../../../assets/images/images";
import Model from "../../_components/model";

function SaerchPlayer() {
  const [showConfirm, setShowConfirm] = useState(false);
  return (
    <div className="px-20">
      <h2 className="font-jua text-2xl mb-6 text-center ">Search Players</h2>

      <div className="bg-black p-2 flex gap-2 items-center rounded-md mb-6">
        <img src={ICONS.search} alt="search" className="w-4 h-4" />
        <input placeholder="Search players..." className="bg-black" />
      </div>
      <div className="grid grid-cols-4 gap-4">
        {["player", "player", "player", "player", "player", "player", 2, 4].map(
          () => (
            <div
              onClick={() => setShowConfirm(true)}
              className="flex flex-col gap-2 justify-center items-center p-4 bg-dark rounded-lg"
            >
              <img
                src={IMAGES.user2}
                alt="Profile"
                className="w-12 h-12 rounded-full"
              />
              <div className="font-jua">Mr Yogesh </div>
              <div className="text-xs">
                <span className="text-green">●</span> online
              </div>
              <button className="bg-black text-xs font-jua py-1 px-2 mt-2 rounded-md hover:bg-gray-600">
                Compete
              </button>
            </div>
          )
        )}
      </div>
      <Model isOpen={showConfirm} onClose={() => setShowConfirm(false)}>
        <div className="flex flex-col gap-4 justify-center items-center h-full">
          <div className="text-lg font-jua">Ready To Challenge MrYogesh ?</div>
          <div className="flex gap-8">
            <button className="bg-black text-xs font-jua py-2 px-8 mt-2 rounded-full hover:bg-gray-600">
              Yes
            </button>
            <button className="bg-black text-xs font-jua py-2 px-8 mt-2 rounded-full hover:bg-gray-600">
              No
            </button>
          </div>
        </div>
      </Model>
    </div>
  );
}

export default SaerchPlayer;
