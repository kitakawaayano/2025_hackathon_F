import React from 'react';
import SideMenu from '../components/SideMenu/SideMenu';
import PresetEdit from '../components/PresetEdit/PresetEdit';

function PresetEditPage() {
  return (
    <>
      <main>
        <SideMenu />
        <section className='content-area'>
          <div className='content'>
            <h2 className='page-title'>プリセット編集</h2>
            <PresetEdit />
          </div>
        </section>
      </main>
    </>
  );
}

export default PresetEditPage;
