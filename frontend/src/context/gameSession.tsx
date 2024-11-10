import React, { createContext, useContext, useEffect, useState } from "react";
import { IGameSession } from "../types/gameSession";
import { fetchGameSessions } from "../services/gameSession";
import { useSocket } from "./socket";
import { useUser } from "./user";
import { useToastNotification } from "./toastNotificationContext";
import { useNavigate } from "react-router-dom";

interface GameSessionContextType {
  gameSessions: IGameSession[];
  loading: boolean;
  error: string | null;
  acceptChallenge: (value: { sessionId: string }) => Promise<IGameSession>;
  cancelChallenge: (value: { sessionId: string }) => Promise<{
    success: boolean;
    message: string;
  }>;
  reloadGameSessions: (userId: string) => void;
}

const GameSessionContext = createContext<GameSessionContextType | undefined>(
  undefined
);

export const useGameSession = () => {
  const context = useContext(GameSessionContext);
  if (!context) {
    throw new Error("useGameSession must be used within a GameSessionProvider");
  }
  return context;
};

interface GameSessionProviderProps {
  children: React.ReactNode;
}

export const GameSessionProvider: React.FC<GameSessionProviderProps> = ({
  children,
}) => {
  const { socket } = useSocket();
  const { user } = useUser();
  const { addNotification } = useToastNotification();
  const [gameSessions, setGameSessions] = useState<IGameSession[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const navigate = useNavigate();

  const loadGameSessions = async () => {
    setLoading(true);
    setError(null);
    try {
      const sessions = await fetchGameSessions();
      setGameSessions(sessions);
    } catch (err: any) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  const acceptChallenge = async ({
    sessionId,
  }: {
    sessionId: string;
  }): Promise<IGameSession> => {
    return new Promise<IGameSession>((resolve, reject) => {
      socket?.emit("acceptChallenge", { sessionId });

      const handleResponse = ({
        gameSession,
      }: {
        gameSession: IGameSession;
      }) => {
        resolve(gameSession);
        cleanup();
      };

      const handleError = (error: string) => {
        reject(new Error(error));
        cleanup();
      };

      const cleanup = () => {
        socket?.off("acceptChallengeResponse", handleResponse);
        socket?.off("acceptChallengeError", handleError);
      };

      socket?.on("acceptChallengeResponse", handleResponse);
      socket?.on("acceptChallengeError", handleError);
    });
  };

  const cancelChallenge = async ({
    sessionId,
  }: {
    sessionId: string;
  }): Promise<{
    success: boolean;
    message: string;
  }> => {
    return new Promise<{
      success: boolean;
      message: string;
    }>((resolve, reject) => {
      socket?.emit("cancelChallenge", { sessionId });

      const handleResponse = ({
        success,
        message,
      }: {
        success: boolean;
        message: string;
      }) => {
        resolve({
          success,
          message,
        });
        cleanup();
      };

      const handleError = (error: string) => {
        reject(new Error(error));
        cleanup();
      };

      const cleanup = () => {
        socket?.off("cancelChallengeResponse", handleResponse);
        socket?.off("cancelChallengeError", handleError);
      };

      socket?.on("cancelChallengeResponse", handleResponse);
      socket?.on("cancelChallengeError", handleError);
    });
  };

  useEffect(() => {
    loadGameSessions();
  }, [user]);

  useEffect(() => {
    if (!socket) return;
    socket.on(
      "gameSessionCreated",
      ({ gameSession }: { gameSession: IGameSession }) => {
        setGameSessions((prevSessions) => [...prevSessions, gameSession]);
      }
    );
    socket.on(
      "gameSessionCancelled",
      ({ sessionId }: { sessionId: string }) => {
        setGameSessions((prevSessions) =>
          prevSessions.filter((session) => session._id !== sessionId)
        );
      }
    );

    socket.on(
      "challengeRequest",
      ({ gameSession }: { gameSession: IGameSession }) => {
        const handleAcceptChallenge = async () => {
          try {
            const res = await acceptChallenge({ sessionId: gameSession._id });
            navigate(`/game/${res?.initiatedGame?._id}?gamesession=${res._id}`);
          } catch (error: any) {
            addNotification({ message: error, error: true });
          }
        };
        addNotification({
          message: `${gameSession.players[0]?.username} challenge you to a ${
            gameSession.initiatedGame.name
          }, ₦${gameSession.amount || 0}`,
          buttonText: "View",
          action: () => handleAcceptChallenge(),
        });
      }
    );
  }, [socket]);

  return (
    <GameSessionContext.Provider
      value={{
        gameSessions,
        loading,
        error,
        acceptChallenge,
        cancelChallenge,
        reloadGameSessions: loadGameSessions,
      }}
    >
      {children}
    </GameSessionContext.Provider>
  );
};
