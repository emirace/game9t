import React, { createContext, useEffect, ReactNode, useState } from "react";
import { Socket, io } from "socket.io-client";
import { baseURL } from "../services/api";
import { useUser } from "./user";
import { IOnlineUser } from "../types/user";

// Define the context types
interface SocketContextType {
  socket: Socket | null;
  onlineUsers: IOnlineUser[];
  isOnline: (id: string) => boolean;
}

// Create the context with a default value of null
const SocketContext = createContext<SocketContextType | undefined>(undefined);

// SocketProvider Component
interface SocketProviderProps {
  children: ReactNode;
}

export const SocketProvider = ({ children }: SocketProviderProps) => {
  const { user } = useUser();
  const [socket, setSocket] = useState<Socket | null>(null);
  const [onlineUsers, setOnlineUsers] = useState<IOnlineUser[]>([]);

  const isOnline = (userId: string) => {
    return onlineUsers.some((user) => user?.userId === userId);
  };

  useEffect(() => {
    if (!socket) {
      return;
    }
    socket?.on("onlineUsers", (onlineUsers: IOnlineUser[]) => {
      console.log("Current online users (excluding me):", onlineUsers);
      const onlineUserList = onlineUsers.filter(
        (onlineUser) => user?._id !== onlineUser.userId
      );
      setOnlineUsers(onlineUserList);
    });

    // return () => {
    //   socket.off("onlineUsers");
    // };
  }, [user, socket]);

  useEffect(() => {
    if (socket) {
      return;
    }

    const token = window.localStorage.getItem("authToken");
    if (!token || !user) return;

    const newSocket = io(baseURL, {
      autoConnect: true,
      extraHeaders: {
        authorization: `Bearer ${token}`,
        type: "main",
      },
    });

    newSocket.onAny((event, ...args) => {
      console.log(event, args);
    });

    newSocket.on("connect_error", (err) => {
      console.log("error", err.message);
    });

    setSocket(newSocket);

    // return () => {
    //   newSocket.disconnect();
    //   newSocket.close();
    // };
  }, [user]);

  return (
    <SocketContext.Provider value={{ socket, onlineUsers, isOnline }}>
      {children}
    </SocketContext.Provider>
  );
};

// Custom hook to use the SocketContext
export const useSocket = () => {
  const context = React.useContext(SocketContext);
  if (context === undefined) {
    throw new Error("useSocket must be used within a SocketProvider");
  }
  return context;
};
