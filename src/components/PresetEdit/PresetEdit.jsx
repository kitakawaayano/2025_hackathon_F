import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import Preset from './EditPreset';
import { useForm, useFieldArray } from 'react-hook-form';
import Task from './EditTask';
import { ToastContainer, toast } from 'react-toastify';
import { useNavigate } from 'react-router-dom';
import putPreset from '../../hooks/presetPut';

function PresetRun() {
    const navigate = useNavigate();
    const [id, setId] = useState(0);
    const [name, setName] = useState([]);
    const [finishtime, setfinishtime] = useState([]);
    const [importance, setImportance] = useState([1]);

    const {
        register,
        control,
        handleSubmit,
        formState: { errors },
        tasks,
    } = useForm({
        defaultState: {
            name: '',
            finish: '',
            tasks: [{ id: id, name: name, tasktime: finishtime, importance: importance }]
        }
    });
    
    const { fields, append, remove } = useFieldArray({
        control,
        name: 'tasks'
    });



    useEffect(() => {
        let urlStr = window.location.href;
        let url = new URL(urlStr).pathname;
        setId(url.split('/').pop());
        if (id > 0) {
            getPreset(id);
        }
    }, [id]);

    const getPreset = async (id) => {
        const response = await fetch(`http://localhost:3000/presets/${id}`, {
            method: 'GET',
            header: {
                'Content-Type': 'application/json',
            }
        });

        const data = await response.json();
        setName(data.preset_name);
        setfinishtime(data.finish_time);
        return data;
    }

    const getTask = async (presetId) => {
        const response = await fetch(`http://localhost:3000/tasks?preset_id=${presetId}`, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
            }
        });

        const data = await response.json();
        // console.log(data);
        return data;
    }

    useEffect(() => {
        if (id > 0) {
            getTask(id).then(tasks => {
                tasks.map(task => {
                    append({ id: task.id, name: task.task_name, tasktime: task.task_time, importance: task.Importance });
                });
            });
        }
    }, [id]);

    const onSubmit = async (data) => {
        
        try {
            const response = await putPreset(id, data.name, data.finishtime, data.tasks);
            console.log(response);
            
            toast.success(
                <div>
                    プリセットを更新しました<br />
                    (クリックで開く)
                </div>,
                {
                    onClick: () => navigate(`/preset-run/${id}`),
                    style: { cursor: 'pointer' }
                }
            );

        } catch (error) {
            console.error(error);
        }
    }

    return (
        <>
            <form onSubmit={handleSubmit(onSubmit)}>
                <Preset
                    name={name}
                    finishtime={finishtime}
                    register={register}
                    errors={errors}
                />
                <Task
                    tasks={tasks}
                    control={control}
                    register={register}
                    errors={errors}
                    fields={fields}
                    remove={remove}
                />

                <div className='button-container'>
                    <button
                        type="button"
                        className='sub-button'
                        onClick={() => append({ id: '', name: '', tasktime: '', importance: '1' })}
                    >
                        タスクを追加
                    </button>
                    <button type="submit" className='main-button'>プリセットを更新</button>
                </div>

                <div className='button-container'>
                    <Link to="/preset-list" className='sub-button'>一覧に戻る</Link>
                </div>
            </form>
            <ToastContainer />
        </>
    );
}


export default PresetRun;

// プリセット名と終了目標時刻がデフォルトの値から変化してないとき、エラーが出ないようにする。
// 更新した時に出る謎のエラー（Failed to load resource: the server responded with a status of 404 (Not Found)）を解決
// 所要時間等が文字列で登録されるのを解決する
