import { useState } from "react";
import * as api from "../api/auth";
import getErrorMessage from "../utils/getErrorMessage";
import { LoginFormData } from "../types";
import { useNavigate } from "react-router-dom";
import useAuthContext from "./useAuthContext";

const useLogin = () => {
  // On login, we store the token in local storage
  const { setToken } = useAuthContext();
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const login = async ({ username, password }: LoginFormData) => {
    setLoading(true);
    try {
      const res = await api.login({ username, password });
      console.log("RES", res)
      setToken(res.accessToken);
      navigate("/profile");
    } catch (err) {
      console.error("Failed to login", err);
      const error = getErrorMessage(err);
      setError(error);
    }
    setLoading(false);
  };

  return { loading, error, login };
};

export default useLogin;
