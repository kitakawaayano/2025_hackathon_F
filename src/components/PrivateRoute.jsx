import React from 'react';
import { Navigate, useLocation } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';

const PrivateRoute = ({ children }) => {
  const { isAuthenticated, isInitialized } = useAuth();
  const location = useLocation();

  // 初期化が完了していない場合は何も表示しない（またはローディング表示）
  if (!isInitialized) {
    return null; // またはローディングコンポーネントを返す
  }

  if (!isAuthenticated) {
    // ログインページにリダイレクトし、元のURLを保存
    return <Navigate to="/login" state={{ from: location }} replace />;
  }

  return children;
};

export default PrivateRoute;
