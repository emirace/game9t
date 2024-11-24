import React, { createContext, useContext, useEffect, useState } from "react";
import { useSocket } from "./socket";
import { getLatestMessages } from "../services/message";
import { IUser } from "../types/user";

interface IMessage {
  _id: string;
  user: IUser;
  content: string;
  createdAt: string;
}

interface MessageContextProps {
  messages: IMessage[];
  sendMessage: (content: string) => void;
}

const MessageContext = createContext<MessageContextProps | undefined>(
  undefined
);

export const MessageProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const { socket } = useSocket();
  const [messages, setMessages] = useState<IMessage[]>([]);

  const getMessages = async () => {
    try {
      const res = await getLatestMessages();
      setMessages(res);
    } catch (error) {
      console.log(error);
    }
  };
  const sendMessage = (content: string) => {
    if (socket) {
      socket.emit("message:send", { content });
    }
  };

  useEffect(() => {
    if (!socket) return;
    socket.on("message:update", ({ newMessage }: { newMessage: IMessage }) => {
      console.log(newMessage);
      setMessages((prev) => [...prev, newMessage]);
    });
  }, [socket]);

  useEffect(() => {
    getMessages();
  }, []);

  return (
    <MessageContext.Provider value={{ messages, sendMessage }}>
      {children}
    </MessageContext.Provider>
  );
};

// Hook to use chat context
export const useMessage = () => {
  const context = useContext(MessageContext);
  if (!context) {
    throw new Error("useMessage must be used within a MessageProvider");
  }
  return context;
};
