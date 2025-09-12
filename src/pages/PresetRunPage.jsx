import { React, useState } from 'react';
import SideMenuRun from '../components/SideMenuRun/SideMenuRun'
import PresetRun from '../components/PresetRun/PresetRun';

function PresetRunPage() {
  const [filteredTasks, setFilteredTasks] = useState(0);
  const [completedCount, setCompletedCount] = useState(0);

  return (
    <>
      <main>
        <SideMenuRun
          filteredTasks={filteredTasks}
          completedCount={completedCount}
        />
        <section className='content-area'>
          <div className='content'>
            <PresetRun
              setFilteredTasks={setFilteredTasks}
              setCompletedCount={setCompletedCount}
            />
          </div>
        </section>
      </main>
    </>
  );
}

export default PresetRunPage;
