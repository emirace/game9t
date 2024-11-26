import { Link } from "react-router-dom";
import ICONS from "../assets/icons/icons";

function Terms() {
  return (
    <div className="px-4 md:px-20 py-10">
      <nav className="mb-6 flex items-center gap-2">
        <img src={ICONS.home} alt="home" className="w-4 h-4" />
        <Link to="/" className="hover:text-cream hover:underline">
          Home
        </Link>
        /<span className="">Term & Condition</span>
      </nav>
      <h1 className="text-4xl font-bold mb-8 text-cream">Terms & Condition</h1>
      <div className="font-jua text-xl mt-2">1. Acceptance of Terms</div>
      <p>
        By accessing or using Game9t (“the Website”), you agree to abide by
        these Terms and Conditions, our Privacy Policy, and all applicable laws.
        If you do not agree, you must not use the Website.
      </p>
      <div className="font-jua text-xl mt-2">2. Eligibility</div>
      <p>
        Users must be at least 18 years old or the legal age of majority in
        their jurisdiction to register or use the platform. By registering, you
        confirm that you are legally allowed to participate in online betting or
        gaming activities in your jurisdiction.
      </p>
      <div className="font-jua text-xl mt-2">3. User Account</div>
      <p>
        Users must provide accurate and complete information during
        registration. Any false information may result in account suspension.
        Users are responsible for maintaining the confidentiality of their login
        credentials. Game9t is not liable for unauthorized account access.
        Creating multiple accounts is prohibited and may lead to account
        suspension or termination.
      </p>
      <div className="font-jua text-xl mt-2">4. Games and Betting</div>
      <p>
        Game9t offers multiplayer and single-player games, some of which involve
        real-money betting. All bets are final once placed. Game9t will not be
        responsible for errors or omissions in bets placed by users. Users are
        advised to play responsibly and within their financial limits. Game9t
        does not provide any guarantees on winnings.
      </p>
      <div className="font-jua text-xl mt-2">5. Wallet and Payments</div>
      <p>
        Funds deposited in your wallet can be used for gameplay and betting.
        Unused funds can be withdrawn following verification. Withdrawals are
        subject to account verification and may incur transaction fees. Payments
        are processed through secure third-party gateways. Game9t is not
        responsible for issues arising from third-party services.
      </p>
      <div className="font-jua text-xl mt-2">6. Fees and Commissions</div>
      <p>
        Game9t deducts a 5% service fee from each player's stake for real-money
        games. This fee is non-refundable.
      </p>
      <div className="font-jua text-xl mt-2">7. Prohibited Activities</div>
      <p>
        Engaging in fraudulent activities such as hacking, exploiting game bugs,
        or using unauthorized tools is strictly prohibited. Harassment, abusive
        behavior, or inappropriate content in any form will not be tolerated.
        Users must not use the Website for any unlawful purposes.
      </p>
      <div className="font-jua text-xl mt-2">8. Intellectual Property</div>
      <p>
        All content on Game9t, including games, graphics, and branding, is the
        property of Game9t and is protected by intellectual property laws. Users
        are not permitted to copy, modify, or distribute any content from the
        Website without prior written consent.
      </p>
      <div className="font-jua text-xl mt-2">9. Limitation of Liability</div>
      <p>
        Game9t provides its platform "as is" without any guarantees or
        warranties. Game9t is not responsible for any losses incurred during
        gameplay or betting, including technical errors, interruptions, or
        unauthorized access.
      </p>
      <div className="font-jua text-xl mt-2">
        10. Suspension and Termination
      </div>
      <p>
        Game9t reserves the right to suspend or terminate accounts that violate
        these Terms and Conditions. Any funds remaining in the suspended or
        terminated accounts will be withheld pending investigation.
      </p>
      <div className="font-jua text-xl mt-2">11. Privacy Policy</div>
      Game9t collects and processes personal data in accordance with its Privacy
      Policy. By using the platform, you consent to the collection and use of
      your data as outlined in the Privacy Policy.
      <div className="font-jua text-xl mt-2">12. Changes to Terms</div>
      <p>
        Game9t reserves the right to update these Terms and Conditions at any
        time. Users will be notified of significant changes via email or website
        notification.
      </p>
      <div className="font-jua text-xl mt-2">13. Contact Us</div>
      <p>
        For inquiries, complaints, or support, please contact us at: Email:
        support@game9t.com
      </p>
      <div className="font-jua text-xl mt-2">14. Responsible Gaming</div>
      <p>
        Game9t promotes responsible gaming practices. If you feel you are at
        risk of addiction, please seek help from professionals or use the
        self-exclusion tools available on our platform.
      </p>
    </div>
  );
}

export default Terms;
