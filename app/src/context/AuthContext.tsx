import { User } from '@/types';
import React, { createContext, useState, useContext, ReactNode, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { me } from "../services/api"
interface AuthContextType {
  token: string | null;
  setToken: (token: string | null) => void;
  setUser: (newUser: User) => void;
  user: User | null;
  logout: () => void;
}

export const AuthContext = createContext<AuthContextType | undefined>(undefined);
export const TOKEN_KEY = 'multimedia-token';

export const AuthProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [token, setToken] = useState<string | null>(localStorage.getItem('multimedia-token'));
  const [user, setUser] = useState<User | null>(null);
  const navigate = useNavigate();

  const saveToken = (token: string | null) => {
    if (token) {
      localStorage.setItem(TOKEN_KEY, token);
    } else {
      localStorage.removeItem(TOKEN_KEY);
    }
    setToken(token);
  };

  const logout = () => {
    setToken(null);
    setUser(null);
    localStorage.removeItem(TOKEN_KEY);
    navigate("/login")
  }

  useEffect(() => {
    async function verifyToken(){
      try {
        const { user } = await me();
        setUser(user);
      } catch (err) {
        logout();
      }
    }
  
    verifyToken();
  }, [])
  

  return (
    <AuthContext.Provider value={{ token, setToken: saveToken, logout, setUser, user }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};
