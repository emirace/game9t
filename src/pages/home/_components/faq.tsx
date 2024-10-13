import ICONS from "../../../assets/icons/icons";

const faqs = [
  { title: "What types of games can I play?", content: "" },
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
    <div className="px-20 pb-20">
      <div className="font-jua text-3xl text-center ">
        Frequently Asked Questions
      </div>
      <div className="text-center mb-8 text-sm">All Your Queries Answered</div>
      <div className="flex flex-col gap-4">
        {faqs.map((faq, index) => (
          <div key={index} className="relative bg-dark p-4 rounded-md">
            <div className=" font-jua">{faq.title}</div>
            <div className="text-sm">{faq.content}</div>
            <div className="bg-cream p-1 absolute top-1/2 -translate-y-1/2 right-4 rounded-sm">
              <img src={ICONS.arrow_down} className="h-2 w-4" alt="star" />
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default Faq;
