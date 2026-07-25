import { createContext, useEffect, useState, type ReactNode } from "react";
import type { User } from "@/types/auth";
import { fetchCurrentUser, login as loginRequest, register as registerRequest } from "@/services/authService";

interface AuthContextValue {
  user: User | null;
  isLoading: boolean;
  login: (email: string, password: string) => Promise<void>;
  register: (username: string, email: string, password: string) => Promise<void>;
  logout: () => void;
}

export const AuthContext = createContext<AuthContextValue | undefined>(undefined);

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const token = localStorage.getItem("dsarena_token");
    if (!token) {
      setIsLoading(false);
      return;
    }
    fetchCurrentUser()
      .then(setUser)
      .catch(() => localStorage.removeItem("dsarena_token"))
      .finally(() => setIsLoading(false));
  }, []);

  async function login(email: string, password: string) {
    const token = await loginRequest(email, password);
    localStorage.setItem("dsarena_token", token);
    const currentUser = await fetchCurrentUser();
    setUser(currentUser);
  }

  async function register(username: string, email: string, password: string) {
    await registerRequest(username, email, password);
    await login(email, password);
  }

  function logout() {
    localStorage.removeItem("dsarena_token");
    setUser(null);
  }

  return (
    <AuthContext.Provider value={{ user, isLoading, login, register, logout }}>
      {children}
    </AuthContext.Provider>
  );
}
