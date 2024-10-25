import ICONS from "../../../assets/icons/icons";
import IMAGES from "../../../assets/images/images";
import Rating from "../../_components/rating";

function TopLeader() {
  return (
    <div className="flex flex-col md:flex-row md:items-center gap-2 md:gap-6 p-4 pb-8">
      <div className="flex items-center gap-2">
        <img src={ICONS.trophy} className="h-10 md:h-24 w-auto" alt="trophy" />
        <div className="md:hidden font-jua text-xl text-cream">Top Leaders</div>
      </div>

      <div className="w-full">
        <div className="hidden md:block font-jua text-xl text-cream mb-3">
          Top Leaders
        </div>
        <div className="">No top leader</div>
        <div className="flex gap-4 overflow-x-auto w-full">
          {[].map((item) => (
            <div
              key={item}
              className="flex items-center gap-4 bg-white bg-opacity-25 p-2 px-6 rounded-md "
            >
              <img
                src={IMAGES.user}
                className="h-10 w-10 rounded-full"
                alt="user"
              />
              <div>
                <div className=" font-jua whitespace-nowrap">Liam Carter</div>
                <div className=" text-xs">Reputations</div>
                <Rating rating={5} />
              </div>
              <div className=" font-jua text-xs text-cream mx-6 md:mx-0 md:ml-4">
                Complete
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default TopLeader;
