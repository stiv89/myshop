"use client";

import { useState, useEffect, createContext, useContext, ReactNode } from "react";

interface AuthContextType {
  isAuthenticated: boolean;
  login: (password: string) => boolean;
  logout: () => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

// Contraseña simple para el admin (en producción usar JWT o similar)
const ADMIN_PASSWORD = "admin123";

export function AuthProvider({ children }: { children: ReactNode }) {
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  useEffect(() => {
    const auth = localStorage.getItem("adminAuth");
    if (auth === "authenticated") {
      setIsAuthenticated(true);
    }
  }, []);

  const login = (password: string): boolean => {
    if (password === ADMIN_PASSWORD) {
      setIsAuthenticated(true);
      localStorage.setItem("adminAuth", "authenticated");
      return true;
    }
    return false;
  };

  const logout = () => {
    setIsAuthenticated(false);
    localStorage.removeItem("adminAuth");
  };

  return (
    <AuthContext.Provider value={{ isAuthenticated, login, logout }}>
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
