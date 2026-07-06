"use client";

import React, { createContext, useContext, useState, useEffect, useCallback } from "react";
import type { MockUser } from "@/types/auth";
import { enrichAuthUserFromRegistration } from "@/services/registration";

interface AuthContextValue {
  user: MockUser | null;
  isAuthenticated: boolean;
  login: (user: MockUser) => void;
  logout: () => void;
}

const AuthContext = createContext<AuthContextValue>({
  user: null,
  isAuthenticated: false,
  login: () => {},
  logout: () => {},
});

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<MockUser | null>(null);

  useEffect(() => {
    const stored = localStorage.getItem("cggs_auth_user");
    if (stored) {
      try {
        setUser(enrichAuthUserFromRegistration(JSON.parse(stored)));
      } catch {
        localStorage.removeItem("cggs_auth_user");
      }
    }
  }, []);

  const login = useCallback((userData: MockUser) => {
    const enriched = enrichAuthUserFromRegistration(userData);
    setUser(enriched);
    localStorage.setItem("cggs_auth_user", JSON.stringify(enriched));
  }, []);

  const logout = useCallback(() => {
    setUser(null);
    localStorage.removeItem("cggs_auth_user");
  }, []);

  return (
    <AuthContext.Provider value={{ user, isAuthenticated: !!user, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  return useContext(AuthContext);
}

export type { MockUser };
