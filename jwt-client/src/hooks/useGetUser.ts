import { useState, useEffect } from "react";
import { User } from "../types";
import getErrorMessage from "../utils/getErrorMessage";
import useAuthContext from "./useAuthContext";
import * as api from "../api/users";

const useGetUser = () => {
  const { token, userId } = useAuthContext();
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const getUser = async () => {
      if (!token || !userId) {
        return;
      }
      try {
        const user = await api.user({ userId, token });
        setUser(user);
      } catch (err) {
        console.error("Failed to get user", err);
        const error = getErrorMessage(err);
        setError(error);
      }
      setLoading(false);
    };

    getUser();
  }, [token, userId]);

  return { user, loading, error };
}

export default useGetUser;