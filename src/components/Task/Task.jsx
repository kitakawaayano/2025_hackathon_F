import { useState } from 'react';
import './Task.css';

function Task({
  name,
  setName,
  tasktime,
  setTasktime,
  importance,
  setImportance,
}) {
  const handleTaskInput = (e) => {
    e.preventDefault();
  };
    
    return (
        <div>
            <form>
                <table className='task-table'>
                    <thead>
                        <tr>
                            <th>タスク名</th>
                            <th>所要時間</th>
                            <th>重要度</th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr>
                            <td className='task-td-widthAuto'>
                                <input
                                    type="text"
                                    id='task-name'
                                    value={name}
                                    onChange={e => setName(e.target.value)}
                                    placeholder='タスク名'
                                />
                            </td>
                            <td className='task-td-width10'>
                                <input
                                    type="number"
                                    id='task-time'
                                    value={tasktime}
                                    onChange={e => setTasktime(e.target.value)}
                                />
                            </td>
                            <td className='task-td-width10'>
                                <select id="importance" value={importance} onChange={e => setImportance(e.target.value)}>
                                    <option value="1">1</option>
                                    <option value="2">2</option>
                                    <option value="3">3</option>
                                </select>
                            </td>
                            <td className='task-td-width0'>
                                <button className='close-button'>
                                    <span className="material-symbols-outlined">close</span>
                                </button>
                            </td>
                        </tr>
                    </tbody>
                </table>

                <div className='button-container'>
                    <button type="submit" className='sub-button' onClick={handleTaskInput}>追加</button>
                </div>
            </form>
        </div>
    )
}


export default Task;
