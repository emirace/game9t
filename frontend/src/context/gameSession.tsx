import React, { createContext, useContext, useEffect, useState } from "react";
import { IGameSession } from "../types/gameSession";
import { fetchGameSessions } from "../services/gameSession";
import { useSocket } from "./socket";
import { useUser } from "./user";
import { useToastNotification } from "./toastNotificationContext";
import { useNavigate } from "react-router-dom";
import { createGameData } from "../types/game";

interface GameSessionContextType {
  gameSessions: IGameSession[];
  gameSession: IGameSession | null;
  loading: boolean;
  error: string | null;
  selectedAmount: string;
  mode: string | null;
  acceptSessionId: string;
  setAcceptSessionId: (value: string) => void;
  setSelectedAmount: (value: string) => void;
  createChallenge: (data: createGameData) => Promise<IGameSession>;
  setGameSession: (data: IGameSession | null) => void;
  acceptChallenge: (value: { sessionId: string }) => Promise<IGameSession>;
  cancelChallenge: (value: { sessionId: string }) => Promise<{
    success: boolean;
    message: string;
  }>;
  reloadGameSessions: (userId: string) => void;
  startPlayerGame: (sessionId: string) => void;
  startComputerGame: (gameId: string, amount: number) => void;
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
  const [gameSession, setGameSession] = useState<IGameSession | null>(null);
  const [selectedAmount, setSelectedAmount] = useState("");
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const [mode, setMode] = useState<string | null>(null);
  const [acceptSessionId, setAcceptSessionId] = useState("");
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

  const createChallenge = async ({
    gameId,
    amount,
    compete,
  }: createGameData): Promise<IGameSession> => {
    return new Promise<IGameSession>((resolve, reject) => {
      socket?.emit("createChallenge", { gameId, amount, compete });

      const handleResponse = ({
        gameSession,
      }: {
        gameSession: IGameSession;
      }) => {
        compete && setGameSession(gameSession);
        compete &&
          navigate(
            `/game/${gameSession?.initiatedGame?._id}?sessionid=${gameSession._id}`
          );
        resolve(gameSession);
        cleanup();
      };

      const handleError = (error: string) => {
        reject(new Error(error));
        cleanup();
      };

      const cleanup = () => {
        socket?.off("createChallengeResponse", handleResponse);
        socket?.off("createChallengeError", handleError);
      };

      socket?.on("createChallengeResponse", handleResponse);
      socket?.on("createChallengeError", handleError);
    });
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
        setGameSession(gameSession);
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
        setMode(null);
        setSelectedAmount("");
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

  const startPlayerGame = (opponent?: string) => {
    socket?.emit("startPlayerGame", opponent);
    setMode(null);
  };

  const startComputerGame = (gameId: string, amount: number) => {
    socket?.emit("startLocalGame", gameId, amount);
    setMode(null);
  };

  useEffect(() => {
    loadGameSessions();
  }, [user]);

  useEffect(() => {
    if (!socket) return;
    socket.on("startGame", ({ mode }: { mode: string }) => {
      setMode(mode);
    });
    socket.on(
      "gameSessionCreated",
      ({ gameSession }: { gameSession: IGameSession }) => {
        setGameSessions((prevSessions) => [...prevSessions, gameSession]);
      }
    );
    socket.on(
      "updateGamesession",
      ({ gameSession }: { gameSession: IGameSession }) => {
        console.log("hello", gameSession);
        setGameSession(gameSession);
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
        addNotification({
          message: `${gameSession.players[0]?.username} challenge you to a ${
            gameSession.initiatedGame.name
          },  ${gameSession.amount || 0}`,
          buttonText: "View",
          action: () => setAcceptSessionId(gameSession._id),
        });
      }
    );
    socket.on(
      "challengeAccepted",
      ({ gameSession }: { gameSession: IGameSession }) => {
        const handleAcceptChallenge = async () => {
          try {
            navigate(
              `/game/${gameSession?.initiatedGame?._id}?sessionid=${gameSession._id}`
            );
          } catch (error: any) {
            addNotification({ message: error.message, error: true });
          }
        };
        addNotification({
          message: `${gameSession.players[0]?.username} accepted your challenge`,
          buttonText: "Play",
          action: () => handleAcceptChallenge(),
        });
      }
    );
  }, [socket]);

  return (
    <GameSessionContext.Provider
      value={{
        gameSession,
        gameSessions,
        loading,
        error,
        selectedAmount,
        mode,
        acceptSessionId,
        setAcceptSessionId,
        setSelectedAmount,
        setGameSession,
        createChallenge,
        acceptChallenge,
        cancelChallenge,
        reloadGameSessions: loadGameSessions,
        startComputerGame,
        startPlayerGame,
      }}
    >
      {children}
    </GameSessionContext.Provider>
  );
};
