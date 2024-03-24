import { FC } from "react";
import { createContext, useState, useEffect } from "react";
import { jwtDecode } from "jwt-decode";

type AuthContextType = {
  token: string | null;
  setToken: (token: string | null) => void;
  isAuthenticated: boolean;
  userId: string | null;
};

export const AuthContext = createContext<AuthContextType>({
  token: null,
  setToken: () => {},
  isAuthenticated: false,
  userId: null,
});

type Props = {
  children: React.ReactNode;
};

const AuthProvider: FC<Props> = ({ children }) => {
  const [userId, setUserId] = useState(() => {
    const _token = localStorage.getItem("accessToken");
    if (!_token) {
      return null;
    }
    return jwtDecode(_token)?.sub || null;
  });
  const [token, setToken] = useState<string | null>(() => {
    const _token = localStorage.getItem("accessToken");
    if (!_token) {
      return null;
    }
    return JSON.parse(_token);
  });
  const isAuthenticated = !!token;

  useEffect(() => {
    if (token) {
      localStorage.setItem("accessToken", JSON.stringify(token));
      setUserId(jwtDecode(token)?.sub || null);
    } else {
      localStorage.removeItem("accessToken");
    }
  }, [token]);

  return (
    <AuthContext.Provider value={{ token, setToken, isAuthenticated, userId }}>
      {children}
    </AuthContext.Provider>
  );
};

export default AuthProvider;
