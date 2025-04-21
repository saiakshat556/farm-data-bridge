
import { useState, useEffect } from "react";
import { NavLink } from "react-router-dom";
import { 
  Home, 
  FileText, 
  Users, 
  Settings, 
  Bell, 
  CheckCircle, 
  X, 
  List, 
  Plus, 
  BarChart
} from "lucide-react";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";

interface SidebarProps {
  role: "farmer" | "officer" | "admin" | null;
  isOpen: boolean;
  setIsOpen: (open: boolean) => void;
}

export const Sidebar = ({ role, isOpen, setIsOpen }: SidebarProps) => {
  const [isMobile, setIsMobile] = useState(window.innerWidth < 768);

  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth < 768);
      if (window.innerWidth >= 768) {
        setIsOpen(true);
      }
    };

    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, [setIsOpen]);

  const closeSidebarIfMobile = () => {
    if (isMobile) {
      setIsOpen(false);
    }
  };

  // Define menu items based on role
  const menuItems = {
    farmer: [
      { path: "/farmer", icon: <Home className="w-5 h-5" />, label: "Dashboard" },
      { path: "/farmer/crops", icon: <List className="w-5 h-5" />, label: "My Crops" },
      { path: "/farmer/add-crop", icon: <Plus className="w-5 h-5" />, label: "Add Crop" },
      { path: "/farmer/notifications", icon: <Bell className="w-5 h-5" />, label: "Notifications" },
      { path: "/farmer/profile", icon: <Settings className="w-5 h-5" />, label: "Settings" },
    ],
    officer: [
      { path: "/officer", icon: <Home className="w-5 h-5" />, label: "Dashboard" },
      { path: "/officer/submissions", icon: <FileText className="w-5 h-5" />, label: "Submissions" },
      { path: "/officer/approved", icon: <CheckCircle className="w-5 h-5" />, label: "Approved" },
      { path: "/officer/notifications", icon: <Bell className="w-5 h-5" />, label: "Notifications" },
      { path: "/officer/profile", icon: <Settings className="w-5 h-5" />, label: "Settings" },
    ],
    admin: [
      { path: "/admin", icon: <Home className="w-5 h-5" />, label: "Dashboard" },
      { path: "/admin/users", icon: <Users className="w-5 h-5" />, label: "Users" },
      { path: "/admin/reports", icon: <BarChart className="w-5 h-5" />, label: "Reports" },
      { path: "/admin/notifications", icon: <Bell className="w-5 h-5" />, label: "Notifications" },
      { path: "/admin/settings", icon: <Settings className="w-5 h-5" />, label: "Settings" },
    ],
  };

  if (!role) {
    return null;
  }

  const currentMenuItems = menuItems[role] || [];

  return (
    <>
      {/* Mobile overlay */}
      {isMobile && isOpen && (
        <div
          className="fixed inset-0 bg-black/50 z-20"
          onClick={closeSidebarIfMobile}
        />
      )}

      {/* Sidebar */}
      <aside
        className={cn(
          "fixed inset-y-0 left-0 z-30 w-64 bg-white border-r border-gray-200 shadow-md transform transition-transform duration-300 ease-in-out md:translate-x-0 md:static md:z-auto",
          isOpen ? "translate-x-0" : "-translate-x-full"
        )}
      >
        {/* Close button for mobile */}
        {isMobile && (
          <Button
            variant="ghost"
            size="icon"
            className="absolute top-4 right-4 md:hidden"
            onClick={() => setIsOpen(false)}
          >
            <X className="h-5 w-5" />
          </Button>
        )}

        {/* Sidebar header */}
        <div className="p-5">
          <div className="flex items-center">
            <div className="h-8 w-8 bg-cropGreen rounded-md flex items-center justify-center mr-2">
              <span className="text-white font-bold">CC</span>
            </div>
            <h2 className="text-xl font-bold text-cropGreen">CropConnect</h2>
          </div>
          <div className="text-xs mt-2 text-gray-500 capitalize">{role} Portal</div>
        </div>

        {/* Navigation */}
        <nav className="p-5 pt-0">
          <ul className="space-y-2">
            {currentMenuItems.map((item) => (
              <li key={item.path}>
                <NavLink
                  to={item.path}
                  className={({ isActive }) =>
                    cn(
                      "flex items-center px-4 py-3 text-sm font-medium rounded-md transition-colors",
                      isActive
                        ? "bg-cropGreen-light/10 text-cropGreen"
                        : "text-gray-700 hover:bg-gray-100"
                    )
                  }
                  onClick={closeSidebarIfMobile}
                >
                  {item.icon}
                  <span className="ml-3">{item.label}</span>
                </NavLink>
              </li>
            ))}
          </ul>
        </nav>
      </aside>
    </>
  );
};

export default Sidebar;
