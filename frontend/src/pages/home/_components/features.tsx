import ICONS from "../../../assets/icons/icons";

const features = [
  {
    image: ICONS.bolt,
    title: "Multiplayer Fun",
    description:
      "Connect with friends and challenge players worldwide in thrilling multiplayer matches.",
    action: "Join the Action",
  },
  {
    image: ICONS.adventure,
    title: "Solo Adventures",
    description:
      "Dive into immersive single-player Games and compete with cpu to test your skills and strategies.",
    action: "Start Your Journey",
  },
  {
    image: ICONS.lock,
    title: "Bet and Compete",
    description:
      "Place bets to your matches to compete your opponent and earn real excitement rewards.",
    action: "Learn About Betting",
  },
  {
    image: ICONS.moon,
    title: "Leaderboard",
    description:
      "Experience a sleek, modern dark UI that enhances your gaming experience.",
    action: "Discover the Design",
  },
];

function Features() {
  return (
    <div className="p-4 py-8 md:py-20 md:p-20">
      <div className="font-jua text-3xl text-center mb-10">
        Explore Our Exciting Game Features
      </div>

      <div className="grid grid-cols-1 md:grid-cols-4 gap-4 flex-[3]">
        {features.map((item, index) => (
          <div
            key={index}
            className="flex flex-col gap-2 bg-light_blue p-4 rounded-md"
          >
            <img src={item.image} className="h-4 w-4" alt="star" />
            <div className="text-xl font-jua">{item.title}</div>
            <div className="text-sm ">{item.description}</div>
            <div className=" font-jua text-cream mt-4">{item.action}</div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default Features;
