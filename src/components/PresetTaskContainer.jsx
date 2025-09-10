import { useState } from 'react';
import { useForm, useFieldArray } from 'react-hook-form';
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

  const onSubmit = async (data) => {
    try {
      await postPreset(data.name, data.finishtime, data.tasks);
      reset({
        name: '',
        finishtime: '',
        tasks: [{ name: '', tasktime: '', importance: '1' }]
      });
    } catch (e) {
      console.error("登録に失敗", error);
    }
  };

  return (
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
        <button type="submit" className='main-button'>プリセットを登録</button>
      </div>
    </form>
  );
}

export default PresetTaskContainer;
