
import { useState } from "react";
import { User, Bell, LogOut, Menu } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useNavigate } from "react-router-dom";

interface HeaderProps {
  userRole: "farmer" | "officer" | "admin" | null;
  username?: string;
  notificationCount?: number;
  onNotificationClick?: () => void;
  onLogout?: () => void;
  toggleSidebar?: () => void;
}

export const Header = ({
  userRole,
  username = "",
  notificationCount = 0,
  onNotificationClick,
  onLogout,
  toggleSidebar,
}: HeaderProps) => {
  const navigate = useNavigate();
  const [showUserMenu, setShowUserMenu] = useState(false);

  const handleLogout = () => {
    if (onLogout) {
      onLogout();
    }
    // Clear any local storage/cookies
    localStorage.removeItem("cropconnect_token");
    localStorage.removeItem("cropconnect_user");
    navigate("/login");
  };

  return (
    <header className="bg-white border-b border-gray-200 shadow-sm">
      <div className="flex justify-between items-center px-4 py-2">
        <div className="flex items-center">
          {userRole && (
            <Button
              variant="ghost"
              size="icon"
              onClick={toggleSidebar}
              className="mr-2 md:hidden"
            >
              <Menu className="h-5 w-5" />
            </Button>
          )}
          <div 
            className="flex items-center cursor-pointer" 
            onClick={() => navigate("/")}
          >
            <div className="h-8 w-8 bg-cropGreen rounded-md flex items-center justify-center mr-2">
              <span className="text-white font-bold">CC</span>
            </div>
            <h1 className="text-xl font-bold text-cropGreen">CropConnect</h1>
          </div>
        </div>
        
        {userRole ? (
          <div className="flex items-center space-x-4">
            {/* Notification bell */}
            <div className="relative">
              <Button
                variant="ghost"
                size="icon"
                onClick={onNotificationClick}
                className="relative"
              >
                <Bell className="h-5 w-5" />
                {notificationCount > 0 && (
                  <span className="absolute -top-1 -right-1 bg-red-500 text-white text-xs rounded-full h-5 w-5 flex items-center justify-center">
                    {notificationCount > 9 ? "9+" : notificationCount}
                  </span>
                )}
              </Button>
            </div>

            {/* User menu */}
            <div className="relative">
              <div
                className="flex items-center space-x-2 cursor-pointer"
                onClick={() => setShowUserMenu(!showUserMenu)}
              >
                <div className="h-8 w-8 bg-soilBrown-light rounded-full flex items-center justify-center">
                  <User className="h-4 w-4 text-white" />
                </div>
                <span className="hidden md:inline-block text-sm font-medium">
                  {username}
                </span>
              </div>

              {showUserMenu && (
                <div className="absolute right-0 mt-2 w-48 bg-white rounded-md shadow-lg z-10 border">
                  <div className="p-2">
                    <div className="text-xs text-gray-500 mb-1 px-3 py-1">
                      Signed in as
                    </div>
                    <div className="font-medium px-3 py-1">{username}</div>
                    <div className="text-xs text-cropGreen capitalize px-3 py-1 mb-2">
                      {userRole}
                    </div>
                    <hr />
                    <Button
                      variant="ghost"
                      className="w-full justify-start mt-1"
                      onClick={handleLogout}
                    >
                      <LogOut className="h-4 w-4 mr-2" />
                      Sign out
                    </Button>
                  </div>
                </div>
              )}
            </div>
          </div>
        ) : (
          <div className="flex space-x-2">
            <Button
              variant="ghost"
              onClick={() => navigate("/login")}
              className="text-cropGreen hover:text-cropGreen-dark"
            >
              Login
            </Button>
            <Button
              onClick={() => navigate("/register")}
              className="bg-cropGreen hover:bg-cropGreen-dark text-white"
            >
              Register
            </Button>
          </div>
        )}
      </div>
    </header>
  );
};

export default Header;
