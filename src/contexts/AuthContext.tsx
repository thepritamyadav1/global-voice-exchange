
import { createContext, useState, useContext, useEffect, ReactNode } from "react";
import { getUserProfile, getBrandProfile } from "@/utils/database";

interface AuthContextType {
  isAuthenticated: boolean;
  userRole: "user" | "brand" | null;
  userName: string | null;
  userId: string | null;
  isLoading: boolean;
  login: (email: string, password: string, role: "user" | "brand") => Promise<boolean>;
  register: (name: string, email: string, password: string, role: "user" | "brand") => Promise<boolean>;
  logout: () => void;
  checkAuthStatus: () => void;
}

const AuthContext = createContext<AuthContextType>({
  isAuthenticated: false,
  userRole: null,
  userName: null,
  userId: null,
  isLoading: false,
  login: async () => false,
  register: async () => false,
  logout: () => {},
  checkAuthStatus: () => {},
});

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [userRole, setUserRole] = useState<"user" | "brand" | null>(null);
  const [userName, setUserName] = useState<string | null>(null);
  const [userId, setUserId] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  // Check if the user is already authenticated
  const checkAuthStatus = () => {
    setIsLoading(true);
    const storedAuth = localStorage.getItem("auth");
    if (storedAuth) {
      const authData = JSON.parse(storedAuth);
      setIsAuthenticated(true);
      setUserRole(authData.role);
      setUserName(authData.name);
      setUserId(authData.userId);
    } else {
      setIsAuthenticated(false);
      setUserRole(null);
      setUserName(null);
      setUserId(null);
    }
    setIsLoading(false);
  };

  // Check auth status on component mount
  useEffect(() => {
    checkAuthStatus();
  }, []);

  // Login function
  const login = async (email: string, password: string, role: "user" | "brand"): Promise<boolean> => {
    // In a real app, this would call an API
    try {
      setIsLoading(true);
      // Simulate API call delay
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      // For demo purposes, we'll auto-login with default credentials
      const userId = role === "user" ? "user1" : "brand1";
      const profile = role === "user" 
        ? getUserProfile(userId) 
        : getBrandProfile(userId);
      
      if (!profile) {
        throw new Error("Invalid credentials");
      }
      
      // Store auth info
      const authData = {
        isAuthenticated: true,
        role,
        name: profile.name,
        userId,
      };
      
      localStorage.setItem("auth", JSON.stringify(authData));
      
      // Update state
      setIsAuthenticated(true);
      setUserRole(role);
      setUserName(profile.name);
      setUserId(userId);
      
      setIsLoading(false);
      return true;
    } catch (error) {
      console.error("Login error:", error);
      setIsLoading(false);
      return false;
    }
  };

  // Register function
  const register = async (name: string, email: string, password: string, role: "user" | "brand"): Promise<boolean> => {
    // In a real app, this would call an API
    try {
      setIsLoading(true);
      // Simulate API call delay
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      // For demo purposes, we'll use the same logic as login
      const userId = role === "user" ? "user1" : "brand1";
      
      // Store auth info
      const authData = {
        isAuthenticated: true,
        role,
        name,
        userId,
      };
      
      localStorage.setItem("auth", JSON.stringify(authData));
      
      // Update state
      setIsAuthenticated(true);
      setUserRole(role);
      setUserName(name);
      setUserId(userId);
      
      setIsLoading(false);
      return true;
    } catch (error) {
      console.error("Register error:", error);
      setIsLoading(false);
      return false;
    }
  };

  // Logout function
  const logout = () => {
    setIsLoading(true);
    localStorage.removeItem("auth");
    setIsAuthenticated(false);
    setUserRole(null);
    setUserName(null);
    setUserId(null);
    setIsLoading(false);
  };

  return (
    <AuthContext.Provider
      value={{
        isAuthenticated,
        userRole,
        userName,
        userId,
        isLoading,
        login,
        register,
        logout,
        checkAuthStatus,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
