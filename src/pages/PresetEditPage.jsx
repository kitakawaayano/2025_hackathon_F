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
            <PresetEdit />
          </div>
        </section>
      </main>
    </>
  );
}

export default PresetEditPage;
