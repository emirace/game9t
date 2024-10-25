import { Question } from "./_component/question";

const faqs = [
  {
    title: "What types of games can I play?",
    content:
      "Absolutely! Our platform allows you to invite friends and challenge them in exciting multiplayer games. You can team up or compete against each other to see who reigns supreme!",
  },
  {
    title: "Can I play with friends?",
    content:
      "Absolutely! Our platform allows you to invite friends and challenge them in exciting multiplayer games. You can team up or compete against each other to see who reigns supreme!",
  },
  {
    title: "Is betting allowed in games?",
    content:
      "Yes, our site features competitive betting options, allowing you to place bets on your matches. This adds an extra layer of excitement and stakes to your gameplay experience!",
  },
  {
    title: "Can I play solo games?",
    content:
      "Definitely! If you prefer to play alone, we offer a variety of single-player games that cater to different skill levels and interests. Enjoy gaming at your own pace!",
  },
  {
    title: "What platforms are supported?",
    content:
      "Definitely! If you prefer to play alone, we offer a variety of single-player games that cater to different skill levels and interests. Enjoy gaming at your own pace!",
  },
  {
    title: "Are there any age restrictions?",
    content:
      "Yes, players must be at least 18 years old to participate in betting games. We prioritize a safe gaming environment for all users.",
  },
];
function Faq() {
  return (
    <div className="px-4 md:px-20 pb-20">
      <div className="font-jua text-3xl text-center ">
        Frequently Asked Questions
      </div>
      <div className="text-center mb-8 text-sm">All Your Queries Answered</div>
      <div className="flex flex-col gap-4">
        {faqs.map((faq, index) => (
          <Question content={faq.content} title={faq.title} key={index} />
        ))}
      </div>
    </div>
  );
}

export default Faq;
