import ICONS from "../../../assets/icons/icons";
import IMAGES from "../../../assets/images/images";

const statistics = [
  {
    image: ICONS.users,
    text: "Over 15 million players worldwide.",
    value: "5.5 million",
  },
  {
    image: ICONS.time,
    text: "Experience over 2 billion hours of gameplay.",
    value: "24 billion",
  },
  {
    image: ICONS.star_cream,
    text: "Join 75% of players who prefer multiplayer.",
    value: "99%",
  },
  {
    image: ICONS.engage,
    text: "Engage with 300,000 daily challenges",
    value: "78,513",
  },
];

function Statistic() {
  return (
    <div
      className="py-20 bg-contain bg-no-repeat bg-left px-4 md:px-20 bg-"
      style={{ backgroundImage: `url(${IMAGES.statistic})` }}
    >
      <div className="flex flex-col md:flex-row gap-4 md:items-center mb-8">
        <div className="md:flex-1">
          <div className="font-jua text-xl mb-2 text-center md:text-left">
            Discover the thrilling statistics that make our gaming community
            thrive. Join the action today!
          </div>
          <div className="text-center md:text-left">
            Discover the thrilling statistics that make our gaming community
            thrive. Join the action today!
          </div>
        </div>
        <div className="flex justify-center md:hidden">
          <button
            //   onClick={onButtonClick}
            className="px-8 py-3 min-w-48 bg-black text-white font-semibold rounded-full hover:bg-dark_blue transition-colors"
          >
            Join Now
          </button>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4 md:flex-[3]">
          {statistics.map((item, index) => (
            <div
              key={index}
              className="flex flex-col justify-center items-center gap-4 bg-light_blue p-4 rounded-md"
            >
              <img src={item.image} className="h-4 w-4" alt="star" />
              <div className="text-xs text-center">{item.text}</div>
              <div className="text-xl font-jua ">{item.value}</div>
            </div>
          ))}
        </div>
      </div>

      <button
        //   onClick={onButtonClick}
        className=" hidden md:block px-8 py-3 min-w-48 bg-black text-white font-semibold rounded-full hover:bg-dark_blue transition-colors"
      >
        Join Now
      </button>
    </div>
  );
}

export default Statistic;
