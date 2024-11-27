import { useEffect, useState } from "react";
import ICONS from "../../../assets/icons/icons";
import Model from "../../_components/model";
import { useSocket } from "../../../context/socket";
import { IOnlineUser } from "../../../types/user";
import { useToastNotification } from "../../../context/toastNotificationContext";
import Loading from "../../_components/loading";
import { IGameSession } from "../../../types/gameSession";
import { useGameSession } from "../../../context/gameSession";
import { imageUrl } from "../../../services/api";
import { inviteUser } from "../../../services/user";

const SaerchPlayer: React.FC<{ gameId?: string }> = ({ gameId }) => {
  const { onlineUsers, createChallenge } = useSocket();
  const { addNotification } = useToastNotification();
  const { socket } = useSocket();
  const { cancelChallenge } = useGameSession();
  const [showConfirm, setShowConfirm] = useState(false);
  const [user, setUser] = useState<{ useranme: string; id: string } | null>(
    null
  );
  const [showCompete, setShowCompete] = useState(false);
  const [message, setMessage] = useState("");
  const [success, setSuccess] = useState(false);
  const [gameSession, setGameSession] = useState<IGameSession | null>(null);
  const [cancelling, setCancelling] = useState(false);
  const [email, setEmail] = useState("");
  const [sendingInvite, setSendingInvite] = useState(false);
  const [showInvite, setShowInvite] = useState(false);

  const handleShowCompete = (user: IOnlineUser) => {
    setUser({ useranme: user.username, id: user.userId });
    setShowConfirm(true);
  };

  const handleChallenge = async (compete?: string) => {
    if (!gameId) return;
    try {
      setShowCompete(true);
      setMessage("Craeting Challenge...");
      const res = await createChallenge({
        gameId,
        // amount: parseFloat(selectedAmount),
        compete,
      });
      setGameSession(res);
      setMessage("Wait for opponent to accept challenge");
    } catch (error: any) {
      addNotification({ message: error, error: true });
      setShowCompete(false);
    }
  };

  const handleCancelChallenge = async () => {
    try {
      if (!gameSession) return;
      setCancelling(true);
      const res = await cancelChallenge({ sessionId: gameSession?._id });

      setMessage("");
      setShowCompete(false);
      setUser(null);
      setShowConfirm(false);
      setGameSession(null);
      addNotification({ message: res.message });
    } catch (error: any) {
      addNotification({ message: error.message, error: true });
    } finally {
      setCancelling(false);
    }
  };

  useEffect(() => {
    if (!socket) return;
    socket?.on("challengeAccepted", (gameSession) => {
      setGameSession(gameSession);
      setSuccess(true);
    });
  }, [socket]);

  const handleSendInvite = async () => {
    try {
      if (!email) return;
      setSendingInvite(true);
      await inviteUser(email);
      addNotification({ message: "Invitation sent successfully" });
      setShowInvite(false);
    } catch (error: any) {
      addNotification({ message: error, error: true });
    } finally {
      setSendingInvite(false);
    }
  };

  return (
    <div className=" px-0 md:px-20">
      <h2 className="font-jua text-2xl mb-6 text-center ">Search Players</h2>

      <div className="bg-black p-2 flex gap-2 items-center rounded-md mb-6">
        <img src={ICONS.search} alt="search" className="w-4 h-4" />
        <input placeholder="Search players..." className="bg-black w-full" />
      </div>
      <button
        onClick={() => setShowInvite(true)}
        className="bg-cream text-black rounded-full font-jua p-1 px-5 mb-4"
      >
        Invite Players
      </button>
      {onlineUsers.length <= 0 && (
        <div className="p-4">No player available</div>
      )}
      <div className="grid md:grid-cols-4 gap-4">
        {onlineUsers.map((player) => (
          <div
            key={player.userId}
            className="flex flex-col gap-2 justify-center items-center p-4 bg-dark rounded-lg"
          >
            <img
              src={imageUrl + player.image}
              alt="Profile"
              className="w-12 h-12 rounded-full"
            />
            <div className="font-jua">{player.username} </div>
            <div className="text-xs">
              <span className="text-green">●</span> online
            </div>
            <button
              onClick={() => handleShowCompete(player)}
              className="bg-black text-xs font-jua py-1 px-2 mt-2 rounded-md hover:bg-gray-600"
            >
              Compete
            </button>
          </div>
        ))}
      </div>
      {showInvite && (
        <div className="mt-6">
          <div className="flex items-center gap-5">
            <input
              placeholder="Enter an email"
              className="bg-black w-full p-2 px-4 "
              onChange={(e) => setEmail(e.target.value)}
            />
            <button
              onClick={handleSendInvite}
              className="bg-cream text-black rounded-full font-jua p-2 px-5"
            >
              Send
            </button>
            {sendingInvite && <Loading size="sm" />}
          </div>
        </div>
      )}
      <Model isOpen={showConfirm} onClose={() => setShowConfirm(false)}>
        {showCompete ? (
          <div className="flex flex-col justify-center items-center w-full h-full">
            {success ? (
              <div className="flex flex-col justify-center items-center ">
                <img src={ICONS.check_green} className="" />
                <div className="text-xl font-jua mt-5">Challenge Accepted</div>
                <button className="bg-cream text-xs font-jua py-2 px-4 mt-2 rounded-md disabled:bg-slate-400 ">
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
        ) : (
          <div className="flex flex-col gap-4 justify-center items-center h-full">
            <div className="text-lg font-jua">
              Ready To Challenge {user?.useranme} ?
            </div>
            <div className="flex gap-8">
              <button
                onClick={() => handleChallenge(user?.id)}
                className="bg-black text-xs font-jua py-2 px-8 mt-2 rounded-full hover:bg-gray-600"
              >
                Yes
              </button>
              <button
                onClick={() => setShowConfirm(false)}
                className="bg-black text-xs font-jua py-2 px-8 mt-2 rounded-full hover:bg-gray-600"
              >
                No
              </button>
            </div>
          </div>
        )}
      </Model>
    </div>
  );
};

export default SaerchPlayer;
