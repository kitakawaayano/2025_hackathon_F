import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import Preset from './EditPreset';
import { useForm, useFieldArray } from 'react-hook-form';
import Task from './EditTask';
import { ToastContainer, toast } from 'react-toastify';
import { useNavigate } from 'react-router-dom';
import putPreset from '../../hooks/presetPut';
import './PresetEdit.css';

function PresetEdit() {
    const navigate = useNavigate();
    const [id, setId] = useState(0);

    const {
        register,
        control,
        handleSubmit,
        formState: { errors },
        reset,
    } = useForm({
        defaultValues: {
            name: '',
            finishtime: '',
            tasks: []
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
            setId(id);
        }
    }, []);

    useEffect(() => {
        if (id > 0) {
            const fetchData = async () => {
                const presetResponse = await fetch(`http://localhost:3000/presets/${id}`);
                const presetData = await presetResponse.json();

                const tasksResponse = await fetch(`http://localhost:3000/tasks?preset_id=${id}`);
                const tasksData = await tasksResponse.json();

                reset({
                    name: presetData.preset_name,
                    finishtime: presetData.finish_time,
                    tasks: tasksData.map(task => ({
                        id: task.id,
                        name: task.task_name,
                        tasktime: Number(task.task_time),
                        importance: Number(task.Importance)
                    }))
                });
            };

            fetchData();
        }
    }, [id, reset]);

    const onSubmit = async (data) => {
        const tasks = data.tasks.map(task => ({
            ...task,
            tasktime: Number(task.tasktime),
            importance: Number(task.importance)
        }));
        try {
            const response = await putPreset(id, data.name, data.finishtime, tasks);
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
                    register={register}
                    errors={errors}
                />
                <Task
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

            </form>
            <ToastContainer />
        </>
    );
}

export default PresetEdit;

