import api from "./axios";
import type { LoginPayload, RegisterPayload } from "../types/global";


// export async function checkSubdomainApi(subdomain: string) {
//   const res = await api.get(`/check-subdomain/${subdomain}`);
//   return res.data;
// }

// export async function createSubdomainApi(subdomain: string) {
//   const res = await api.post("/create-subdomain", { subdomain });
//   return res.data;
// }

export async function loadCompaniesApi() {
  const res = await api.get("/companies");
  return res.data;
}

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