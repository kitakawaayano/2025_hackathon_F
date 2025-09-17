import './PresetList.css';
import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { ToastContainer, toast } from 'react-toastify';
import { useAuth } from '../../contexts/AuthContext';
import SortButton from '../SortButton/SortButton';

const getPreset = async (userId) => { 
    const response = await fetch(`http://localhost:3000/presets${userId ? `?user_id=${userId}` : ''}`, {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json',
        }
    });

    const data = await response.json();
    // console.log(data);
    return data;
}

const getTask = async (userId) => { 
    try {
        // まずユーザーのプリセットIDを取得
        const presetsResponse = await fetch(`http://localhost:3000/presets${userId ? `?user_id=${userId}` : ''}`, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
            }
        });
        const presets = await presetsResponse.json();
        const presetIds = presets.map(preset => preset.id);
        
        // プリセットIDが存在しない場合は空配列を返す
        if (presetIds.length === 0) {
            return [];
        }
        
        // 全てのタスクを取得してユーザーのプリセットに関連するもののみフィルタ
        const tasksResponse = await fetch(`http://localhost:3000/tasks`, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
            }
        });
        const allTasks = await tasksResponse.json();
        
        // ユーザーのプリセットに関連するタスクのみを返す
        return allTasks.filter(task => presetIds.includes(task.preset_id));
    } catch (error) {
        console.error('Error fetching tasks:', error);
        return [];
    }
}



function PresetList() {
    const [data, setData] = useState([]);
    const [tasks, setTasks] = useState([]);
    const [searchKeyword, setSearchKeyword] = useState('');
    const [sortConfig, setSortConfig] = useState({
        key: '',
        order: 'asc'
    });

    const { user } = useAuth(); // 認証コンテキストからユーザー情報を取得

    useEffect(() => {
        if (user) {
            getPreset(user.id).then(result => {
                setData(result);
                // console.log(result);
            });
        } else {
            // ユーザーが未ログインの場合はデータをクリア
            setData([]);
            setTasks([]);
        }
    }, [user]);

    useEffect(() => {
        if (data.length > 0 && user) {
            // ユーザー固有のタスクデータを取得
            getTask(user.id).then(result => {
                setTasks(result);
                // console.log(result);
            });
        }
    }, [data, user]);

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
        // console.log(minute)
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

            // ユーザー固有のデータで更新
            const newData = await getPreset(user.id);
            setData(newData);
        } catch (e) {
            toast.error("プリセットの削除に失敗しました")
        }
    };

    const location = useLocation();

    useEffect(() => {
    if (location.state?.deleted) {
        toast.success('プリセットを削除しました');
        window.history.replaceState({}, document.title);
    }
    }, [location]);

    const handleSearchChange = (event) => {
        setSearchKeyword(event.target.value);
    };

    const handleSort = (key) => {
        // console.log("key : " + key)
        setSortConfig(prev => {
            if (prev.key === key) {
                return {
                    key,
                    order: prev.order === 'asc' ? 'desc' : 'asc'
                };
            } else {
                return {
                    key,
                    order: 'asc'
                };
            }
        });
    };

    const filteredData = data.filter(preset =>
        preset.preset_name.includes(searchKeyword)
    );

    const sortedData = [...filteredData];

    if (sortConfig.key) {
        sortedData.sort((a, b) => {
            const valA = a[sortConfig.key];
            const valB = b[sortConfig.key];

        if(valA < valB) {
            return sortConfig.order === 'asc' ? -1 : 1;
        }
        if(valA > valB) {
            return sortConfig.order === 'asc' ? 1 : -1;
        }
        return 0;
        });
    }

    return (
        <>
        <div className="preset-search-container">
            <span className="material-symbols-outlined">search</span>
            <input
                type="text"
                placeholder="プリセットを検索"
                value={searchKeyword}
                onChange={handleSearchChange}
                className="preset-search-input"
            />
        </div>
        <div className='preset-sortButton-container'>
            <SortButton
                sort='preset_name'
                handleSort={handleSort}
                className={sortConfig.key === 'preset_name' ? 'active-sortButton' : ''}>

                名前順 {sortConfig.key === 'preset_name' && (sortConfig.order === 'asc' ?
                <span className="material-symbols-outlined">keyboard_arrow_up</span> :
                <span className="material-symbols-outlined">keyboard_arrow_down</span>)}
            </SortButton>

            <SortButton
                sort='finish_time'
                handleSort={handleSort}
                className={sortConfig.key === 'finish_time' ? 'active-sortButton' : ''}>


                終了目標時刻順 {sortConfig.key === 'finish_time' && (sortConfig.order === 'asc' ?
                <span className="material-symbols-outlined">keyboard_arrow_up</span> :
                <span className="material-symbols-outlined">keyboard_arrow_down</span>)}
            </SortButton>
        </div>
        <div className='preset-list-container'>
            {sortedData.map(preset =>
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
