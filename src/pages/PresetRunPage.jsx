import { React, useState } from 'react';
import SideMenuRun from '../components/SideMenuRun/SideMenuRun'
import PresetRun from '../components/PresetRun/PresetRun';

function PresetRunPage() {
  const [taskCount, setTaskCount] = useState(0);
  const [completedCount, setCompletedCount] = useState(0);

  return (
    <>
      <main>
        <SideMenuRun
          taskCount={taskCount}
          completedCount={completedCount}
        />
        <section className='content-area'>
          <div className='content'>
            <PresetRun
              setTaskCount={setTaskCount}
              setCompletedCount={setCompletedCount}
            />
          </div>
        </section>
      </main>
    </>
  );
}

export default PresetRunPage;
