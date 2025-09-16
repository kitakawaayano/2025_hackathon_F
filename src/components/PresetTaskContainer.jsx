import { useState } from 'react';
import { useForm, useFieldArray } from 'react-hook-form';
import { useNavigate } from 'react-router-dom';
import { ToastContainer, toast } from 'react-toastify';
import Preset from './Preset';
import Task from './Task/Task';
import postPreset from '../hooks/preset';

function PresetTaskContainer() {
  const {
    register,
    control,
    handleSubmit,
    formState: { errors },
    reset
  } = useForm({
    defaultValues: {
      name: '',
      finish: '',
      tasks: [{ name: '', tasktime: '', importance: '1' }]
    }
  });

  const { fields, append, remove } = useFieldArray({
      control,
      name: 'tasks'
  });

  const navigate = useNavigate();

  const onSubmit = async (data) => {
    try {
      const response = await postPreset(data.name, data.finishtime, data.tasks);
      toast.success(
        <div>
          プリセットを登録しました<br />
          (クリックで開く)
        </div>,
      {
        onClick: () => navigate(`/preset-run/${response}`),
        style: {cursor: 'pointer'}
      });

      reset({
        name: '',
        finishtime: '',
        tasks: [{ name: '', tasktime: '', importance: '1' }]
      });
    } catch (e) {
      toast.error("プリセットの登録に失敗しました");
    }
  };

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
              onClick={() => append({ name: '', tasktime: '', importance: '1' })}
          >
              タスクを追加
          </button>
        </div>
        <div className='button-container'>
          <button type="submit" className='main-button'>プリセットを登録</button>
        </div>
      </form>
      <ToastContainer />
    </>
  );
}

export default PresetTaskContainer;
