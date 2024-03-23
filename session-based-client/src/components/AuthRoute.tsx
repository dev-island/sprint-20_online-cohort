import { Navigate, RouteProps } from 'react-router-dom';
import useAuth from '../hooks/useAuth';

import { FC } from 'react';

const AuthRoute: FC<RouteProps> = ({ children }) => {
  const { isAuthenticated } = useAuth();
  if (!isAuthenticated) {
    return <Navigate to="/" />;
  }
  return children
}
export default AuthRoute;