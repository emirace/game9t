function Gameplay() {
  return (
    <div>
      <div className="text-lg font-medium mb-4">Gameplay Settings</div>
      <div className=" flex items-start justify-between mb-4">
        <div>
          <div className="text-sm">Default Game Preferences</div>
          <div className="text-xs font-light">
            Choose your preferred games for faster matchmaking.
          </div>
        </div>
        <button className="bg-white rounded-full text-xs py-1 px-2 text-black">
          Edit
        </button>
      </div>

      <div className=" flex items-start justify-between mb-4">
        <div>
          <div className="text-sm">Language</div>
          <div className="text-xs font-light">
            Select your preferred language for in-game communication.
          </div>
        </div>
        <button className="bg-white rounded-full text-xs py-1 px-2 text-black">
          Edit
        </button>
      </div>
      <div className=" flex items-start justify-between mb-4">
        <div>
          <div className="text-sm">Betting Preferences</div>
          <div className="text-xs font-light">
            Set default bet values for quicker game setup.
          </div>
        </div>
        <button className="bg-white rounded-full text-xs py-1 px-2 text-black">
          Edit
        </button>
      </div>
    </div>
  );
}

export default Gameplay;
