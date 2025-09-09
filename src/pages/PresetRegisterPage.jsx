import React from 'react';
import SideMenu from '../components/SideMenu/SideMenu'
import PresetTaskContainer from '../components/PresetTaskContainer';

function PresetRegisterPage() {
  return (
    <>
      <main>
        <SideMenu />
        <section className='content-area'>
          <div className='content'>
            <h2 className='page-title'>プリセット登録画面</h2>
            <PresetTaskContainer />
          </div>
        </section>
      </main>
    </>
  );
}

export default PresetRegisterPage;
