import React, { createContext, useContext, useEffect, useState } from "react";
import { INotification } from "../types/notification";
import {
  deleteAllUserNotifications,
  fetchUserNotifications,
} from "../services/notification";
import { useUser } from "./user";
import { useSocket } from "./socket";

interface NotificationContextValue {
  notifications: INotification[];
  unreadCount: number;
  loading: boolean;
  error: string | null;
  refetchNotifications: () => Promise<void>;
  markAsRead: (id: string) => void;
  deleteNotifications: () => void;
}

// Create the context
const NotificationContext = createContext<NotificationContextValue | undefined>(
  undefined
);

// Provider component
export const NotificationProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const { user } = useUser();
  const { socket } = useSocket();
  const [notifications, setNotifications] = useState<INotification[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const unreadCount = notifications.filter(
    (notification) => !notification.read
  ).length;

  const fetchNotifications = async () => {
    try {
      if (!user) return;
      setLoading(true);
      const data = await fetchUserNotifications();
      setNotifications(data);
      setError(null);
    } catch (err: any) {
      setError(err || "Failed to fetch notifications");
    } finally {
      setLoading(false);
    }
  };

  const deleteNotifications = async () => {
    try {
      await deleteAllUserNotifications();
      setNotifications([]);
    } catch (err: any) {
      setError(err || "Failed to fetch notifications");
    }
  };

  const markAsRead = (notificationId: string) => {
    if (!socket) return;
    socket.emit("markNotificationAsRead", {
      notificationId,
    });
  };

  // Fetch notifications on mount
  useEffect(() => {
    fetchNotifications();
  }, [user]);

  useEffect(() => {
    if (!socket) return;
    socket.on("newNotification", (notification) => {
      setNotifications([...notifications, notification]);
    });
    socket.on("notificationRead", ({ notificationId }) => {
      setNotifications((prev) =>
        prev.map((notification) =>
          notification._id === notificationId
            ? { ...notification, read: true }
            : notification
        )
      );
    });
  }, [socket]);

  return (
    <NotificationContext.Provider
      value={{
        notifications,
        unreadCount,
        loading,
        error,
        markAsRead,
        deleteNotifications,
        refetchNotifications: fetchNotifications,
      }}
    >
      {children}
    </NotificationContext.Provider>
  );
};

// Custom hook to use the NotificationContext
export const useNotifications = (): NotificationContextValue => {
  const context = useContext(NotificationContext);
  if (context === undefined) {
    throw new Error(
      "useNotifications must be used within a NotificationProvider"
    );
  }
  return context;
};
