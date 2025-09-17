import React, { createContext, useContext, useState, useEffect } from 'react';

const AuthContext = createContext();

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // ローカルストレージから認証状態を復元
    const savedUser = localStorage.getItem('user');
    if (savedUser) {
      setUser(JSON.parse(savedUser));
    }
    setLoading(false);
  }, []);

  const login = async (username, password) => {
    try {
      const response = await fetch("http://localhost:3000/users", {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
        }
      });
      const data = await response.json();

      const foundUser = data.find(user => 
        user.user_name === username && user.password === password
      );

      if (foundUser) {
        const userInfo = {
          id: foundUser.id,
          username: foundUser.user_name,
          loginTime: new Date().toISOString()
        };
        
        setUser(userInfo);
        localStorage.setItem('user', JSON.stringify(userInfo));
        return { success: true };
      } else {
        return { success: false, error: "ユーザー名またはパスワードが間違っています" };
      }
    } catch (error) {
      console.error('Login error:', error);
      return { success: false, error: "ログインに失敗しました" };
    }
  };

  const logout = () => {
    setUser(null);
    localStorage.removeItem('user');
  };

  const value = {
    user,
    login,
    logout,
    loading,
    isAuthenticated: !!user
  };

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  );
};
