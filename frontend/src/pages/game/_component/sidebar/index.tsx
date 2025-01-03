import { useEffect, useState } from "react";
import ICONS from "../../../../assets/icons/icons";
import Model from "../../../_components/model";
import SaerchPlayer from "../saerchPlayer";
import { useUser } from "../../../../context/user";
import { useWallet } from "../../../../context/wallet";
import { Link } from "react-router-dom";
import { imageUrl } from "../../../../services/api";
import { useSocket } from "../../../../context/socket";
import Loading from "../../../_components/loading";
import { useToastNotification } from "../../../../context/toastNotificationContext";
import { useGameSession } from "../../../../context/gameSession";
import PlaceBet from "./_component/placeBet";
import IMAGES from "../../../../assets/images/images";

const Sidebar: React.FC<{
  gameId?: string;
}> = ({ gameId }) => {
  const { user } = useUser();
  const { balance } = useWallet();
  const { socket } = useSocket();
  const { onlineUsers } = useSocket();
  const {
    cancelChallenge,
    createChallenge,
    selectedAmount,
    setSelectedAmount,
    gameSession,
    setGameSession,
  } = useGameSession();
  const { addNotification } = useToastNotification();
  const [showSearchPlayer, setShowSearchPlayer] = useState(false);
  const [showCompete, setShowCompete] = useState(false);
  const [message, setMessage] = useState("");
  const [success, setSuccess] = useState(false);
  const [cancelling, setCancelling] = useState(false);

  const handleChallenge = async (compete?: string) => {
    if (!gameId) return;
    if (!selectedAmount) {
      addNotification({ message: "Select an ammount", error: true });
      return;
    }
    try {
      setShowCompete(true);
      setMessage("Craeting Challenge...");
      const res = await createChallenge({
        gameId,
        amount: parseFloat(selectedAmount),
        compete,
      });
      setGameSession(res);
      if (compete) {
        setMessage("Wait for opponent to accept challenge");
      } else {
        setMessage("Challenge created Successfully");
        setSuccess(true);
      }
    } catch (error: any) {
      addNotification({ message: error.message, error: true });
      setShowCompete(false);
    }
  };
  const handleCloseCompete = async () => {
    setShowCompete(false);
    setMessage("");
    setSuccess(false);
  };

  const handleCancelChallenge = async () => {
    try {
      if (!gameSession) return;
      setCancelling(true);
      const res = await cancelChallenge({ sessionId: gameSession?._id });

      setMessage("");
      setShowCompete(false);
      setGameSession(null);
      setSuccess(false);
      addNotification({ message: res.message });
    } catch (error: any) {
      addNotification({ message: error.message, error: true });
    } finally {
      setCancelling(false);
    }
  };

  useEffect(() => {
    if (!socket) return;
    socket?.on("challengeAccepted", ({ gameSession }) => {
      setGameSession(gameSession);
      setSuccess(true);
    });
    socket?.on("challengeDeclined", () => {
      console.log("hello");
      setGameSession(null);
      handleCloseCompete();
    });
  }, [socket]);

  return (
    <aside className="bg-medium_blue w-full rounded-md pb-20 ">
      {/* Profile Section */}
      <div className="flex items-center gap-4 p-4">
        <img src={ICONS.profile_outline} alt="profile" className="w-5 h-5" />
        <h2 className="font-jua text-2xl ">My Profile</h2>
      </div>
      <div className="bg-light_blue p-4  ">
        <div className="flex items-center space-x-4 mb-4">
          <img
            src={imageUrl + user?.personalInfo?.profilePictureUrl}
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
        {/* <p className="mb-2 font-jua">Free Game Access</p>
        <div className="flex items-center bg-white bg-opacity-20  rounded-lg text-xs font-jua mb-4 overflow-hidden">
          <div
            className={`flex-1 text-center p-1 ${
              user?.totalGamesWithoutBetToday &&
              user?.totalGamesWithoutBetToday >= 1
                ? "bg-green"
                : ""
            }`}
          >
            Game 1
          </div>
          <div
            className={`flex-1 text-center p-1 ${
              user?.totalGamesWithoutBetToday &&
              user?.totalGamesWithoutBetToday >= 2
                ? "bg-green"
                : ""
            }`}
          >
            Game 2
          </div>
          <div
            className={`flex-1 text-center p-1 ${
              user?.totalGamesWithoutBetToday &&
              user?.totalGamesWithoutBetToday >= 3
                ? "bg-green"
                : ""
            }`}
          >
            Game 3
          </div>
        </div> */}
        {/* <p className="text-xs">
          (Once you reach the limit, you can't play free games)
        </p> */}
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

      {/* Place Bet Section */}
      <div className="flex items-center justify-between gap-4 p-4">
        <div className="flex items-center gap-4">
          <img src={ICONS.dollar} alt="profile" className="w-3 h-5" />
          <h2 className="font-jua text-2xl ">Place Bet</h2>
        </div>
        <img src={ICONS.question} alt="profile" className="w-4 h-4" />
      </div>
      <div className="bg-light_blue p-4">
        <PlaceBet
          selectedAmount={selectedAmount}
          setSelectedAmount={setSelectedAmount}
        />
        {gameSession ? (
          <span className="text-white font-bold font-jua text-center flex justify-center ">
            Running Challenge
          </span>
        ) : (
          <button
            onClick={() => handleChallenge()}
            className="flex items-center justify-center gap-2 text-white font-bold py-2 px-4 rounded-md w-full"
            disabled={!!gameSession}
          >
            Place Bet & Create Challenge
            <img src={ICONS.pointer} alt="profile" className="w-4 h-4" />
          </button>
        )}
      </div>
      <div className="flex items-center justify-between gap-4 p-4">
        <div className="flex items-center gap-4">
          <img src={ICONS.trophy3} alt="profile" className="w-auto h-5" />
          <h2 className="font-jua text-2xl ">Winning Amount</h2>
        </div>
      </div>
      <div className="bg-light_blue p-4 flex justify-between ">
        <div className="items-center gap-2 border border-cream rounded-md px-1 flex cursor-pointer">
          <img src={ICONS.coin_cream} alt="faq" className="w-auto h-4" />
          <div className="font-jua  text-lg text-cream">
            {parseFloat(selectedAmount || "0") * 2}
          </div>
        </div>
        <div className="text-cream font-jua">Wallet</div>
      </div>

      {/* Available Players Section */}
      <div className="flex items-center gap-4 p-4">
        <img src={ICONS.users2} alt="profile" className="w-5 h-5" />
        <h2 className="font-jua text-2xl ">Available Players</h2>
      </div>
      <div className="bg-light_blue p-4 ">
        {onlineUsers.length <= 0 && (
          <div className="p-4">No player available</div>
        )}
        <ul>
          {onlineUsers.map((player, index) => (
            <li
              key={index}
              className="flex justify-between items-center mb-4 text-white"
            >
              <div className="flex items-center gap-4">
                <img
                  src={player.image ? imageUrl + player.image : IMAGES.user2}
                  alt="Profile"
                  className="w-12 h-12 rounded-full"
                />
                <div>
                  <div className="font-jua"> {player.username}</div>
                  <div className="text-xs">
                    <span className="text-green">●</span> online
                  </div>
                </div>
              </div>
              <button
                onClick={() => handleChallenge(player.userId)}
                className="bg-black text-xs font-jua py-1 px-2 rounded-md hover:bg-gray-600"
              >
                Compete
              </button>
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
      <Model
        isOpen={showSearchPlayer}
        onClose={() => setShowSearchPlayer(false)}
      >
        <SaerchPlayer gameId={gameId} />
      </Model>

      <Model isOpen={showCompete} onClose={handleCloseCompete}>
        <div className="flex flex-col justify-center items-center w-full h-full">
          {success ? (
            <div className="flex flex-col justify-center items-center ">
              <img src={ICONS.check_green} className="" />
              <div className="text-xl font-jua mt-5">Challenge Accepted</div>
              <button
                onClick={handleCloseCompete}
                className="bg-cream text-xs font-jua py-2 px-4 mt-2 rounded-md disabled:bg-slate-400 "
              >
                Continue
              </button>
            </div>
          ) : (
            <>
              <Loading size="lg" />
              <div className="text-xl font-jua mt-5">{message}</div>
              <button
                onClick={handleCancelChallenge}
                className="bg-red text-white text-xs font-jua py-2 px-4 mt-2 rounded-md disabled:bg-slate-400 "
                disabled={cancelling}
              >
                {cancelling ? "Cancelling" : "Cancel"}
              </button>
            </>
          )}
        </div>
      </Model>
    </aside>
  );
};

export default Sidebar;
