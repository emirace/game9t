import { Link } from "react-router-dom";
import ICONS from "../assets/icons/icons";

function PrivacyPolicy() {
  return (
    <div className="px-4 md:px-20 py-10">
      <nav className="mb-6 flex items-center gap-2">
        <img src={ICONS.home} alt="home" className="w-4 h-4" />
        <Link to="/" className="hover:text-cream hover:underline">
          Home
        </Link>
        /<span className="">Privacy Policy</span>
      </nav>
      <h1 className="text-4xl font-bold mb-8 text-cream">Privacy Policy</h1>
      <p>
        At Game9t, your privacy is important to us. This Privacy Policy outlines
        how we collect, use, and protect your personal information when you use
        our platform. By accessing or using Game9t, you agree to the terms of
        this Privacy Policy.
      </p>
      <div className="font-jua text-xl mt-2">1. Information We Collect</div>
      <p>We may collect the following types of information:</p>
      <p>
        Personal Information: This includes your name, email address, phone
        number, date of birth, and payment details during registration or
        transactions.
      </p>
      <p>
        Account Information: Game preferences, gameplay history, wallet
        transactions, and account settings.
      </p>
      <p>
        Device Information: IP address, browser type, operating system, and
        device identifiers.
      </p>
      <p>
        Usage Data: Pages visited, time spent on the platform, and interaction
        with games and features.
      </p>
      <div className="font-jua text-xl mt-2">
        2. How We Use Your Information
      </div>
      <p>Your information is used for the following purposes:</p>
      <p>To create and manage your account.</p>
      <p>To process deposits, withdrawals, and betting transactions.</p>
      <p>To provide personalized gaming experiences and suggestions.</p>
      <p>To improve platform performance and troubleshoot issues.</p>
      <p>
        To send important updates, promotional offers, and newsletters (with
        your consent).
      </p>
      <p>To ensure compliance with legal and regulatory requirements.</p>
      <div className="font-jua text-xl mt-2">
        3. Cookies and Tracking Technologies
      </div>
      <p>
        We use cookies and similar tracking technologies to enhance your
        experience on our platform. These help us:
      </p>
      <p>Track your preferences and customize your experience.</p>
      <p>Monitor platform performance and analyze user behavior.</p>
      <p>
        You can disable cookies through your browser settings; however, this may
        affect certain features of the platform.
      </p>
      <div className="font-jua text-xl mt-2">4. Sharing of Information</div>
      <p>We may share your information in the following circumstances:</p>
      <p>
        With Service Providers: To facilitate payment processing, fraud
        detection, and customer support.
      </p>
      <p>
        With Legal Authorities: To comply with legal obligations or respond to
        valid requests from law enforcement.
      </p>
      <p>
        With Your Consent: If you authorize us to share information for specific
        purposes.
      </p>
      <p>
        We do not sell or rent your personal information to third parties for
        marketing purposes.
      </p>
      <p></p>
      <div className="font-jua text-xl mt-2">5. Data Security</div>
      <p>
        We employ industry-standard measures to safeguard your personal
        information, including encryption, secure servers, and regular security
        audits. However, no method of transmission over the internet is
        completely secure. While we strive to protect your data, we cannot
        guarantee its absolute security.
      </p>
      <div className="font-jua text-xl mt-2">6. Retention of Information</div>
      <p>
        Your information is retained as long as your account is active or as
        needed to fulfill the purposes outlined in this Privacy Policy. Upon
        account closure, certain data may be retained for legal, regulatory, or
        security reasons.
      </p>
      <div className="font-jua text-xl mt-2">7. Your Rights</div>
      <p>You have the following rights regarding your personal information:</p>
      <p>Access and review the data we hold about you.</p>
      <p>Request corrections to your information.</p>
      <p>
        Request deletion of your account and data (subject to regulatory
        requirements).
      </p>
      <p>Opt-out of receiving marketing communications.</p>
      <p>To exercise these rights, contact us at support@game9t.com.</p>
      <div className="font-jua text-xl mt-2">8. Age Restrictions</div>
      <p>
        Game9t is intended for users aged 18 years and above. We do not
        knowingly collect information from individuals under the age of 18.
      </p>
      <div className="font-jua text-xl mt-2">9. Third-Party Links</div>
      <p>
        Our platform may contain links to third-party websites or services. We
        are not responsible for their privacy practices, and we encourage you to
        review their policies before sharing any information.
      </p>
      <div className="font-jua text-xl mt-2">10. Changes to This Policy</div>
      <p>
        Game9t reserves the right to update this Privacy Policy at any time.
        Changes will be notified via email or on the platform, and your
        continued use of the platform constitutes acceptance of the updated
        terms.
      </p>
      <div className="font-jua text-xl mt-2">11. Contact Us</div>
      <p>
        If you have any questions or concerns about this Privacy Policy, contact
        us at:
      </p>
      <p>Email: support@game9t.com</p>
    </div>
  );
}

export default PrivacyPolicy;
