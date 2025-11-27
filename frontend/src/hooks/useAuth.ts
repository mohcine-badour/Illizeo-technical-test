import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { loginApi, saveToken, removeToken, registerApi, getUserApi } from "../api/auth";

export function useLogin() {
  const qc = useQueryClient();
  return useMutation({
    mutationFn: loginApi,
    onSuccess(data) {
      if (data.token) saveToken(data.token);
      qc.invalidateQueries({ queryKey: ["notes"] });
    },
  });
}

export function useRegister() {
  const qc = useQueryClient();
  return useMutation({
    mutationFn: registerApi,
    onSuccess(data) {
      if (data.token) saveToken(data.token);
      qc.invalidateQueries({ queryKey: ["notes"] });
    },
    onError(error) {
      console.error(error);
    },
  });
} 

export function useGetUser() {
  return useQuery({
    queryKey: ["user"],
    queryFn: getUserApi,
  });
}

export function useLogout() {
  const qc = useQueryClient();
  return () => {
    removeToken();
    qc.clear();
  };
}
