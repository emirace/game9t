import { Link } from "react-router-dom";
import ICONS from "../../assets/icons/icons";

function Leaderboard() {
  return (
    <div className="px-20 py-10">
      <nav className="mb-6 flex items-center gap-2">
        <img src={ICONS.home} alt="home" className="w-4 h-4" />
        <Link to="/" className="hover:text-cream hover:underline">
          Home
        </Link>
        / <span className="text-white">Leaderboard</span>
      </nav>
      <h1 className="text-4xl font-bold mb-8 text-cream">
        Leaderboard & Rankings
      </h1>
    </div>
  );
}

export default Leaderboard;
