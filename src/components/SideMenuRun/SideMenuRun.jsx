import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import '../SideMenu/SideMenu.css';
import './SideMenuRun.css';

const SideMenuRun = () => {
  const location = useLocation();
  return (
    <div className="side-menu">
      <h1 className="app-name">
        <Link to="/preset-list">アプリ名</Link>
      </h1>

      <h3>
        <span>
          <span className='finish-time mainColor-text'>7:30</span>
          <span className='gray-text'>まで</span>
        </span>
        <span className='remaining-time mildRed-text'>1:23:40</span>
      </h3>

      <h3>
        <span className='gray-text'>タスク進捗</span>
        <span>
          <span className='mildRed-text'>2</span>
          <span className='gray-text'>/5</span>
        </span>
      </h3>
    </div>
  );
};

export default SideMenuRun;
