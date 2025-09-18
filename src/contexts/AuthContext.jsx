import React, { createContext, useContext, useState, useEffect } from 'react';
import { useCookies } from 'react-cookie';

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
  const [isInitialized, setIsInitialized] = useState(false);
  const [cookies, setCookie, removeCookie] = useCookies(['id', 'username']);

  useEffect(() => {
    // 初期化時にCookieから認証状態を復元
    if (cookies.id && cookies.username) {
      setUser({
        id: cookies.id,
        username: cookies.username
      });
    }
    setIsInitialized(true);
  }, [cookies.id, cookies.username]);

  const login = async (username, password) => {
    try {
      const response = await fetch("https://two025-hackathon-json.onrender.com/users", {

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
          username: foundUser.user_name
        };
        
        setUser(userInfo);
        setCookie('id', foundUser.id, { path: '/' });
        setCookie('username', foundUser.user_name, { path: '/' });
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
    removeCookie('id', { path: '/' });
    removeCookie('username', { path: '/' });
  };

  const value = {
    user,
    login,
    logout,
    isAuthenticated: !!user,
    isInitialized
  };

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  );
};
