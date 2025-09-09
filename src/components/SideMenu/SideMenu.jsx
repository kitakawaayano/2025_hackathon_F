import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import './SideMenu.css';

const SideMenu = () => {
  const location = useLocation();
  return (
    <div className="side-menu">
      <h1 className="app-name">
        <Link to="/preset-list">アプリ名</Link>
      </h1>
      <ul className="menu-list">
        <li className={['/', '/preset-list'].includes(location.pathname) ? 'active' : ''}>
          <Link to="/preset-list">プリセット一覧</Link>
        </li>
        <li className={location.pathname === '/preset-register' ? 'active' : ''}>
          <Link to="/preset-register">プリセット登録</Link>
        </li>
      </ul>
    </div>
  );
};

export default SideMenu;
