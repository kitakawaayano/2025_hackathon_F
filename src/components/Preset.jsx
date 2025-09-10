import '../App.css';
import postPreset from '../hooks/preset';
import { useForm } from 'react-hook-form';
import { ErrorMessage } from '@hookform/error-message';

function Preset({
    name,
    setName,
    finishtime,
    setFinishtime,
    tasks
}) {
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors }
  } = useForm();

  const onSubmit = async (data) => {
    const { name, finishtime } = data;
    await postPreset(name, finishtime, tasks);

    reset();
  };

  return (
    <div>
      <form onSubmit={handleSubmit(onSubmit)}>
        <div className='input-container'>
          <label htmlFor='preset-name'>
            <span className="material-symbols-outlined">match_case</span>
            プリセット名
            </label>
          <input
            type="text"
            id='preset-name'
            placeholder='例 : 朝のルーティーン'
            className={errors.name ? 'error-input' : ''}
            {...register("name", {
              required: "プリセット名は必須です",
              maxLength: {
                value: 50,
                message: "50文字以内で入力して下さい"
              }
            })}
          />
          <ErrorMessage
            errors={errors}
            name='name'
            render={({ message }) => <p className="error-message">{message}</p>}
          />
        </div>
        <div className='input-container'>
          <label htmlFor='finish-time'>
            <span className="material-symbols-outlined">alarm</span>
            終了目標時刻
          </label>
          <input
            type="time"
            id='finish-time'
            className={errors.finishtime ? 'error-input' : ''}
            {...register("finishtime", {
              required: "終了目標時刻を選択して下さい"
            })}
          />
          <ErrorMessage
            errors={errors}
            name='finishtime'
            render={({ message }) => <p className="error-message">{message}</p>}
          />
        </div>
        <div className='button-container'>
          <button type="submit" className='main-button' onClick={handleSubmit}>登録</button>
        </div>
      </form>

    </div>
  );
}

export default Preset;
