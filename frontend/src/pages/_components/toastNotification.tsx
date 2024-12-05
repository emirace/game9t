import React, { useEffect } from "react";
import { useToastNotification } from "../../context/toastNotificationContext";
import ICONS from "../../assets/icons/icons";
import { useGameSession } from "../../context/gameSession";
import { useNavigate } from "react-router-dom";

const ToastNotification: React.FC = () => {
  const { notifications, removeNotification } = useToastNotification();
  const { acceptChallenge } = useGameSession();
  const navigate = useNavigate();

  useEffect(() => {
    const notificationTimeouts: Record<string, number> = {};

    notifications.forEach((notification) => {
      if (!notification.action) {
        const timeoutId = setTimeout(() => {
          removeNotification(notification.id);
        }, 5000); // Adjust the duration as needed
        notificationTimeouts[notification.id] = timeoutId as unknown as number;
      }
    });

    return () => {
      // Clear timeouts on unmount
      Object.values(notificationTimeouts).forEach((timeoutId) =>
        clearTimeout(timeoutId)
      );
    };
  }, [notifications, removeNotification]);

  const notificationsWithAction = notifications.filter(
    (notification) => notification.action
  );
  const notificationsWithoutAction = notifications.filter(
    (notification) => !notification.action
  );
  return (
    <>
      <div className="fixed top-4 right-4 z-[100] max-w-sm w-full">
        <div className="flex flex-col gap-2 ">
          {/* Notifications with actions */}
          {notificationsWithAction.map((notification) => (
            <div
              key={notification.id}
              className="relative bg-light_blue font-jua text-white rounded-lg p-4 my-2 shadow-md flex justify-center "
            >
              <div className="space-y-2">
                <div className="text-2xl text-cream font-jua">
                  {notification.message}
                </div>
                <div className="flex gap-2">
                  <div className="">Game Name</div>
                  <div className="flex-1">
                    : {notification?.gameSession?.initiatedGame?.name}
                  </div>
                </div>
                <div className="flex gap-2">
                  <div className="">Bet Amount</div>
                  <div className="flex-1 flex items-center gap-2">
                    :
                    <div className="items-center gap-2 border border-cream rounded-md px-1 flex cursor-pointer">
                      <img
                        src={ICONS.coin_cream}
                        alt="faq"
                        className="w-auto h-4"
                      />
                      <div className="font-jua  text-lg text-cream">
                        {notification?.gameSession?.amount}
                      </div>
                    </div>
                  </div>
                </div>
                <div className="flex gap-2">
                  <div className="">Challenger</div>
                  <div className="flex-1 capitalize">
                    : {notification?.gameSession?.players[0]?.username}
                  </div>
                </div>
                <div className="flex items-center justify-center gap-2">
                  <button
                    onClick={async () => {
                      await acceptChallenge({
                        sessionId: notification?.gameSession!._id,
                      });
                      navigate(
                        `/game/${notification.gameSession?.initiatedGame?._id}?sessionid=${notification.gameSession?._id}`
                      );
                      removeNotification(notification.id);
                    }}
                    className="px-2 py-1 bg-black text-cream *: text-jua text-sm rounded-full flex-1"
                  >
                    Accept
                  </button>
                  <button
                    onClick={() => {
                      removeNotification(notification.id);
                    }}
                    className="px-2 py-1 bg-cream *:  text-black text-jua text-sm rounded-full flex-1"
                  >
                    Decline
                  </button>
                </div>
              </div>

              <img
                src={ICONS.close}
                alt="close"
                className="w-4 h-4 cursor-pointer absolute top-4 right-4"
                onClick={() => removeNotification(notification.id)}
              />
            </div>
          ))}
        </div>
      </div>
      <div className="fixed top-4 left-1/2 -translate-x-1/2 z-[100]">
        <div className="flex flex-col gap-2">
          {/* Notifications without actions */}
          {notificationsWithoutAction.map((notification) => (
            <div
              key={notification.id}
              className={`${
                notification.error ? "bg-red text-white" : "bg-cream text-black"
              } text-xs text-center sm:text-sm md:text-base rounded-lg py-2 px-4 my-2 shadow-md`}
            >
              {notification.message}
            </div>
          ))}
        </div>
      </div>
    </>
  );
};

export default ToastNotification;
