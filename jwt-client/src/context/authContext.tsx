import { FC } from "react";
import { createContext, useState, useEffect } from "react";
import { jwtDecode } from "jwt-decode";

type AuthContextType = {
  token: string | null;
  setToken: (token: string | null) => void;
  isAuthenticated: boolean;
  userId: string | null;
  username: string | null;
};

export const AuthContext = createContext<AuthContextType>({
  token: null,
  setToken: () => {},
  isAuthenticated: false,
  userId: null,
  username: null,
});

type Props = {
  children: React.ReactNode;
};

const AndrewsCustomProvider: FC<Props> = ({ children }) => {
  const [username, setUsername] = useState<string | null>(null);
  const [userId, setUserId] = useState(() => {
    const _token = localStorage.getItem("accessToken");
    if (!_token) {
      return null;
    }
    console.log("TOKEN", _token);
    const decoded = jwtDecode(_token);
    console.log("DECODED", decoded);
    return decoded?.sub || null;
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
      const decoded = jwtDecode(token);
      // eslint-disable-next-line @typescript-eslint/ban-ts-comment
      // @ts-expect-error
      const _username = decoded?._doc?.username;
      setUsername(_username);
      setUserId(jwtDecode(token)?.sub || null);
    } else {
      localStorage.removeItem("accessToken");
    }
  }, [token]);

  return (
    <AuthContext.Provider value={{ token, setToken, isAuthenticated, userId, username }}>
      {children}
    </AuthContext.Provider>
  );
};

export default AndrewsCustomProvider;
