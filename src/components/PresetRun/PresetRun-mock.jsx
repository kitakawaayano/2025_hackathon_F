import './PresetRun.css';
import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';

function PresetRun() {
    const [completed, setCompleted] = useState(false);

    const completedToggle = () => {
      setCompleted(!completed)
    }

    return (
        <>
          <h2 className='page-title'>プリセット名</h2>
          <ul className='presetRun-task-ul'>
            <li onClick={completedToggle} className={completed ? "completed" : ""}>
              <span className='task-info-box importance-1'>1</span>
              <span className='task-name'>1分で終わる優先度1のタスク</span>
            </li>
            <li onClick={completedToggle} className={completed ? "completed" : ""}>
              <span className='task-info-box importance-2'>3</span>
              <span className='task-name'>3分で終わる優先度2のタスク</span>
            </li>
            <li onClick={completedToggle} className={completed ? "completed" : ""}>
              <span className='task-info-box importance-3'>5</span>
              <span className='task-name'>5分で終わる優先度3のタスク</span>
            </li>
          </ul>
          <div className='button-container'>
            <Link to="/preset-list" className='sub-button'>一覧に戻る</Link>
          </div>
        </>
    );
}


export default PresetRun;
