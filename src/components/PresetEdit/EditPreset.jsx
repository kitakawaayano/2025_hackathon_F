import { ErrorMessage } from '@hookform/error-message';

function Preset({
    name,
    finishtime,
    register,
    errors
}) {
  // console.log(register);
  return (
    <div>
      <div className='input-container'>
        <label htmlFor='preset-name'>
          <span className="material-symbols-outlined">match_case</span>
          プリセット名
          </label>
        <input
          type="text"
          id='preset-name'
          placeholder='プリセット名を入力'
          defaultValue={name}
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
          defaultValue={finishtime}
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
    </div>
  );
}

export default Preset;
