import { Navigate, RouteProps } from 'react-router-dom';
import useAuthContext from '../hooks/useAuthContext';

import { FC } from 'react';

const AuthRoute: FC<RouteProps> = ({ children }) => {
  const { isAuthenticated } = useAuthContext();

  if (!isAuthenticated) {
    return <Navigate to="/" />;
  }
  return children
}
export default AuthRoute;