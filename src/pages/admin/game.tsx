import ICONS from "../../assets/icons/icons";
import IMAGES from "../../assets/images/images";

function GameManage() {
  return (
    <div>
      <h1 className="font-jua text-xl">Game Management</h1>
      <div className="text-sm mb-6">Manage Your Games</div>
      <div className="flex items-center justify-between mb-4">
        <div className="font-jua text-lg">All Games (10)</div>
        <div className="flex items-center gap-3">
          <img src={ICONS.filter} className="w-4" />
          <input
            placeholder="Search"
            className="bg-black w-full p-2 rounded-md"
          />
          <button className="rounded-md bg-white text-black whitespace-nowrap p-1 px-2">
            Add User
          </button>
        </div>
      </div>
      <div className="grid grid-cols-3 gap-4">
        {[1, 2, 3, 4, 5, 6, 7, 8, 9, 10].map((_, index) => (
          <div key={index} className=" flex  ">
            <div className="flex-1">
              <img
                src={IMAGES.connectfour_game}
                className="w-full"
                alt="game"
              />
            </div>
            <div className="flex-1 bg-light_blue p-4 text-sm rounded-r-lg">
              <div className="font-jua text-base">Connect Four</div>
              <div className="mb-2">Puzzle</div>
              <div className="mb-4">45,000 plays</div>
              <div className="flex items-center justify-between">
                <button className="bg-green text-xs p-1 px-4 rounded-full">
                  Active
                </button>
                <button className="text-sm">Edit</button>
              </div>
            </div>
          </div>
        ))}
      </div>

      <div className="flex justify-between items-center mt-6 mb-16 ">
        <span>Showing: 12 / 30</span>
        <div>
          <button className="hover:underline mr-4">PREVIOUS /</button>
          <button className="hover:underline">NEXT</button>
        </div>
      </div>
    </div>
  );
}

export default GameManage;
