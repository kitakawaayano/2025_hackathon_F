import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import './SideMenu.css';
import { useAuth } from '../../contexts/AuthContext';

const SideMenu = () => {
  const location = useLocation();
  const { logout } = useAuth();
  const handleLogout = async () => {
    logout()
  }

  return (
    <div className='sidemenu-area'>
      <div className="sidemenu">
        <h1 className="app-name">
          <Link to="/preset-list">Fu-Dandori</Link>
        </h1>
        <ul className="menu-list">
          <li className={['/', '/preset-list'].includes(location.pathname) ? 'active' : ''}>
            <Link to="/preset-list"><span>プリセット</span><span>一覧</span></Link>
          </li>
          <li className={location.pathname === '/preset-register' ? 'active' : ''}>
            <Link to="/preset-register"><span>プリセット</span><span>登録</span></Link>
          </li>
        </ul>

        <div className='sidemenu-button-container'>
          <button type="submit" onClick={handleLogout} className='preset-list-logoutButton'>
            <span className="material-symbols-outlined">logout</span>
            <span>ログアウト</span>
          </button>
        </div>
      </div>
    </div>
  );
};

export default SideMenu;
