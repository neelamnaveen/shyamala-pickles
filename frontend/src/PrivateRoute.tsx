// PrivateRoute.tsx
import React from 'react';
import { Navigate, Outlet } from 'react-router-dom';

interface PrivateRouteProps {
  roles: string[];
  children?: React.ReactNode;
}

const PrivateRoute: React.FC<PrivateRouteProps> = ({ roles, children }) => {

  const currentUser = JSON.parse(window.localStorage.getItem("currentUser") as any )

  if (!currentUser) {
    return <Navigate to="/sign-in" />;
  }

  if (!roles.includes(currentUser.role)) {
    return <Navigate to="/unauthorized" />;
  }

  return children ? <>{children}</> : <Outlet />;
};

export default PrivateRoute;
