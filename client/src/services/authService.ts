import { api } from "@/lib/apiInstance";

export const registerUser = async (data: any) => {
  const res = await api.post("/auth/register", data);
  return res.data;
};

export const loginUser = async (data: any) => {
  const res = await api.post("/auth/login", data);
  return res.data;
};

export const forgetPassword = async (data: any) => {
  const res = await api.post("/auth/forgetPassword", data);
  return res.data;
};

export const resetPassword = async (data: any) => {
  const res = await api.post("/auth/resetPassword", data);
  return res.data;
};

export const logoutUser = async () => {
  const res = await api.post("/api/auth/logout", {}, { withCredentials: true });
  return res.data;
}