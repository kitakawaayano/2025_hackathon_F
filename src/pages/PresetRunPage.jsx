import { React, useState } from 'react';
import SideMenuRun from '../components/SideMenuRun/SideMenuRun'
import PresetRun from '../components/PresetRun/PresetRun';

function PresetRunPage() {
  const [taskCount, setTaskCount] = useState(0);

  return (
    <>
      <main>
        <SideMenuRun taskCount={taskCount} />
        <section className='content-area'>
          <div className='content'>
            <PresetRun setTaskCount={setTaskCount} />
          </div>
        </section>
      </main>
    </>
  );
}

export default PresetRunPage;
