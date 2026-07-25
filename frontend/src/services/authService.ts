import { api } from "./api";
import type { User } from "@/types/auth";

export async function register(username: string, email: string, password: string): Promise<User> {
  const { data } = await api.post<User>("/register", { username, email, password });
  return data;
}

export async function login(email: string, password: string): Promise<string> {
  const { data } = await api.post<{ access_token: string }>("/login", { email, password });
  return data.access_token;
}

export async function fetchCurrentUser(): Promise<User> {
  const { data } = await api.get<User>("/me");
  return data;
}
