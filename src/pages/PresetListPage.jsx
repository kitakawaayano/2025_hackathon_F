import React from 'react';
import SideMenu from '../components/SideMenu/SideMenu'
import PresetList from '../components/PresetList/PresetList-mock';

function PresetListPage() {
  return (
    <>
      <main>
        <SideMenu />
        <section className='content-area'>
          <div className='content'>
            <h2 className='page-title'>プリセット一覧</h2>
            <PresetList />
          </div>
        </section>
      </main>
    </>
  );
}

export default PresetListPage;
