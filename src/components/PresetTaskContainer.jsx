import { useState } from 'react';
import Preset from './Preset';
import Task from './Task/Task';

function PresetTaskContainer() {
  const [presetName, setPresetName] = useState('');
  const [finishTime, setFinishTime] = useState('');
  const [tasks, setTasks] = useState([{ name: '', tasktime: '', importance: '1' }]);
  return (
    <div>
      <Preset
        name={presetName}
        setName={setPresetName}
        finishtime={finishTime}
        setFinishtime={setFinishTime}
        tasks={tasks}
      />
      <Task
        tasks={tasks}
        setTasks={setTasks}
      />
    </div>
  );
}

export default PresetTaskContainer;
