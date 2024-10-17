import Checkbox from "../profile/_components/checkbox";

function Notification() {
  return (
    <div>
      <div className="border-b border-b-cream mb-4">
        <div className="text-lg font-medium mb-4">Email Notifications</div>
        <div className=" flex items-start justify-between mb-4">
          <div>
            <div className="text-sm">Game Invites & Challenges</div>
            <div className="text-xs font-light">
              Receive email alerts for new invites.
            </div>
          </div>
          <Checkbox onChange={() => {}} />
        </div>

        <div className=" flex items-start justify-between mb-4">
          <div>
            <div className="text-sm">Rank & Achievement Updates</div>
            <div className="text-xs font-light">
              Get notified when you rank up or earn achievements.
            </div>
          </div>
          <Checkbox onChange={() => {}} />
        </div>

        <div className=" flex items-start justify-between mb-4">
          <div>
            <div className="text-sm">Promotional Offers</div>
            <div className="text-xs font-light">
              Get exclusive offers and promotions.
            </div>
          </div>
          <Checkbox onChange={() => {}} />
        </div>
      </div>
      <div className="mb-4">
        <div className="text-lg font-medium mb-4">Push Notifications</div>
        <div className=" flex items-center justify-between mb-4">
          <div className="text-sm">
            Toggle notifications for matches, friend requests, and wallet
            activity.
          </div>
          <Checkbox onChange={() => {}} />
        </div>
      </div>
    </div>
  );
}

export default Notification;
