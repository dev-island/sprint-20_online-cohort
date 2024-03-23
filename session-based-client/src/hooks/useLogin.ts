import { useState } from "react";
import * as api from "../api/auth";
import getErrorMessage from "../utils/getErrorMessage";
import { LoginFormData } from "../types";
import { useNavigate } from "react-router-dom";

const useLogin = () => {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const [data, setData] = useState<unknown | null>(null);

  const login = async ({ username, password }: LoginFormData) => {
    setLoading(true);
    try {
      const res = await api.login({ username, password });
      setData(res.data);
      navigate("/profile");
    } catch (err) {
      console.error("Failed to login", err);
      const error = getErrorMessage(err);
      setError(error);
    }
    setLoading(false);
  };

  return { loading, error, data, login };
};

export default useLogin;
