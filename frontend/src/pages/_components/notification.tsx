import { useNavigate } from "react-router-dom";
import { useNotifications } from "../../context/notification";
import { INotification } from "../../types/notification";
import Loading from "./loading";

function Notification() {
  const { notifications, loading, markAsRead } = useNotifications();
  const navigate = useNavigate();

  const handleOnclick = (not: INotification) => {
    markAsRead(not._id);
    if (not.link) {
      navigate(not.link);
    }
  };

  return (
    <div>
      <div className="font-jua text-lg">Latest News</div>
      <div className="flex flex-col gap-2 mt-8">
        {loading ? (
          <Loading size="sm" />
        ) : notifications.length <= 0 ? (
          <div> No notification</div>
        ) : (
          notifications.map((not, index) => (
            <div
              onClick={() => handleOnclick(not)}
              key={index}
              className={`bg-light_blue p-4 rounded-md relative cursor-pointer `}
            >
              <div className="font-jua">{not.type}</div>
              <div className="text-sm">{not.content}</div>
              {!not.read && (
                <div className="absolute top-4 right-4 text-xs font-light">
                  New
                </div>
              )}
            </div>
          ))
        )}
      </div>
      <div className="mt-4">Clear All</div>
    </div>
  );
}

export default Notification;
