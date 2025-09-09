import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import PresetRegisterPage from './pages/PresetRegisterPage';
import PresetListPage from './pages/PresetListPage';
import PresetRunPage from './pages/PresetRunPage';
import './App.css';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<PresetListPage />} />
        <Route path="/preset-list" element={<PresetListPage />} />
        <Route path="/preset-register" element={<PresetRegisterPage />} />
        <Route path="/preset-run" element={<PresetRunPage />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
