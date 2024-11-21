import { Link } from "react-router-dom";
import ICONS from "../../assets/icons/icons";

const features = [
  {
    image: ICONS.call,
    title: "Contact Us",
    description:
      "Permanently delete your account. Warning: All data will be lost.",
  },
  {
    image: ICONS.faq,
    title: "FAQ",
    description:
      "Find answers to frequently asked questions to help you navigate and enjoy our platform with ease.",
  },
  {
    image: ICONS.article,
    title: "Help Articles",
    description:
      "Find answers to frequently asked questions to help you navigate and enjoy our platform with ease.",
  },
  {
    image: ICONS.support2,
    title: "Support Ticket",
    description:
      "Find answers to frequently asked questions to help you navigate and enjoy our platform with ease.",
  },
  {
    image: ICONS.users,
    title: "Community Forum",
    description:
      "Find answers to frequently asked questions to help you navigate and enjoy our platform with ease.",
  },
  {
    image: ICONS.chat,
    title: "Live Chat",
    description:
      "Find answers to frequently asked questions to help you navigate and enjoy our platform with ease.",
  },
];
function Support() {
  return (
    <div className="px-4 md:px-20 py-10">
      <nav className="mb-6 flex items-center gap-2">
        <img src={ICONS.home} alt="home" className="w-4 h-4" />
        <Link to="/" className="hover:text-cream hover:underline">
          Home
        </Link>
        / <span className="text-white">support & help center</span>
      </nav>
      <h1 className="text-4xl font-bold mb-8 text-cream">
        Support & Help Center
      </h1>

      <div className="flex flex-col items-center gap-4 mb-12">
        <span className="font-jua text-3xl text-center">
          We’re Here To Help
        </span>

        <div className="bg-black p-2 flex gap-2 items-center rounded-md  w-full max-w-2xl">
          <img src={ICONS.search} alt="search" className="w-4 h-4" />
          <input placeholder="Search..." className="bg-black w-full" />
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 max-w-4xl mx-auto">
        {features.map((item, index) => (
          <div
            key={index}
            className="flex flex-col gap-2 bg-light_blue p-4 rounded-md"
          >
            <img src={item.image} className="w-4" alt="star" />
            <div className="text-xl font-jua">{item.title}</div>
            <div className="text-sm ">{item.description}</div>
          </div>
        ))}
      </div>
      <div className="text-center my-16">
        <div className="font-jua text-xl text-center mb-2">
          Live Support Hours
        </div>
        <div>
          <span className="font-[600]">Monday - Friday</span> : 9:00 AM - 8:00
          PM
        </div>
        <div>
          <span className="font-[600]">Saturday - Sunday</span> : 10:00 AM -
          6:00 PM
        </div>
      </div>
    </div>
  );
}

export default Support;
