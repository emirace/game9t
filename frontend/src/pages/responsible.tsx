import { Link } from "react-router-dom";
import ICONS from "../assets/icons/icons";

function Responsible() {
  return (
    <div className="px-4 md:px-20 py-10">
      <nav className="mb-6 flex items-center gap-2">
        <img src={ICONS.home} alt="home" className="w-4 h-4" />
        <Link to="/" className="hover:text-cream hover:underline">
          Home
        </Link>
        /<span className="">Responsible Gaming Policy</span>
      </nav>
      <h1 className="text-4xl font-bold mb-8 text-cream">
        Responsible Gaming Policy
      </h1>
      <p>
        At Game9t, we are committed to providing a secure, fair, and lawful
        gaming platform for our users. This statement outlines the measures we
        take to ensure compliance with legal and regulatory requirements in the
        jurisdictions where we operate.
      </p>
      <div className="font-jua text-xl mt-2">1. Compliance with Local Laws</div>
      <p>
        Game9t adheres to all applicable gaming and gambling laws in the regions
        where our services are available. Users are responsible for ensuring
        that participation in online gaming or gambling activities is legal in
        their jurisdiction. Access to our platform may be restricted in regions
        where online gambling is prohibited.
      </p>
      <div className="font-jua text-xl mt-2">2. Age Restrictions</div>
      <p>
        We strictly enforce an age restriction policy. Only individuals aged 18
        years or older (or the legal gambling age in their jurisdiction) are
        permitted to create accounts and participate in gaming activities.
        Verification processes are in place to prevent underage access.
      </p>
      <div className="font-jua text-xl mt-2">3. Responsible Gaming</div>
      <p>
        Game9t promotes responsible gaming practices. We provide tools and
        resources to help users manage their gaming activities, including:
      </p>
      <p>
        Deposit Limits: Set limits on how much can be deposited into your
        wallet.
      </p>
      <p>
        Self-Exclusion Options: Temporarily or permanently restrict access to
        your account.
      </p>
      <p>
        Support Resources: Links to organizations that provide assistance for
        gambling-related issues.
      </p>
      <div className="font-jua text-xl mt-2">
        4. Fair Play and Anti-Fraud Measures
      </div>
      <p>
        Game9t is committed to maintaining a fair and transparent gaming
        environment.
      </p>
      <p>
        Randomized Outcomes: All games on the platform use certified algorithms
        to ensure randomness and fairness.
      </p>
      <p>
        Anti-Cheating Measures: Advanced systems monitor gameplay for fraudulent
        activities or unfair advantages.
      </p>
      <p>
        Account Security: Robust measures, including two-factor authentication,
        protect user accounts and transactions.
      </p>
      <div className="font-jua text-xl mt-2">5. Financial Integrity</div>
      <p>
        All financial transactions, including deposits, withdrawals, and bets,
        are conducted through secure and licensed payment gateways. Game9t
        complies with anti-money laundering (AML) and know-your-customer (KYC)
        regulations to prevent fraudulent or illegal activities.
      </p>
      <div className="font-jua text-xl mt-2">6. User Agreement</div>
      <p>
        By using Game9t, players agree to the platform’s terms and conditions,
        privacy policy, and this legal gaming statement. Violations, including
        attempting to bypass legal requirements or engaging in fraudulent
        activities, may result in account suspension or legal action.
      </p>
      <div className="font-jua text-xl mt-2">
        7. Jurisdiction and Dispute Resolution
      </div>
      <p>
        Any legal disputes related to the use of Game9t will be resolved under
        the governing laws of the jurisdiction in which the platform operates.
        Users agree to settle disputes through arbitration or other methods
        specified in the terms and conditions.
      </p>
      <div className="font-jua text-xl mt-2">8. Disclaimer</div>
      <p>
        While we strive to ensure that Game9t complies with all relevant legal
        requirements, users must understand and adhere to the laws applicable in
        their country or region. Game9t is not responsible for any consequences
        resulting from illegal access or use of the platform. For further
        inquiries about our legal gaming policies or compliance measures, please
        contact support@game9t.com.
      </p>
    </div>
  );
}

export default Responsible;
