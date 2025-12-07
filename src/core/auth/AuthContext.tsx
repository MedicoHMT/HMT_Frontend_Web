import React, { createContext, useContext, useEffect, useState } from 'react';
import { jwtDecode } from 'jwt-decode';
import { AuthStore } from '../store/authStore';
import api from '../api/api';
import { Role } from '../../config/constants';
import type { CurrentUser, UserPayload } from '../../modules/admin/types/user.types';

interface AuthContextValue {
  user: CurrentUser | null;
  accessToken: string | null;
  loginWithToken: (token: string) => void;
  logout: () => Promise<void>;
  hasRole: (roles?: string[] | undefined) => boolean;
  hasPermission: (permission?: string | undefined) => boolean;
}

const AuthContext = createContext<AuthContextValue | undefined>(undefined);

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<CurrentUser | null>(null);
  const [accessToken, setAccessToken] = useState<string | null>(null);

  // register for api to call
  useEffect(() => {
    AuthStore.register({ setUser, setAccessToken });
  }, []);

  // // On app boot, attempt /auth/me which uses the refresh cookie to provide user + optional accessToken
  // useEffect(() => {
  //   (async () => {
  //     try {
  //       const API_BASE_URL = import.meta.env.VITE_API_BASE_URL;

  //       const res = await api.post(`${API_BASE_URL}/api/auth/refresh`, {}, { withCredentials: true }); // backend uses refresh cookie
  //       const newAccessToken = res.data?.accessToken;
  //       console.log('AuthProvider: refresh success', newAccessToken);
  //       console.log('AuthProvider: refresh success', res);
  //       if (newAccessToken) {
  //         const claims = jwtDecode<UserPayload>(newAccessToken);
  //         const u: CurrentUser = {
  //           username: claims.sub,
  //           hospitalName: claims.hospitalName,
  //           role: claims.role,
  //           permissions: claims.permissions ?? []
  //         };
  //       setUser(u);
  //       setAccessToken(newAccessToken);
  //         api.defaults.headers.common['Authorization'] = `Bearer ${newAccessToken}`;
  //       }
  //       else{
  //         setUser(null);
  //         setAccessToken(null);
  //       }
      
  //     } catch {
  //       setUser(null);
  //       setAccessToken(null);
  //     } finally{
  //       setIsInitializing(false);
  //     }
  //   })();
  // }, []);


  // expose to AuthStore (so api.interceptor can set)
  useEffect(() => {
    AuthStore.setCurrentUser(user);
  }, [user]);


  const loginWithToken = (token: string) => {
    try {
      const claims = jwtDecode<UserPayload>(token);
      const u: CurrentUser = {
        username: claims.sub,
        hospitalName: claims.hospitalName,
        role: claims.role,
        permissions: claims.permissions ?? []
      };
      setUser(u);
      setAccessToken(token);
      api.defaults.headers.common['Authorization'] = `Bearer ${token}`;
    } catch (e) {
      console.error('invalid token', e);
    }
  };

  const logout = async () => {
    try { await api.post('/api/logout'); } catch { }
    setAccessToken(null);
    setUser(null);
    delete api.defaults.headers.common['Authorization'];
  };

  const hasRole = (roles?: string[]) => {
    if (!user) return false;
    if (!roles || roles.length === 0) return true;
    return roles.includes(user.role);
  };

  const hasPermission = (permission?: string) => {
    if (!user) return false;
    if (!permission) return true;

    if (user.role === Role.SUPER_ADMIN) return true;
    return user.permissions.includes(permission);
  };

  return (
    <AuthContext.Provider value={{ user, accessToken, loginWithToken, logout, hasRole, hasPermission }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = (): AuthContextValue => {
  const ctx = useContext(AuthContext);
  if (!ctx) throw new Error('useAuth must be used inside AuthProvider');
  return ctx;
};
