import { useState } from 'react';

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
                <label>
                    タスク名:
                    <input
                        type="text"
                        value={name}
                        onChange={e => setName(e.target.value)}
                    />
                </label>
                <label>
                    所要時間:
                    <input
                        type="text"
                        value={tasktime}
                        onChange={e => setTasktime(e.target.value)}
                    />
                </label>
                <label>
                    重要度:
                    <select name="importance">
                        <option value="1">1</option>
                        <option value="2">2</option>
                        <option value="3">3</option>
                        <option value="4">4</option>
                    </select>
                </label>
                {/* ↓後でなくなる */}
                <button type="submit" onClick={postTask}>保存</button>
            </form>
        </div>
    )
}


export default Task;
