import './PresetList.css';
import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';

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
        let cnt = 0;
        tasks.map(task =>{
            if (id == task.preset_id){
                cnt++;
            }
        })
        return cnt;
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

    return (
        <>
        <div className='preset-list-container'>
            {data.map(preset => 
                <Link
                    to={`/preset-run/${preset.id}`}
                    key={preset.id}
                    className='preset-list-item'
                >
                    <h3 className='preset-name' key={preset.id}>
                        {preset.preset_name}
                    </h3>
                    <ul className='preset-info-ul'>
                        <li>

                            <span className='preset-info-item'>
                                <span className="material-symbols-outlined">alarm</span>
                                    <span key={preset.id}>{preset.finish_time}</span>
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
                )}
            </div>
        </>
    );
}


export default PresetList;
