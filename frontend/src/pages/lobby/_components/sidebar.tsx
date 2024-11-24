import { Link, useNavigate } from "react-router-dom";
import ICONS from "../../../assets/icons/icons";
import { useUser } from "../../../context/user";
import { imageUrl } from "../../../services/api";
import { useWallet } from "../../../context/wallet";
import { useGameSession } from "../../../context/gameSession";
import { useToastNotification } from "../../../context/toastNotificationContext";
import { useState } from "react";
import Loading from "../../_components/loading";
import SaerchPlayer from "./saerchPlayer";
import Model from "../../_components/model";
import { useMessage } from "../../../context/message";
import { useSocket } from "../../../context/socket";

// const amounts = ["200", "500", "1000", "2000", "5000", "10000"];

function Sidebar() {
  const { user } = useUser();
  const { balance } = useWallet();
  const { messages, sendMessage } = useMessage();
  const { isOnline } = useSocket();
  const { addNotification } = useToastNotification();
  const { gameSessions, acceptChallenge } = useGameSession();
  const [loading, setLoading] = useState(false);
  const [showSearchPlayer, setShowSearchPlayer] = useState(false);
  const navigate = useNavigate();
  const [message, setMessage] = useState("");

  const handleAcceptChallenge = async (session: string) => {
    try {
      setLoading(true);
      const res = await acceptChallenge({ sessionId: session });
      navigate(`/game/${res?.initiatedGame?._id}?sessionid=${session}`);
    } catch (error: any) {
      addNotification({ message: error, error: true });
    } finally {
      setLoading(false);
    }
  };

  const handleSendMessage = (e: React.FormEvent) => {
    e.preventDefault();
    sendMessage(message);
    setMessage("");
  };
  return (
    <aside className="bg-medium_blue w-full rounded-md ">
      {/* Profile Section */}
      <div className="flex items-center gap-4 p-4">
        <img src={ICONS.profile_outline} alt="profile" className="w-5 h-5" />
        <h2 className="font-jua text-2xl ">My Profile</h2>
      </div>
      <div className="bg-light_blue p-4  ">
        <div className="flex items-center space-x-4 mb-4">
          <img
            src={imageUrl + user?.personalInfo.profilePictureUrl}
            alt="Profile"
            className="w-12 h-12 rounded-full"
          />
          <div>
            <p className="font-jua">{user?.username}</p>
            <p className="text-xs font-light">
              <span className="text-green">●</span> online
            </p>
          </div>
        </div>
        <p className="mb-2 font-jua">Free Game Access</p>
        <div className="flex items-center bg-white bg-opacity-20 p-1 px-2 rounded-lg text-xs font-jua mb-4">
          <div
            className={`flex-1 text-center ${
              user?.totalGamesWithoutBetToday &&
              user?.totalGamesWithoutBetToday >= 1
                ? "bg-green"
                : ""
            }`}
          >
            Game 1
          </div>
          <div
            className={`flex-1 text-center ${
              user?.totalGamesWithoutBetToday &&
              user?.totalGamesWithoutBetToday >= 2
                ? "bg-green"
                : ""
            }`}
          >
            Game 2
          </div>
          <div
            className={`flex-1 text-center ${
              user?.totalGamesWithoutBetToday &&
              user?.totalGamesWithoutBetToday >= 3
                ? "bg-green"
                : ""
            }`}
          >
            Game 3
          </div>
        </div>
        <p className="text-xs">
          (Once you reach the limit, you can't play free games)
        </p>
        <div className="flex items-center gap-4 mt-2 ">
          <button className="border flex items-center gap-2 font-jua px-1 text-lg rounded-md">
            <img src={ICONS.wallet} alt="wallet" className="w-4 h-4" />
            {balance}
          </button>
          <Link to="/wallet/deposit" className="font-jua">
            Add Funds
          </Link>
          <Link to="/profile" className="font-jua">
            View Profile
          </Link>
        </div>
      </div>

      {/* Available Players Section */}

      <div className="flex items-center gap-4 p-4">
        <img src={ICONS.users2} alt="profile" className="w-5 h-5" />
        <h2 className="font-jua text-2xl ">Available Challeges</h2>
      </div>
      <div className="bg-light_blue p-4 ">
        {gameSessions.length <= 0 && <div>No challege available</div>}
        <ul>
          {gameSessions.map((game, index) => (
            <li
              key={index}
              className="flex justify-between items-center mb-4 text-white"
            >
              <div className="flex items-center gap-4">
                <img
                  src={game.players[0]?.personalInfo?.profilePictureUrl}
                  alt="Profile"
                  className="w-12 h-12 rounded-full"
                />
                <div>
                  <div className="font-jua"> {game.initiatedGame.name}</div>
                  {game.amount && (
                    <div className="text-xs">
                      Bet Amount{" "}
                      <span className="text-green ml-4 font-bold">
                        {game.amount}
                      </span>
                    </div>
                  )}
                </div>
              </div>
              {loading ? (
                <Loading size="sm" />
              ) : (
                <button
                  onClick={() => handleAcceptChallenge(game._id)}
                  className="bg-black text-xs font-jua py-1 px-2 rounded-md hover:bg-gray-600"
                >
                  Accept
                </button>
              )}
            </li>
          ))}
        </ul>
        <button
          onClick={() => setShowSearchPlayer(true)}
          className="bg-black rounded-full text-white font-bold py-2 px-10  mt-4"
        >
          Search Players
        </button>
      </div>
      <div className="flex items-center gap-4 p-4">
        <img src={ICONS.profile_outline} alt="profile" className="w-5 h-5" />
        <h2 className="font-jua text-2xl ">Chat</h2>
      </div>
      <div className="p-4 bg-light_blue">
        <div className="bg-dark p-4 rounded-md">
          <div className="h-40 overflow-y-auto flex flex-col-reverse">
            {messages
              .slice()
              .reverse()
              .map((msg) => (
                <div className="flex items-center gap-4 mb-4">
                  <div>
                    <p className="font-jua">{msg.user.username}</p>
                    <p className="text-xs font-light">
                      {isOnline(msg.user._id) || msg.user._id === user?._id ? (
                        <>
                          <span className="text-green">●</span> online
                        </>
                      ) : (
                        <>
                          <span className="text-yellow-400">●</span> offline
                        </>
                      )}
                    </p>
                  </div>
                  <div>: {msg.content}</div>
                </div>
              ))}
          </div>
          <form className="relative mt-4" onSubmit={handleSendMessage}>
            <input
              placeholder="Type message here..."
              className="bg-black py-1 p-4 rounded-full w-full "
              value={message}
              onChange={(e) => setMessage(e.target.value)}
            />
            <button
              className="absolute top-1/2 -translate-y-1/2 right-4 "
              disabled={!message}
              type="submit"
            >
              Send
            </button>
          </form>
        </div>
      </div>

      <Model
        isOpen={showSearchPlayer}
        onClose={() => setShowSearchPlayer(false)}
      >
        <SaerchPlayer />
      </Model>
    </aside>
  );
}

export default Sidebar;
