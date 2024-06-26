import React, { createContext, useState, useContext, ReactNode } from 'react';
interface AuthContextType {
  token: string | null;
  setToken: (token: string | null) => void;
  logout: (cb: () => void) => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [token, setToken] = useState<string | null>(localStorage.getItem('multimedia-token'));

  const saveToken = (token: string | null) => {
    if (token) {
      localStorage.setItem('multimedia-token', token);
    } else {
      localStorage.removeItem('multimedia-token');
    }
    setToken(token);
  };

  const logout = (cbRedirect: () => void) => {
    setToken(null);
    localStorage.removeItem('multimedia-token');
    cbRedirect();
  }

  return (
    <AuthContext.Provider value={{ token, setToken: saveToken, logout }}>
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
