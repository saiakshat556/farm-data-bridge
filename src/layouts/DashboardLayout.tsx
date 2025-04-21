
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Header from "@/components/Header";
import Sidebar from "@/components/Sidebar";
import NotificationsPanel from "@/components/NotificationsPanel";
import { auth, notificationService } from "@/services/api";
import type { Notification, UserRole } from "@/lib/types";

interface DashboardLayoutProps {
  children: React.ReactNode;
  requiredRole: UserRole;
}

export const DashboardLayout = ({ children, requiredRole }: DashboardLayoutProps) => {
  const navigate = useNavigate();
  const [sidebarOpen, setSidebarOpen] = useState(true);
  const [notificationsPanelOpen, setNotificationsPanelOpen] = useState(false);
  const [notifications, setNotifications] = useState<Notification[]>([]);
  const [user, setUser] = useState(auth.getCurrentUser());
  
  // Check authentication and role
  useEffect(() => {
    if (!auth.isAuthenticated()) {
      navigate("/login");
      return;
    }

    const currentUser = auth.getCurrentUser();
    if (!currentUser || currentUser.role !== requiredRole) {
      navigate("/login");
    } else {
      setUser(currentUser);
      fetchNotifications(currentUser.id);
    }
  }, [navigate, requiredRole]);

  // Fetch notifications
  const fetchNotifications = async (userId: string) => {
    try {
      const userNotifications = await notificationService.getUserNotifications(userId);
      setNotifications(userNotifications);
    } catch (error) {
      console.error("Failed to fetch notifications:", error);
    }
  };

  const handleNotificationClick = () => {
    setNotificationsPanelOpen(true);
  };

  const handleMarkAsRead = async (id: string) => {
    try {
      await notificationService.markAsRead(id);
      setNotifications(notifications.map(notif => 
        notif.id === id ? { ...notif, read: true } : notif
      ));
    } catch (error) {
      console.error("Failed to mark notification as read:", error);
    }
  };

  const handleMarkAllAsRead = async () => {
    if (!user) return;
    
    try {
      await notificationService.markAllAsRead(user.id);
      setNotifications(notifications.map(notif => ({ ...notif, read: true })));
    } catch (error) {
      console.error("Failed to mark all notifications as read:", error);
    }
  };

  const handleLogout = async () => {
    try {
      await auth.logout();
      navigate("/login");
    } catch (error) {
      console.error("Logout failed:", error);
    }
  };

  if (!user) {
    return null;
  }

  return (
    <div className="flex min-h-screen bg-gray-50">
      {/* Sidebar */}
      <Sidebar 
        role={user.role} 
        isOpen={sidebarOpen} 
        setIsOpen={setSidebarOpen} 
      />

      {/* Main content */}
      <div className="flex-1 flex flex-col min-h-screen">
        <Header
          userRole={user.role}
          username={user.name}
          notificationCount={notifications.filter(n => !n.read).length}
          onNotificationClick={handleNotificationClick}
          onLogout={handleLogout}
          toggleSidebar={() => setSidebarOpen(!sidebarOpen)}
        />

        <main className="flex-1 p-6 overflow-y-auto">
          {children}
        </main>
      </div>

      {/* Notifications panel */}
      <NotificationsPanel
        isOpen={notificationsPanelOpen}
        onClose={() => setNotificationsPanelOpen(false)}
        notifications={notifications}
        onMarkAsRead={handleMarkAsRead}
        onMarkAllAsRead={handleMarkAllAsRead}
      />
    </div>
  );
};

export default DashboardLayout;
