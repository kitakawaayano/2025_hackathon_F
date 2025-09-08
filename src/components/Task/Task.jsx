import { useState } from 'react';
import './Task.css';

function Task() {
    const [name, setName] = useState('');
    const [tasktime, setTasktime] = useState('');
    const [importance, setImportance] = useState('');

    const postTask = async (e) => {
        e.preventDefault();
        setName('');
        setTasktime('');
        setImportance('');

        const response = await fetch('http://localhost:3000/tasks', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                task_name: name,
                task_time: tasktime,
                Importance: importance
            }),
        });
        const data = await response.json()
        console.log(data);
    }
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
                                <option value="4">4</option>
                            </select>
                        </div>
                    </div>
                </div>

                {/* ↓後でなくなる */}
                <div className='button-container'>
                    <button type="submit" onClick={postTask}>保存</button>
                </div>
            </form>
        </div>
    )
}


export default Task;
