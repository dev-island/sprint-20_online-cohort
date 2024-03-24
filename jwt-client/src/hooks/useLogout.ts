import { useState } from "react";
import * as api from "../api/auth";
import getErrorMessage from "../utils/getErrorMessage";
import { useNavigate } from "react-router-dom";
import { useCookies } from "react-cookie";

const useLogout = () => {
  const [, , removeCookie] = useCookies();

  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const logout = async () => {
    setLoading(true);
    try {
      await api.logout();
      removeCookie("connect.sid");
      navigate("/");
    } catch (err) {
      console.error("Failed to login", err);
      const error = getErrorMessage(err);
      setError(error);
    }
    setLoading(false);
  };

  return { loading, error, logout };
};

export default useLogout;
