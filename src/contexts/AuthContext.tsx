
import { createContext, useContext, useState, useEffect, ReactNode } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "@/components/ui/use-toast";

type UserRole = "user" | "brand" | null;

interface AuthContextType {
  isAuthenticated: boolean;
  userRole: UserRole;
  userName: string | null;
  login: (email: string, password: string, role: UserRole) => void;
  register: (name: string, email: string, password: string, role: UserRole) => void;
  logout: () => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }: { children: ReactNode }) {
  const [isAuthenticated, setIsAuthenticated] = useState<boolean>(false);
  const [userRole, setUserRole] = useState<UserRole>(null);
  const [userName, setUserName] = useState<string | null>(null);
  const navigate = useNavigate();

  // Check if user is already logged in on component mount
  useEffect(() => {
    const storedAuth = localStorage.getItem("authState");
    if (storedAuth) {
      const { isAuthenticated, userRole, userName } = JSON.parse(storedAuth);
      setIsAuthenticated(isAuthenticated);
      setUserRole(userRole);
      setUserName(userName);
    }
  }, []);

  // Save auth state to localStorage whenever it changes
  useEffect(() => {
    if (isAuthenticated) {
      localStorage.setItem(
        "authState",
        JSON.stringify({ isAuthenticated, userRole, userName })
      );
    }
  }, [isAuthenticated, userRole, userName]);

  const login = (email: string, password: string, role: UserRole) => {
    // In a real app, this would be an API call to authenticate the user
    if (email && password) {
      setIsAuthenticated(true);
      setUserRole(role);
      
      // Simulate getting user name from response
      const name = email.split('@')[0];
      setUserName(name);
      
      toast({
        title: "Logged in successfully",
        description: `Welcome back, ${name}!`,
      });
      
      // Redirect based on user role
      if (role === "user") {
        navigate("/dashboard");
      } else if (role === "brand") {
        navigate("/brand-dashboard");
      }
    } else {
      toast({
        title: "Login failed",
        description: "Please enter both email and password.",
        variant: "destructive",
      });
    }
  };

  const register = (name: string, email: string, password: string, role: UserRole) => {
    // In a real app, this would be an API call to register the user
    if (name && email && password) {
      setIsAuthenticated(true);
      setUserRole(role);
      setUserName(name);
      
      toast({
        title: "Account created successfully",
        description: `Welcome, ${name}!`,
      });
      
      // Redirect based on user role
      if (role === "user") {
        navigate("/dashboard");
      } else if (role === "brand") {
        navigate("/brand-dashboard");
      }
    } else {
      toast({
        title: "Registration failed",
        description: "Please fill in all fields.",
        variant: "destructive",
      });
    }
  };

  const logout = () => {
    setIsAuthenticated(false);
    setUserRole(null);
    setUserName(null);
    localStorage.removeItem("authState");
    
    toast({
      title: "Logged out",
      description: "You have been logged out successfully.",
    });
    
    navigate("/");
  };

  return (
    <AuthContext.Provider
      value={{
        isAuthenticated,
        userRole,
        userName,
        login,
        register,
        logout,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
}
