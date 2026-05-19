import React, { createContext, useContext, useState, useEffect } from 'react';

export interface User {
  name: string;
  email: string;
  phone?: string;
}

interface AuthContextType {
  user: User | null;
  login: (email: string, name?: string) => void;
  signup: (name: string, email: string, phone: string) => void;
  logout: () => void;
  isAuthenticated: boolean;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);

  useEffect(() => {
    const storedUser = localStorage.getItem('yanet_patient_user');
    if (storedUser) {
      setUser(JSON.parse(storedUser));
    }
  }, []);

  const login = (email: string, name?: string) => {
    const mockUser: User = {
      name: name || 'Abebe Kebede',
      email,
      phone: '+251 911 123456'
    };
    setUser(mockUser);
    localStorage.setItem('yanet_patient_user', JSON.stringify(mockUser));
  };

  const signup = (name: string, email: string, phone: string) => {
    const mockUser: User = {
      name,
      email,
      phone
    };
    setUser(mockUser);
    localStorage.setItem('yanet_patient_user', JSON.stringify(mockUser));
  };

  const logout = () => {
    setUser(null);
    localStorage.removeItem('yanet_patient_user');
  };

  return (
    <AuthContext.Provider value={{ user, login, signup, logout, isAuthenticated: !!user }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};
