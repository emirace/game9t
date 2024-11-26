import { Link } from "react-router-dom";
import ICONS from "../assets/icons/icons";

function Disclaimer() {
  return (
    <div className="px-4 md:px-20 py-10">
      <nav className="mb-6 flex items-center gap-2">
        <img src={ICONS.home} alt="home" className="w-4 h-4" />
        <Link to="/" className="hover:text-cream hover:underline">
          Home
        </Link>
        /<span className="">Disclaimer</span>
      </nav>
      <h1 className="text-4xl font-bold mb-8 text-cream">Disclaimer</h1>

      <div className="font-jua text-xl mt-2">General Information</div>
      <p>
        The content, games, and services provided on Game9t are for
        entertainment purposes only. By accessing the platform, you acknowledge
        and agree that your participation is voluntary and at your own risk.
      </p>
      <div className="font-jua text-xl mt-2">Accuracy of Information</div>
      <p>
        Game9t strives to ensure that all information on the platform is
        accurate and up-to-date. However, we make no representations or
        warranties of any kind, express or implied, about the completeness,
        accuracy, reliability, or suitability of the content and services
        offered. Any reliance you place on such information is strictly at your
        own risk.
      </p>
      <div className="font-jua text-xl mt-2">Financial Risk</div>
      <p>
        Engaging in betting or gambling on Game9t involves financial risk. Users
        are responsible for understanding the rules of each game and for any
        monetary losses incurred during gameplay. Game9t is not responsible for
        any loss of funds or other damages arising from your participation in
        games or betting activities.
      </p>
      <div className="font-jua text-xl mt-2">Third-Party Services</div>
      <p>
        Game9t may integrate payment gateways, live chats, and other third-party
        services for your convenience. We are not responsible for the
        performance, reliability, or security of these third-party providers.
        Any issues with these services must be resolved directly with the
        respective provider.
      </p>
      <div className="font-jua text-xl mt-2">Technical Issues</div>
      <p>
        Game9t does not guarantee uninterrupted access to its platform. While we
        strive to maintain consistent availability, technical issues,
        maintenance, or external factors may cause temporary disruptions. Game9t
        is not liable for any loss of funds or opportunities due to technical
        interruptions.
      </p>
      <div className="font-jua text-xl mt-2">Legality</div>
      <p>
        The use of Game9t’s platform must comply with the laws and regulations
        of your jurisdiction. Users are responsible for ensuring that their
        participation in online betting or gaming is legal. Game9t disclaims any
        liability for illegal usage of its platform.
      </p>
      <div className="font-jua text-xl mt-2">Responsible Gaming</div>
      <p>
        Game9t promotes responsible gaming and encourages users to play within
        their limits. The platform is not a financial investment service, and
        winnings are not guaranteed. If you feel you may have a gambling
        problem, seek help from professional organizations or use the
        self-exclusion options provided.
      </p>
      <div className="font-jua text-xl mt-2">No Guarantees</div>
      <p>
        Game9t does not guarantee success, winnings, or any specific outcomes
        from gameplay. All games are based on skill, chance, or a combination of
        both, and results are final.
      </p>
      <div className="font-jua text-xl mt-2">Liability</div>
      <p>
        Game9t, its owners, employees, and affiliates shall not be held liable
        for any direct, indirect, incidental, or consequential damages arising
        out of the use or inability to use the platform, including but not
        limited to loss of funds, data, or reputation.
      </p>
      <div className="font-jua text-xl mt-2">Changes to Disclaimer</div>
      <p>
        Game9t reserves the right to modify this Disclaimer at any time without
        prior notice. Continued use of the platform constitutes acceptance of
        any changes.
      </p>
      <div className="font-jua text-xl mt-2">Contact</div>
      <p>
        For inquiries related to this Disclaimer or the platform, please contact
        us at: Email: support@game9t.com
      </p>
    </div>
  );
}

export default Disclaimer;
