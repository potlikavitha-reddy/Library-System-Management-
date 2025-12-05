import { Link, Outlet, useLocation, Navigate } from "react-router-dom";
import { BookOpen, Home, Users, ArrowLeftRight, BarChart3, User } from "lucide-react";
import { cn } from "@/lib/utils";
import { useAuth } from "@/contexts/AuthContext";
import { Button } from "@/components/ui/button";

export const Layout = () => {
  const location = useLocation();
  const { user } = useAuth();

  if (!user) {
    return <Navigate to="/auth" replace />;
  }

  const navItems = [
    { path: "/", icon: Home, label: "Dashboard" },
    { path: "/books", icon: BookOpen, label: "Books" },
    { path: "/members", icon: Users, label: "Members" },
    { path: "/transactions", icon: ArrowLeftRight, label: "Transactions" },
    { path: "/reports", icon: BarChart3, label: "Reports" },
  ];

  return (
    <div className="min-h-screen bg-background">
      <nav className="border-b border-border bg-card">
        <div className="container mx-auto px-4">
          <div className="flex items-center justify-between h-16">
            <div className="flex items-center gap-2">
              <BookOpen className="h-6 w-6 text-primary" />
              <span className="text-xl font-bold text-foreground">Library System</span>
            </div>
            <div className="flex items-center gap-4">
              <div className="flex gap-1">
                {navItems.map((item) => {
                  const Icon = item.icon;
                  const isActive = location.pathname === item.path;
                  return (
                    <Link
                      key={item.path}
                      to={item.path}
                      className={cn(
                        "flex items-center gap-2 px-4 py-2 rounded-md text-sm font-medium transition-colors",
                        isActive
                          ? "bg-primary text-primary-foreground"
                          : "text-muted-foreground hover:bg-accent hover:text-accent-foreground"
                      )}
                    >
                      <Icon className="h-4 w-4" />
                      {item.label}
                    </Link>
                  );
                })}
              </div>
              <Link to="/profile">
                <Button variant="ghost" size="icon">
                  <User className="h-5 w-5" />
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </nav>
      <main className="container mx-auto px-4 py-8">
        <Outlet />
      </main>
    </div>
  );
};
