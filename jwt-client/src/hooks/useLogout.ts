import { useState } from "react";
import getErrorMessage from "../utils/getErrorMessage";
import { useNavigate } from "react-router-dom";
import useAuthContext from "./useAuthContext";

const useLogout = () => {
  const { setToken } = useAuthContext();

  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const logout = () => {
    setLoading(true);
    try {
      setToken(null);
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
