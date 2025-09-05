import React from 'react';
import Link from '../../components/Link';
import './SideMenu.css';

const SideMenu = () => {
  return (
    <div className="side-menu">
      <h1 className="app-name">アプリ名</h1>
      <ul className="menu-list">
        <li><Link to="/presets-list" text="プリセット一覧" /></li>
        <li><Link to="/presets-register" text="プリセット登録" /></li>
      </ul>
    </div>
  );
};

export default SideMenu;
