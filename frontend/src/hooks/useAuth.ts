import { useMutation, useQueryClient } from "@tanstack/react-query";
import { loginApi, saveToken, removeToken } from "../api/auth";

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

export function useLogout() {
  const qc = useQueryClient();
  return () => {
    removeToken();
    qc.clear();
  };
}
