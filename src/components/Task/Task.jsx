import { useState } from 'react';
import '../App.css';
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
                <div className='input-container'>
                    <div className='task-row'>
                        <div>
                            <label htmlFor='task-name'>タスク名</label>
                            <input
                                type="text"
                                id='task-name'
                                value={name}
                                onChange={e => setName(e.target.value)}
                                placeholder='タスク名'
                            />
                        </div>

                        <div>
                            <label htmlFor='task-time'>所要時間</label>
                            <input
                                type="number"
                                id='task-time'
                                value={tasktime}
                                onChange={e => setTasktime(e.target.value)}
                                />
                        </div>

                        <div>
                            <label htmlFor='importance'>重要度</label>
                            <select id="importance" value={importance} onChange={e => setImportance(e.target.value)}>
                                <option value="1">1</option>
                                <option value="2">2</option>
                                <option value="3">3</option>
                            </select>
                        </div>
                    </div>
                </div>

                <div className='button-container'>
                    <button type="submit" onClick={handleTaskInput}>追加</button>
                </div>
            </form>
        </div>
    )
}


export default Task;
