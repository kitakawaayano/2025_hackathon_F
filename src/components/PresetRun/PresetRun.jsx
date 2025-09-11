import './PresetRun.css';
import React, { useState, useEffect } from 'react';
import { Link, useParams } from 'react-router-dom';

const getPreset = async (presetId) => { 
    const response = await fetch(`http://localhost:3000/presets/${presetId}`, {
        method: 'GET',
        header: {
            'Content-Type': 'application/json',
        }
    });

    const data = await response.json();
    console.log(data);
    return data;
}

const getTask = async (presetId) => { 
    const response = await fetch('http://localhost:3000/tasks', {
        method: 'GET',
        header: {
            'Content-Type': 'application/json',
        }
    });

    const data = await response.json();
    const filteredData = data.filter(task => task.preset_id === presetId);
    console.log(filteredData);
    return filteredData;
}

function PresetRun({setTaskCount}) {
    const { presetId } = useParams();

    const [preset, setPreset] = useState([]);
    const [tasks, setTasks] = useState([]);
    const [completed, setCompleted] = useState([]);

    const completedToggle = (taskId) => {
      setCompleted(prev => ({
        ...prev,
        [taskId]: !prev[taskId]
      }))
    }

    useEffect(() => {
        getPreset(presetId).then(result => {
          setPreset(result);
        });
        getTask(presetId).then(filteredTask => {
          setTasks(filteredTask);

          const completedInit = {};
          filteredTask.forEach(task => {
            completedInit[task.id] = false;
          });
          setCompleted(completedInit);
          setTaskCount(filteredTask.length);
        });
    }, [presetId]);

    return (
        <>
          <h2 className='page-title'>{preset.preset_name}</h2>
          <ul className='presetRun-task-ul'>
            {tasks.map(task =>
              <li
                onClick={() => completedToggle(task.id)}
                className={completed[task.id] ? "completed" : ""}
                key={task.id}
              >
                <span className={`task-info-box importance-${task.Importance}`}>{task.task_time}</span>
                <span className='task-name'>{task.task_name}</span>
              </li>
            )}
          </ul>
          <div className='button-container'>
            <Link to="/preset-list" className='sub-button'>一覧に戻る</Link>
          </div>
        </>
    );
}


export default PresetRun;
