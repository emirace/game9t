import ICONS from "../../assets/icons/icons";

function Social() {
  return (
    <div>
      <div className="text-lg mb-2">Add Biography</div>
      <div className="mt-6 flex flex-col gap-4 w-1/2">
        <div className="flex items-center gap-3">
          <img src={ICONS.x} alt="social" className="h-6" />
          <input
            type="text"
            className="w-full px-4 py-1  rounded-md bg-black  focus:outline-none "
          />
        </div>
        <div className="flex items-center gap-3">
          <img src={ICONS.instagram} alt="social" className="h-6" />
          <input
            type="text"
            className="w-full px-4 py-1  rounded-md bg-black  focus:outline-none "
          />
        </div>
        <div className="flex items-center gap-3">
          <img src={ICONS.facebook} alt="social" className="h-6" />
          <input
            type="text"
            className="w-full px-4 py-1  rounded-md bg-black  focus:outline-none "
          />
        </div>
        <div className="flex items-center gap-3">
          <img src={ICONS.bot} alt="social" className="h-6" />
          <input
            type="text"
            className="w-full px-4 py-1  rounded-md bg-black  focus:outline-none "
          />
        </div>
        <div className="font-medium p-6 py-3">+Add More</div>
        <div>
          <button className="bg-white rounded-full text-xs py-1 px-2 text-black">
            Update Changes
          </button>
        </div>
      </div>
    </div>
  );
}

export default Social;
