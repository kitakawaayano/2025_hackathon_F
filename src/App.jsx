import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Preset from './components/Preset/Preset';
import Task from './components/Task/Task';
import SideMenu from './components/SideMenu/SideMenu'
import PresetRegister from './pages/PresetRegister';
import './App.css';

function App() {
  return (
    <BrowserRouter>
      <main>
        <SideMenu />
        <section className='content-area'>
          <div className='content'>
            <Routes>
              <Route path="/preset-list" element={<PresetRegister />} />
              <Route path="/preset-register" element={<PresetRegister />} />
            </Routes>
          </div>
        </section>
      </main>
    </BrowserRouter>
  );
}

export default App;
