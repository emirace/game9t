import { Link } from "react-router-dom";
import ICONS from "../../../assets/icons/icons";
import Section from "./_component/section";

function Faq() {
  return (
    <div className="px-4 md:px-20 py-10">
      <nav className="mb-6 flex items-center gap-2">
        <img src={ICONS.home} alt="home" className="w-4 h-4" />
        <Link to="/" className="hover:text-cream hover:underline">
          Home
        </Link>
        /
        <Link to="/support" className="hover:text-cream hover:underline">
          Support & help center
        </Link>
        / <span className="text-white">FAQ</span>
      </nav>
      <h1 className="text-4xl font-bold mb-8 text-cream">FAQ</h1>
      <div className="w-full max-w-6xl mx-auto ">
        <div className="font-jua text-3xl text-center  mb-5">
          Frequently Asked Questions
        </div>
        <Section />
        <Section />
        <Section />
      </div>
    </div>
  );
}

export default Faq;
