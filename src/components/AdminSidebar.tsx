import { useState } from "react";
import { NavLink, useNavigate } from "react-router-dom";
import {
  LayoutDashboard,
  Train,
  FileText,
  CheckCircle,
  BarChart3,
  Settings,
  LogOut,
  Menu,
  X,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

const menuItems = [
  { title: "Dashboard", icon: LayoutDashboard, path: "/admin" },
  { title: "Monitoring Kereta", icon: Train, path: "/admin/trains" },
  { title: "Refund", icon: FileText, path: "/admin/refund" },
  { title: "Konfirmasi Tiket", icon: CheckCircle, path: "/admin/confirmation" },
  { title: "Statistik", icon: BarChart3, path: "/admin/statistics" },
  { title: "Setting", icon: Settings, path: "/admin/settings" },
];

export const AdminSidebar = () => {
  const [collapsed, setCollapsed] = useState(false);
  const navigate = useNavigate();

  const handleLogout = () => {
    // Simulate logout - in real app, clear auth tokens
    navigate("/");
  };

  return (
    <aside
      className={cn(
        "fixed left-0 top-0 z-40 h-screen bg-primary text-primary-foreground transition-all duration-300",
        collapsed ? "w-16" : "w-64"
      )}
    >
      {/* Header */}
      <div className="flex h-16 items-center justify-between border-b border-primary-foreground/10 px-4">
        {!collapsed && (
          <div className="flex items-center gap-2">
            <Train className="h-6 w-6 text-secondary" />
            <span className="text-lg font-bold">KAI Admin</span>
          </div>
        )}
        <Button
          variant="ghost"
          size="icon"
          onClick={() => setCollapsed(!collapsed)}
          className="text-primary-foreground hover:bg-primary-foreground/10"
        >
          {collapsed ? <Menu className="h-5 w-5" /> : <X className="h-5 w-5" />}
        </Button>
      </div>

      {/* Navigation */}
      <nav className="space-y-1 p-3">
        {menuItems.map((item) => (
          <NavLink
            key={item.path}
            to={item.path}
            className={({ isActive }) =>
              cn(
                "flex items-center gap-3 rounded-lg px-3 py-2.5 text-sm font-medium transition-colors",
                "hover:bg-primary-foreground/10",
                isActive
                  ? "bg-secondary text-secondary-foreground"
                  : "text-primary-foreground/80"
              )
            }
          >
            <item.icon className="h-5 w-5 flex-shrink-0" />
            {!collapsed && <span>{item.title}</span>}
          </NavLink>
        ))}
      </nav>

      {/* Logout Button */}
      <div className="absolute bottom-4 left-0 right-0 px-3">
        <Button
          variant="ghost"
          onClick={handleLogout}
          className={cn(
            "w-full justify-start gap-3 text-primary-foreground hover:bg-destructive hover:text-destructive-foreground",
            collapsed && "justify-center"
          )}
        >
          <LogOut className="h-5 w-5 flex-shrink-0" />
          {!collapsed && <span>Logout</span>}
        </Button>
      </div>
    </aside>
  );
};
