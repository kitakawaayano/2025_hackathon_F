import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import Preset from './EditPreset';
import { useForm, useFieldArray } from 'react-hook-form';
import Task from './EditTask';
import { ToastContainer, toast } from 'react-toastify';
import { useNavigate } from 'react-router-dom';
import putPreset from '../../hooks/presetPut';
import { deleteMultipleTasks } from '../../hooks/taskDelete';

function PresetEdit() {
    const navigate = useNavigate();
    const [id, setId] = useState(0);
    const [originalTaskIds, setOriginalTaskIds] = useState([]); // 元のタスクIDを保持

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
        if (id) {
            setId(id);
        }
        document.title = 'プリセット編集 | Fu-Dandori';
    }, []);

    useEffect(() => {
        if (id) {
            const fetchData = async () => {
                // const presetResponse = await fetch(`http://localhost:3000/presets/${id}`);
                const presetResponse = await fetch(`https://2025-hackathon-f-json.vercel.app/presets/${id}`);
                const presetData = await presetResponse.json();

                // const tasksResponse = await fetch(`http://localhost:3000/tasks?preset_id=${id}`);
                const tasksResponse = await fetch(`https://2025-hackathon-f-json.vercel.app/tasks?preset_id=${id}`);
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

                // 元のタスクIDを保存
                setOriginalTaskIds(tasksData.map(task => task.id));
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

        // 現在のタスクIDを取得
        const currentTaskIds = tasks.filter(task => task.id).map(task => task.id);
        
        // 削除されたタスクIDを特定
        const deletedTaskIds = originalTaskIds.filter(id => !currentTaskIds.includes(id));

        try {
            // 削除されたタスクをデータベースから削除
            if (deletedTaskIds.length > 0) {
                await deleteMultipleTasks(deletedTaskIds);
                console.log(`${deletedTaskIds.length}個のタスクを削除しました`);
            }

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
            toast.error("プリセットの更新に失敗しました");
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
                </div>

                <div className='button-container'>
                    <Link to={`/preset-run/${id}`} className='sub-button'>実行画面に戻る</Link>
                    <button type="submit" className='main-button'>プリセットを更新</button>
                </div>

            </form>
            <ToastContainer />
        </>
    );
}

export default PresetEdit;

