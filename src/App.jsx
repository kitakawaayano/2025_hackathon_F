import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { AuthProvider } from './contexts/AuthContext';
import PrivateRoute from './components/PrivateRoute';
import PresetRegisterPage from './pages/PresetRegisterPage';
import PresetListPage from './pages/PresetListPage';
import PresetRunPage from './pages/PresetRunPage';
import PresetEditPage from './pages/PresetEditPage';
import SignUp from './accounts/signup';
import Login from './accounts/login';
import './App.css';
import 'react-toastify/dist/ReactToastify.css';

function App() {
  return (
    <AuthProvider>
      <BrowserRouter>
        <Routes>
          {/* 公開ルート */}
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<SignUp />} />
          
          {/* 保護されたルート */}
          <Route path="/" element={
            <PrivateRoute>
              <PresetListPage />
            </PrivateRoute>
          } />
          <Route path="/preset-list" element={
            <PrivateRoute>
              <PresetListPage />
            </PrivateRoute>
          } />
          <Route path="/preset-register" element={
            <PrivateRoute>
              <PresetRegisterPage />
            </PrivateRoute>
          } />
          <Route path="/preset-run/:presetId" element={
            <PrivateRoute>
              <PresetRunPage />
            </PrivateRoute>
          } />
          <Route path="/preset-edit/:presetId" element={
            <PrivateRoute>
              <PresetEditPage />
            </PrivateRoute>
          } />
        </Routes>
      </BrowserRouter>
    </AuthProvider>
  );
}

export default App;
