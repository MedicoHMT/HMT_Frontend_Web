import React from 'react';
import { Navigate, Outlet, useLocation } from 'react-router-dom';
import { useAuth } from './auth/AuthContext';

interface GuardProps {
  roles?: string[];
  permission?: string;
  children?: React.ReactNode;
}

export const RouteGuard: React.FC<GuardProps> = ({ roles, permission, children }) => {
  const { user, hasRole, hasPermission } = useAuth();
  const location = useLocation();


  if (!user) {
    return <Navigate to="/login" state={{ from: location }} replace />;
  }

  // Role check (roles are OR)
  if (roles && roles.length > 0 && !hasRole(roles)) {
    return <Navigate to="/403" replace />;
  }

  // Permission check (AND)
  if (permission && !hasPermission(permission)) {
    return <Navigate to="/403" replace />;
  }

  return (children ? <>{children}</> : <Outlet />);
};
