import { Navigate, RouteProps } from 'react-router-dom';

import { FC } from 'react';
import { useAuth0 } from '@auth0/auth0-react';

const AuthRoute: FC<RouteProps> = ({ children }) => {
  const { isLoading, isAuthenticated } = useAuth0();
  if (isLoading) {
    return <div>Loading...</div>;
  }

  if (!isAuthenticated) {
    return <Navigate to="/" />;
  }
  return children
}
export default AuthRoute;