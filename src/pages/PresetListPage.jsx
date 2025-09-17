import React, { useContext } from 'react';
import SideMenu from '../components/SideMenu/SideMenu'
import PresetList from '../components/PresetList/PresetList';
import { useAuth } from '../contexts/AuthContext';

function PresetListPage() {
  const { user } = useAuth();

  return (
    <>
      <main>
        <SideMenu />
        <section className='content-area'>
          <div className='content'>
            <h2 className='page-title'>{user.username}さんのプリセット一覧</h2>
            <PresetList />
          </div>
        </section>
      </main>
    </>
  );
}

export default PresetListPage;
