import { useCookies } from "react-cookie";

const useAuth = () => {
  const [cookies] = useCookies(["connect.sid"]);
  const session = cookies["connect.sid"];

  return { isAuthenticated: !!session };
};

export default useAuth;
