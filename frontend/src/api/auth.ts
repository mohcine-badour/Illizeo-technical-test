// src/api/auth.ts
import api from "./axios";

export type LoginPayload = { email: string; password: string; subdomain?: string };
export type RegisterPayload = { name: string; email: string; password: string; subdomain?: string };

export async function loginApi(data: LoginPayload) {
  const res = await api.post("/login", data);
  // on suppose { token, user, company } renvoyés
  return res.data;
}

export async function registerApi(payload: RegisterPayload) {
  const res = await api.post("/register", payload);
  return res.data;
}

export function saveToken(token: string) {
  localStorage.setItem("token", token);
}

export function removeToken() {
  localStorage.removeItem("token");
}

// import api from "./axios";

// export const login = async (data: { email: string; password: string; subdomain: string }) => {
//   const response = await api.post("/login", data);
//   return response.data;
// };

// export const register = async (data: { name: string; email: string; password: string; subdomain: string }) => {
//   const response = await api.post("/register", data);
//   return response.data;
// };
