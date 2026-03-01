import { createContext, useContext, useState, useEffect } from "react";
import type { ReactNode } from "react";
import { authService } from "../services/authService";

interface User {
  email: string;
  name?: string;
  picture?: string;
  role: string;
  id?: string;
}

interface AuthContextType {
  user: User | null;
  isAuthenticated: boolean;
  isLoading: boolean;
  login: (user: User) => void;
  logout: () => Promise<void>;
  refreshToken: () => Promise<void>;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // Load user from localStorage on mount
    const storedUser = authService.getUser();
    if (storedUser) {
      setUser(storedUser);
    }
    setIsLoading(false);

    // Setup automatic token refresh
    const cleanup = authService.setupAutoRefresh();

    // Cleanup on unmount
    return cleanup;
  }, []);

  const logout = async () => {
    await authService.logout();
    setUser(null);
  };

  const login = (userData: User) => {
    setUser(userData);
  };

  const refreshToken = async () => {
    try {
      await authService.refreshToken();
      const updatedUser = authService.getUser();
      setUser(updatedUser);
    } catch (error) {
      console.error("Token refresh failed:", error);
      setUser(null);
    }
  };

  const value = {
    user,
    isAuthenticated: !!user && authService.isAuthenticated(),
    isLoading,
    login,
    logout,
    refreshToken,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
}
