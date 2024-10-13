import { useState } from "react";
import ICONS from "../../../assets/icons/icons";
import IMAGES from "../../../assets/images/images";
import Model from "../../_components/model";

const amounts = ["200", "500", "1000", "2000", "5000", "10000"];

function Sidebar() {
  const [selectedAmount, setSelectedAmount] = useState("200");
  const [showSearchPlayer, setShowSearchPlayer] = useState(false);
  return (
    <aside className="bg-medium_blue w-full md:w-96 rounded-md ">
      {/* Profile Section */}
      <div className="flex items-center gap-4 p-4">
        <img src={ICONS.profile_outline} alt="profile" className="w-5 h-5" />
        <h2 className="font-jua text-2xl ">My Profile</h2>
      </div>
      <div className="bg-light_blue p-4  ">
        <div className="flex items-center space-x-4 mb-4">
          <img
            src={IMAGES.user}
            alt="Profile"
            className="w-12 h-12 rounded-full"
          />
          <div>
            <p className="font-jua">MrYogesh</p>
            <p className="text-xs font-light">
              <span className="text-green">●</span> online
            </p>
          </div>
        </div>
        <p className="mb-2 font-jua">Free Game Access</p>
        <div className="flex items-center bg-white bg-opacity-20 p-1 px-2 rounded-lg text-xs font-jua mb-4">
          <div className="flex-1 text-center">Day 1</div>
          <div className="flex-1 text-center"> Day 2</div>
          <div className="flex-1 text-center"> Day 3</div>
        </div>
        <p className="text-xs">
          (Once you reach the limit, you can't play free games)
        </p>
        <div className="flex items-center gap-4 mt-2 ">
          <button className="border flex items-center gap-2 font-jua px-1 text-lg rounded-md">
            <img src={ICONS.wallet} alt="wallet" className="w-4 h-4" />
            ₦200
          </button>
          <button className="font-jua">Add Funds</button>
          <button className="font-jua">View Profile</button>
        </div>
      </div>

      {/* Available Players Section */}

      <div className="flex items-center gap-4 p-4">
        <img src={ICONS.users2} alt="profile" className="w-5 h-5" />
        <h2 className="font-jua text-2xl ">Available Challeges</h2>
      </div>
      <div className="bg-light_blue p-4 ">
        <ul>
          {[
            "Tic Tac Toe",
            "Rock Paper Scissors",
            "Tic Tac Toe",
            "Tic Tac Toe",
            "Tic Tac Toe",
          ].map((player, index) => (
            <li
              key={index}
              className="flex justify-between items-center mb-4 text-white"
            >
              <div className="flex items-center gap-4">
                <img
                  src={IMAGES.user}
                  alt="Profile"
                  className="w-12 h-12 rounded-full"
                />
                <div>
                  <div className="font-jua"> {player}</div>
                  <div className="text-xs">
                    Bet Amount <span className="text-green ml-4">#150</span>
                  </div>
                </div>
              </div>
              <button className="bg-black text-xs font-jua py-1 px-2 rounded-md hover:bg-gray-600">
                Accept
              </button>
            </li>
          ))}
        </ul>
        <button
          onClick={() => setShowSearchPlayer(true)}
          className="bg-black rounded-full text-white font-bold py-2 px-10  mt-4"
        >
          Search Players
        </button>
      </div>
      <div className="flex items-center gap-4 p-4">
        <img src={ICONS.profile_outline} alt="profile" className="w-5 h-5" />
        <h2 className="font-jua text-2xl ">Chat</h2>
      </div>
      <div className="p-4 bg-light_blue">
        <div className="bg-dark p-4 rounded-md">
          {[1, 2].map(() => (
            <div className="flex items-center gap-4 mb-4">
              <div>
                <p className="font-jua">MrYogesh</p>
                <p className="text-xs font-light">
                  <span className="text-green">●</span> online
                </p>
              </div>
              <div>: Ready to play ?</div>
            </div>
          ))}
          <input
            placeholder="Type message here..."
            className="bg-black py-1 p-4 rounded-full w-full mt-12"
          />
        </div>
      </div>
    </aside>
  );
}

export default Sidebar;
