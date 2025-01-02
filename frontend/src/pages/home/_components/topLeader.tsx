import { useState, useEffect } from "react";
import ICONS from "../../../assets/icons/icons";
import IMAGES from "../../../assets/images/images";
import { useToastNotification } from "../../../context/toastNotificationContext";
// import { fetchLeaderboard } from "../../../services/gameplay";
import { ILeaderBoard } from "../../../types/gameplay";
import Rating from "../../_components/rating";
import { imageUrl } from "../../../services/api";
import Loading from "../../_components/loading";

function TopLeader() {
  const { addNotification } = useToastNotification();
  const [leaderboards, _] = useState<ILeaderBoard[]>([]);
  const [loading, setLoading] = useState(false);
  useEffect(() => {
    const loadLeaderBoard = async () => {
      try {
        setLoading(false);
        // const res = await fetchLeaderboard();
        // setLeaderboards(res);
        setLoading(false);
      } catch (error: any) {
        addNotification({ message: error, error: true });
      }
    };
    loadLeaderBoard();
  }, []);
  return (
    <div className="flex flex-col md:flex-row md:items-center gap-2 md:gap-6 p-4 pb-8">
      <div className="flex items-center gap-2">
        <img src={ICONS.trophy} className="h-10 md:h-24 w-auto" alt="trophy" />
        <div className="md:hidden font-jua text-xl text-cream">Top Leaders</div>
      </div>

      <div className=" w-full">
        <div className="hidden md:block font-jua text-xl text-cream mb-3">
          Top Leaders
        </div>
        {loading ? (
          <Loading />
        ) : leaderboards.length <= 0 ? (
          <div className="">No top leader</div>
        ) : (
          <div className="flex gap-4 overflow-x-auto w-full">
            {leaderboards.map((item) => (
              <div
                key={item._id._id}
                className="flex items-center gap-4 bg-white bg-opacity-25 p-2 px-6 rounded-md "
              >
                <img
                  src={
                    item._id?.personalInfo?.profilePictureUrl
                      ? imageUrl + item._id?.personalInfo?.profilePictureUrl
                      : IMAGES.user2
                  }
                  className="h-10 w-10 rounded-full"
                  alt="user"
                />
                <div>
                  <div className=" font-jua whitespace-nowrap">
                    {item._id.username}
                  </div>
                  <div className=" text-xs">Reputations</div>
                  <Rating rating={5} />
                </div>
                <div className=" font-jua text-xs text-cream mx-6 md:mx-0 md:ml-4">
                  Complete
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}

export default TopLeader;
