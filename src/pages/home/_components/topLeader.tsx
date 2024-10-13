import ICONS from "../../../assets/icons/icons";
import IMAGES from "../../../assets/images/images";

function TopLeader() {
  return (
    <div className="flex items-center gap-6 p-4 pb-8">
      <img src={ICONS.trophy} className="h-24 w-auto" alt="trophy" />
      <div className="">
        <div className=" font-jua text-xl text-cream mb-3">Top Leaders</div>
        <div className="flex gap-4 overflow-x-auto w-full">
          {[1, 2, 3, 4].map((item) => (
            <div
              key={item}
              className="flex items-center gap-4 bg-white bg-opacity-25 p-2 px-6 rounded-md"
            >
              <img
                src={IMAGES.user}
                className="h-10 w-10 rounded-full"
                alt="user"
              />
              <div>
                <div className=" font-jua whitespace-nowrap">Liam Carter</div>
                <div className=" text-xs">Reputations</div>
                <img src={ICONS.star_color} className="h-4 w-4" alt="star" />
              </div>
              <div className=" font-jua text-xs text-cream ml-4">Completed</div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default TopLeader;
