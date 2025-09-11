import './PresetList.css';
import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { ToastContainer, toast } from 'react-toastify';

const getPreset = async () => { 
    const response = await fetch('http://localhost:3000/presets', {
        method: 'GET',
        header: {
            'Content-Type': 'application/json',
        }
    });

    const data = await response.json();
    // console.log(data);
    return data;
}

const getTask = async () => { 
    const response = await fetch('http://localhost:3000/tasks', {
        method: 'GET',
        header: {
            'Content-Type': 'application/json',
        }
    });

    const data = await response.json();
    // console.log(data);
    return data;
}



function PresetList() {
    const [data, setData] = useState([]);
    const [tasks, setTasks] = useState([]);


    useEffect(() => {
        getPreset().then(result => {
            setData(result);
            // console.log(result);
        });
    }, []);

    useEffect(() => {
        if (data.length > 0) {
            data.map(count => {
                getTask(count).then(result => {
                    setTasks(result);
                    // console.log(result);
                });
            });
        }
    }, [data]);

    // console.log(tasks);

    function taskCount(id){
        return tasks.filter(task => task.preset_id === id).length;
    }

    function taskMinute(id){
        let minute = 0;
        tasks.map(task =>{
            if (id == task.preset_id){
                minute+=parseInt(task.task_time);

            }
        })
        console.log(minute)
        return minute;
    }

    const deletePreset = async (id) => {
        const ok = window.confirm('本当に削除しますか？');
        if (!ok) {
            return;
        }

        try {
            const relatedTasks = tasks.filter(task => task.preset_id === id);
            for (const task of relatedTasks) {
                await fetch(`http://localhost:3000/tasks/${task.id}`, {
                    method: 'DELETE'
                });
            }

            await fetch(`http://localhost:3000/presets/${id}`, {
                method: 'DELETE'
            });
            toast.success("プリセットを削除しました");

            const newData = await getPreset();
            setData(newData);
        } catch (e) {
            toast.error("プリセットの削除に失敗しました")
        }
    };

    return (
        <>
        <div className='preset-list-container'>
            {data.map(preset =>
                <div key={preset.id} className='preset-list-item'>
                    <Link to={`/preset-run/${preset.id}`} className='no-textDecoration'>
                        <h3 className='preset-name'>
                            {preset.preset_name}
                        </h3>
                        <ul className='preset-info-ul'>
                            <li>
                                <span className='preset-info-item'>
                                    <span className="material-symbols-outlined">alarm</span>
                                    <span>{preset.finish_time}</span>
                                </span>
                            </li>
                            <li>
                                <span className='preset-info-item'>
                                    <span className="material-symbols-outlined">check_box</span>
                                    <span>{taskCount(preset.id)}</span>
                                    <span className='preset-info-smallText'>個</span>
                                </span>
                            </li>
                            <li>
                                <span className="preset-info-item">
                                    <span className="material-symbols-outlined">timelapse</span>
                                    <span>{taskMinute(preset.id)}</span>
                                    <span className='preset-info-smallText'>分</span>
                                </span>
                            </li>
                        </ul>
                    </Link>
                    <button onClick={() => deletePreset(preset.id)} className='preset-list-deleteButton' title='このプリセットを削除する'>
                        <span className="material-symbols-outlined">delete</span>
                    </button>
                </div>
                )}
            </div>
            <ToastContainer />
        </>
    );
}


export default PresetList;
