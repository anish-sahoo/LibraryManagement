import React, { createContext, useContext, useMemo } from 'react';
import { useNavigate } from 'react-router-dom';
import { useLocalStorage } from 'lib/useLocalStorage';
import { resetAuthTokens } from "apis/axios";
import { authUser } from "apis/auth";

const AuthContext = createContext();

export const AuthProvider = ({ children, userData }) => {
  const [user, setUser] = useLocalStorage('user', userData);
  const navigate = useNavigate();

  const login = async () => {
    try {
      const response = await authUser();
      setUser(response.data);
      navigate('/dashboard', { replace: true });
    } catch (error) {
      logout();
    }
  };

  const logout = () => {
    localStorage.removeItem('user');
    localStorage.removeItem('authToken');
    setUser(null);
    resetAuthTokens();
    navigate('/login', { replace: true });
  };

  const value = useMemo(
    () => ({
      user,
      login,
      logout
    }),
    [user]
  );

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

export const useAuth = () => {
  return useContext(AuthContext);
};
