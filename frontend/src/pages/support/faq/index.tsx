import { Link } from "react-router-dom";
import ICONS from "../../../assets/icons/icons";
import Section from "./_component/section";

const faqs = [
  {
    title: "Account Management",
    questions: [
      {
        question: "How do I create an account?",
        answer:
          "To create an account, click on the 'Sign Up' button on the homepage, fill in the required details such as your email, username, and password, then follow the email verification link sent to your inbox.",
      },
      {
        question: "How do I reset my password?",
        answer:
          "Click on the 'Forgot Password' link on the login page. Enter your registered email address, and you'll receive a password reset link to create a new password.",
      },
      {
        question: "How can I update my profile information?",
        answer:
          "Log in to your account, go to the 'Profile' section in the user dashboard, and update your personal information such as name, contact details, and profile picture.",
      },
    ],
  },
  {
    title: "Payments and Withdrawals",
    questions: [
      {
        question: "What payment methods do you support?",
        answer:
          "We support payments via Paystack, Flutterwave, and various cryptocurrencies. You can deposit using credit/debit cards or bank transfers.",
      },
      {
        question: "How long does it take to process a withdrawal?",
        answer:
          "Withdrawals are typically processed within 24-48 hours. Cryptocurrency withdrawals may be faster, depending on network congestion.",
      },
      {
        question: "Is there a minimum withdrawal amount?",
        answer:
          "Yes, the minimum withdrawal amount is 1,000 Points for bank transfers and equivalent in cryptocurrency for crypto withdrawals.",
      },
    ],
  },
  {
    title: "Betting and Games",
    questions: [
      {
        question: "How do I place a bet on a game?",
        answer:
          "Select a game from the game lobby, choose a predefined bet amount, and either challenge an opponent or accept an open challenge.",
      },
      {
        question: "What happens if my opponent disconnects during a game?",
        answer:
          "If your opponent disconnects, the game may automatically forfeit in your favor, depending on the game’s rules and the time of disconnection.",
      },
      {
        question: "Can I play games for free?",
        answer:
          "Yes, selected games like Tic Tac Toe and Connect Four offer free play options, with a daily limit of three free games per player",
      },
    ],
  },
  {
    title: "Technical Issues",
    questions: [
      {
        question: "I’m experiencing lag during gameplay. What should I do?",
        answer:
          "Ensure you have a stable internet connection. If the problem persists, try clearing your browser cache or restarting your device.",
      },
      {
        question: "The website isn’t loading properly. How can I fix it?",
        answer:
          "Check your internet connection, disable any ad blockers, and try refreshing the page. If the issue continues, contact our support team.",
      },
      {
        question: "How do I report a bug or issue?",
        answer:
          "You can report bugs through the 'Support' page. Provide a detailed description of the issue and any screenshots to help us resolve it quickly.",
      },
    ],
  },
];

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
      <div className="w-full max-w-6xl mx-auto z-50">
        <div className="font-jua text-3xl text-center  mb-5">
          Frequently Asked Questions
        </div>
        {faqs.map((faq, index) => (
          <Section faq={faq} key={index} />
        ))}
      </div>
    </div>
  );
}

export default Faq;
