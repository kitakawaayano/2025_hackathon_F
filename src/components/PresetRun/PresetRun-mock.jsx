import './PresetRun.css';
import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';

function PresetRun() {
    return (
        <>
          <h2 className='page-title'>プリセット名</h2>
          <ul className='presetRun-task-ul'>
            <li>
              <span className='task-info-box importance-1'>1</span>
              <span className='task-name'>1分で終わる優先度1のタスク</span>
            </li>
            <li>
              <span className='task-info-box importance-2'>3</span>
              <span className='task-name'>3分で終わる優先度2のタスク</span>
            </li>
            <li>
              <span className='task-info-box importance-3'>5</span>
              <span className='task-name'>5分で終わる優先度3のタスク</span>
            </li>
            <li className='completed'>
              <span className='task-info-box importance-3'>7</span>
              <span className='task-name'>7分で終わる優先度3のタスク(完了)</span>
            </li>
          </ul>
          <div className='button-container'>
            <Link to="/preset-list" className='sub-button'>一覧に戻る</Link>
          </div>
        </>
    );
}


export default PresetRun;
