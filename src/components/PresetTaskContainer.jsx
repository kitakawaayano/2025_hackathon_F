import { useState } from 'react';
import Preset from './Preset';
import Task from './Task';

function PresetTaskContainer() {
  const [presetName, setPresetName] = useState('');
  const [finishTime, setFinishTime] = useState('');
  const [taskName, setTaskName] = useState('');
  const [taskTime, setTaskTime] = useState('');
  const [importance, setImportance] = useState('');
  const [presetId, setPresetId] = useState('');
  return (
    <div>
      <Preset
        name={presetName}
        setName={setPresetName}
        finishtime={finishTime}
        setFinishtime={setFinishTime}
        taskname={taskName}
        tasktime={taskTime}
        importance={importance}
      />
      <Task
        name={taskName}
        setName={setTaskName}
        tasktime={taskTime}
        setTasktime={setTaskTime}
        importance={importance}
        setImportance={setImportance}
        presetid={presetId}
        setPresetId={setPresetId}
      />
    </div>
  );
}

export default PresetTaskContainer;
