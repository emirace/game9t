import { Link } from "react-router-dom";

const quickLinks = [
  { name: "Home", path: "/" },
  { name: "Games", path: "/lobby" },
  { name: "Leaderboard", path: "/leaderboard" },
  { name: "Wallet", path: "/wallet" },
  { name: "Challenges", path: "/lobby" },
  { name: "Support", path: "/support" },
  { name: "FAQ", path: "/support/faq" },
];

const legalLinks = [
  { path: "terms", name: "Terms & Conditions" },
  { path: "/disclaimer", name: "Disclaimer" },
  { path: "privacy", name: "Privacy Policy" },
  { path: "responsible", name: "Responsible Gaming" },
];
function Gamesbar({ onClick }: { onClick?: () => void }) {
  return (
    <div className="overflow-y-auto h-screen ">
      {/* Quick Links */}
      <div className="md:hidden mb-6 z-30">
        <h4 className=" text-lg font-jua mb-2">Quick Links</h4>
        <ul className="space-y-2">
          {quickLinks.map((link, index) => (
            <li>
              <Link
                onClick={() => (onClick ? onClick() : null)}
                to={link.path}
                key={index}
              >
                {link.name}
              </Link>
            </li>
          ))}
        </ul>
      </div>

      {/* Legal */}
      <div className="md:hidden mb-6">
        <h4 className="font-jua text-lg mb-2">Legal</h4>
        <ul className="space-y-2">
          {legalLinks.map((link, index) => (
            <li key={index}>
              <Link to={link.path}>{link.name}</Link>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}

export default Gamesbar;
