import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import SideMenu from './components/SideMenu/SideMenu'
import PresetRegisterPage from './pages/PresetRegisterPage';
import PresetListPage from './pages/PresetListPage';
import './App.css';

function App() {
  return (
    <BrowserRouter>
      <main>
        <SideMenu />
        <section className='content-area'>
          <div className='content'>
            <Routes>
              <Route path="/" element={<PresetListPage />} />
              <Route path="/preset-list" element={<PresetListPage />} />
              <Route path="/preset-register" element={<PresetRegisterPage />} />
            </Routes>
          </div>
        </section>
      </main>
    </BrowserRouter>
  );
}

export default App;
