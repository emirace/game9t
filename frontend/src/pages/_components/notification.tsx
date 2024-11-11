const notifications = [
  {
    title: "Game Invitation",
    desc: "JohnDoe123 has invited you to play Chess.",
  },
  {
    title: "Challenge Received",
    desc: "You have received a challenge from LudoKing88 with a bet of ₦500.",
  },
  {
    title: "Game Invitation",
    desc: "JohnDoe123 has invited you to play Chess.",
  },
];

function Notification() {
  return (
    <div>
      <div className="font-jua text-lg">Latest News</div>
      <div className="flex flex-col gap-2 mt-8">
        {notifications.map((not, index) => (
          <div key={index} className="bg-light_blue p-4 rounded-md relative">
            <div className="font-jua">{not.title}</div>
            <div className="text-sm">{not.desc}</div>
            <div className="absolute top-4 right-4 text-xs font-light">New</div>
          </div>
        ))}
      </div>
      <div className="mt-4">Clear All</div>
    </div>
  );
}

export default Notification;
