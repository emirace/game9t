import { useToastNotification } from "../../context/toastNotificationContext";
import { useUser } from "../../context/user";
import Checkbox from "../profile/_components/checkbox";

function Notification() {
  const { user, updateUser } = useUser();
  const { addNotification } = useToastNotification();

  const handleSubmitEmail = async (field: string, value: boolean) => {
    try {
      await updateUser({
        settings: {
          ...user?.settings,
          notifications: {
            ...user?.settings.notifications,
            emailNotifications: {
              ...user?.settings.notifications.emailNotifications,
              [field]: value,
            },
          },
        },
      });
      addNotification({ message: "Notification updated successfully" });
    } catch (error: any) {
      addNotification({ message: error, error: true });
    }
  };

  const handleSubmitPush = async (value: boolean) => {
    try {
      await updateUser({
        settings: {
          ...user?.settings,
          notifications: {
            ...user?.settings.notifications,
            pushNotifications: value,
          },
        },
      });
      addNotification({ message: "Notification updated successfully" });
    } catch (error: any) {
      addNotification({ message: error, error: true });
    }
  };

  return (
    <div>
      <div className="border-b border-b-cream border-opacity-20 mb-4">
        <div className="text-lg font-medium mb-4">Email Notifications</div>
        <div className=" flex items-start justify-between mb-4">
          <div>
            <div className="text-sm">Game Invites & Challenges</div>
            <div className="text-xs font-light">
              Receive email alerts for new invites.
            </div>
          </div>

          <Checkbox
            checked={
              user?.settings.notifications.emailNotifications.gameInvite!
            }
            onChange={() =>
              handleSubmitEmail(
                "gameInvite",
                !user?.settings.notifications.emailNotifications.gameInvite
              )
            }
          />
        </div>

        <div className=" flex items-start justify-between mb-4">
          <div>
            <div className="text-sm">Rank & Achievement Updates</div>
            <div className="text-xs font-light">
              Get notified when you rank up or earn achievements.
            </div>
          </div>

          <Checkbox
            checked={user?.settings.notifications.emailNotifications.rank!}
            onChange={() =>
              handleSubmitEmail(
                "rank",
                !user?.settings.notifications.emailNotifications.rank
              )
            }
          />
        </div>

        <div className=" flex items-start justify-between mb-4">
          <div>
            <div className="text-sm">Promotional Offers</div>
            <div className="text-xs font-light">
              Get exclusive offers and promotions.
            </div>
          </div>

          <Checkbox
            checked={user?.settings.notifications.emailNotifications.promotion!}
            onChange={() =>
              handleSubmitEmail(
                "promotion",
                !user?.settings.notifications.emailNotifications.promotion
              )
            }
          />
        </div>
      </div>
      <div className="mb-4">
        <div className="text-lg font-medium mb-4">Push Notifications</div>
        <div className=" flex items-center justify-between mb-4">
          <div className="text-sm">
            Toggle notifications for matches, friend requests, and wallet
            activity.
          </div>
          <Checkbox
            checked={user?.settings.notifications.pushNotifications!}
            onChange={() =>
              handleSubmitPush(!user?.settings.notifications.pushNotifications)
            }
          />
        </div>
      </div>
    </div>
  );
}

export default Notification;
