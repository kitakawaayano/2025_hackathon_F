import './Task.css';

function Task({
    tasks,
    setTasks
}) {
    // console.log(tasks);

    const handleTaskChange = (index, field, value) => {
        const updatedTasks = [...tasks];
        updatedTasks[index][field] = value;
        setTasks(updatedTasks);
    };

    const handleAddTask = (e) => {
        e.preventDefault();
        setTasks([...tasks, { name: '', tasktime: 1, importance: '1' }]);
    };

    const handleRemoveTask = (index) => {
        const updatedTasks = tasks.filter((_, i) => i !== index);
        setTasks(updatedTasks);
    };

    return (
        <div>
            <form>
                <table className='task-table'>
                    <thead>
                        <tr>
                            <th>
                                <span>
                                    <span className="material-symbols-outlined">checklist</span>
                                    タスク名
                                </span>
                            </th>
                            <th>
                                <span>
                                    <span className="material-symbols-outlined">timelapse</span>
                                    所要時間
                                </span>
                            </th>
                            <th>
                                <span>
                                    <span className="material-symbols-outlined">star</span>
                                    重要度
                                </span>
                            </th>
                            <th></th>
                        </tr>
                    </thead>
                    <tbody>
                        {tasks.map((task, index) => (
                        <tr key={index}>
                            <td className='task-td-widthAuto'>
                                <input
                                    type="text"
                                    value={task.name}
                                    onChange={e => handleTaskChange(index, 'name', e.target.value)}
                                    placeholder='タスク名'
                                />
                            </td>
                            <td className='task-td-width10'>
                                <input
                                    type="number"
                                    min={1}
                                    max={1440}
                                    value={task.tasktime}
                                    onChange={e => handleTaskChange(index, 'tasktime', e.target.value)}
                                />
                            </td>
                            <td className='task-td-width10'>
                                <select
                                    value={task.importance}
                                    onChange={e => handleTaskChange(index, 'importance', e.target.value)}
                                >
                                    <option value="1">1</option>
                                    <option value="2">2</option>
                                    <option value="3">3</option>
                                </select>
                            </td>
                            <td className='task-td-width0'>
                                <button
                                    type="button"
                                    className='close-button'
                                    onClick={() => handleRemoveTask(index)}
                                    disabled={tasks.length === 1}
                                >
                                    <span className="material-symbols-outlined">close</span>
                                </button>
                            </td>
                        </tr>
                        ))}
                    </tbody>
                </table>

                <div className='button-container'>
                    <button type="submit" className='sub-button' onClick={handleAddTask}>
                        追加
                    </button>
                </div>
            </form>
        </div>
    );
}

export default Task;
