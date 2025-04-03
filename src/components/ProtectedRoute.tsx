
import { Navigate, Outlet } from "react-router-dom";
import { useAuth } from "@/contexts/AuthContext";
import { useEffect } from "react";
import { Loader2 } from "lucide-react";

interface ProtectedRouteProps {
  redirectPath?: string;
  requireAuth: boolean;
  allowedRole?: "user" | "brand" | null;
}

const ProtectedRoute = ({
  redirectPath = "/login",
  requireAuth,
  allowedRole,
}: ProtectedRouteProps) => {
  const { isAuthenticated, userRole, checkAuthStatus, isLoading } = useAuth();

  useEffect(() => {
    // Check auth status on component mount and when dependencies change
    checkAuthStatus();
  }, [checkAuthStatus]);

  // Show loading state while checking authentication
  if (isLoading) {
    return (
      <div className="flex min-h-screen items-center justify-center">
        <Loader2 className="h-8 w-8 animate-spin text-primary" />
      </div>
    );
  }

  // If authentication is required but user is not authenticated
  if (requireAuth && !isAuthenticated) {
    return <Navigate to={redirectPath} replace />;
  }

  // If specific role is required and user doesn't have it
  if (requireAuth && isAuthenticated && allowedRole && userRole !== allowedRole) {
    if (userRole === "user") {
      return <Navigate to="/dashboard" replace />;
    } else if (userRole === "brand") {
      return <Navigate to="/brand-dashboard" replace />;
    } else {
      return <Navigate to={redirectPath} replace />;
    }
  }

  // If user is authenticated but tries to access login/register pages
  if (!requireAuth && isAuthenticated) {
    if (userRole === "user") {
      return <Navigate to="/dashboard" replace />;
    } else if (userRole === "brand") {
      return <Navigate to="/brand-dashboard" replace />;
    }
  }

  return <Outlet />;
};

export default ProtectedRoute;
