
import { Navigate, Outlet } from "react-router-dom";
import { useAuth } from "@/contexts/AuthContext";

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
  const { isAuthenticated, userRole } = useAuth();

  // If authentication is required but user is not authenticated
  if (requireAuth && !isAuthenticated) {
    return <Navigate to={redirectPath} replace />;
  }

  // If specific role is required and user doesn't have it
  if (requireAuth && allowedRole && userRole !== allowedRole) {
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
