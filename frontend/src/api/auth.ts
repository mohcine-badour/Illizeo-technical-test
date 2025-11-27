import api from "./axios";

export type LoginPayload = { email: string; password: string; subdomain?: string };
export type RegisterPayload = { name: string; email: string; password: string; subdomain?: string };

export async function loginApi(data: LoginPayload) {
  const res = await api.post("/login", data);
  
  return res.data;
}

export async function registerApi(payload: RegisterPayload) {
  const res = await api.post("/register", payload);
  
  return res.data;
}

export async function getUserApi() {
  const res = await api.get("/user");
  return res.data;
}

export function saveToken(token: string) {
  localStorage.setItem("token", token);
}

export function removeToken() {
  localStorage.removeItem("token");
}