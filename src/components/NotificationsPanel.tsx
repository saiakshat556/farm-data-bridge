
import { useState, useEffect } from "react";
import { Bell, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

interface Notification {
  id: string;
  title: string;
  message: string;
  timestamp: string;
  read: boolean;
  type: "info" | "success" | "warning" | "error";
}

interface NotificationsPanelProps {
  isOpen: boolean;
  onClose: () => void;
  notifications: Notification[];
  onMarkAsRead: (id: string) => void;
  onMarkAllAsRead: () => void;
}

export const NotificationsPanel = ({
  isOpen,
  onClose,
  notifications,
  onMarkAsRead,
  onMarkAllAsRead,
}: NotificationsPanelProps) => {
  const [isMobile, setIsMobile] = useState(window.innerWidth < 768);

  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth < 768);
    };

    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  const getNotificationColor = (type: string) => {
    switch (type) {
      case "success":
        return "bg-green-100 border-green-500 text-green-800";
      case "warning":
        return "bg-yellow-100 border-yellow-500 text-yellow-800";
      case "error":
        return "bg-red-100 border-red-500 text-red-800";
      default:
        return "bg-blue-100 border-blue-500 text-blue-800";
    }
  };

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return new Intl.DateTimeFormat("en-US", {
      month: "short",
      day: "numeric",
      hour: "numeric",
      minute: "numeric",
      hour12: true,
    }).format(date);
  };

  return (
    <>
      {/* Mobile overlay */}
      {isMobile && isOpen && (
        <div
          className="fixed inset-0 bg-black/50 z-30"
          onClick={onClose}
        />
      )}

      {/* Notifications panel */}
      <div
        className={cn(
          "fixed inset-y-0 right-0 z-40 w-80 bg-white shadow-xl transform transition-transform duration-300 ease-in-out",
          isOpen ? "translate-x-0" : "translate-x-full"
        )}
      >
        <div className="flex items-center justify-between border-b px-4 py-3">
          <div className="flex items-center space-x-2">
            <Bell className="h-5 w-5 text-cropGreen" />
            <h2 className="text-lg font-medium">Notifications</h2>
          </div>
          <Button variant="ghost" size="icon" onClick={onClose}>
            <X className="h-5 w-5" />
          </Button>
        </div>

        {notifications.length === 0 ? (
          <div className="flex flex-col items-center justify-center h-60 p-4">
            <Bell className="h-12 w-12 text-gray-300 mb-2" />
            <p className="text-gray-500 text-center">No notifications yet</p>
          </div>
        ) : (
          <>
            <div className="p-4 border-b flex justify-between items-center">
              <span className="text-sm text-gray-500">
                {notifications.filter(n => !n.read).length} unread notifications
              </span>
              <Button
                variant="link"
                size="sm"
                className="text-cropGreen text-sm p-0"
                onClick={onMarkAllAsRead}
              >
                Mark all as read
              </Button>
            </div>

            <div className="overflow-auto h-[calc(100%-110px)]">
              {notifications.map((notification) => (
                <div
                  key={notification.id}
                  className={cn(
                    "p-4 border-l-4 border-b hover:bg-gray-50 transition-colors",
                    notification.read ? "bg-white" : "bg-gray-50",
                    getNotificationColor(notification.type)
                  )}
                  onClick={() => onMarkAsRead(notification.id)}
                >
                  <div className="flex justify-between items-start">
                    <h3 className="font-medium text-sm">{notification.title}</h3>
                    {!notification.read && (
                      <div className="h-2 w-2 bg-cropGreen rounded-full"></div>
                    )}
                  </div>
                  <p className="text-sm mt-1 text-gray-600">{notification.message}</p>
                  <div className="text-xs text-gray-400 mt-2">
                    {formatDate(notification.timestamp)}
                  </div>
                </div>
              ))}
            </div>
          </>
        )}
      </div>
    </>
  );
};

export default NotificationsPanel;
