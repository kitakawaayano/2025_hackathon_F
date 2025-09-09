import React from 'react';
import SideMenuRun from '../components/SideMenuRun/SideMenuRun'
import PresetRun from '../components/PresetRun/PresetRun-mock';

function PresetRunPage() {
  return (
    <>
      <main>
        <SideMenuRun />
        <section className='content-area'>
          <div className='content'>
            <PresetRun />
          </div>
        </section>
      </main>
    </>
  );
}

export default PresetRunPage;
