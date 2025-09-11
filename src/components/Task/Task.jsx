import './Task.css';
import { ErrorMessage } from '@hookform/error-message';

function Task({
    control,
    register,
    errors,
    fields,
    remove
}) {
    return (
        <div>
            <table className='task-table'>
                <thead>
                    <tr>
                        <th>
                            <span>
                                <span className="material-symbols-outlined">check_box</span>
                                タスク名
                            </span>
                        </th>
                        <th>
                            <span>
                                <span className="material-symbols-outlined">timelapse</span>
                                所要時間
                            </span>
                        </th>
                        <th>
                            <span>
                                <span className="material-symbols-outlined">star</span>
                                重要度
                            </span>
                        </th>
                        <th></th>
                    </tr>
                </thead>
                <tbody>
                    {fields.map((field, index) => (
                    <tr key={field.id}>
                        <td className='task-td-widthAuto'>
                            <input
                                type="text"
                                placeholder='タスク名を入力'
                                className={errors.tasks?.[index]?.name ? 'error-input' : ''}
                                {...register(`tasks.${index}.name`, {
                                    required: "タスク名は必須です",
                                    maxLength: {
                                        value: 100,
                                        message: "100文字以内で入力して下さい"
                                    }
                                })}
                            />
                            <ErrorMessage
                                errors={errors}
                                name={`tasks.${index}.name`}
                                render={({ message }) => <p className='error-message'>{message}</p>}
                            />
                        </td>
                        <td className='task-td-width10'>
                            <input
                                type="number"
                                className={errors.tasks?.[index]?.tasktime ? 'error-input' : ''}
                                {...register(`tasks.${index}.tasktime`, {
                                    required: "所要時間は必須です",
                                    min: {
                                        value: 1,
                                        message: "1分以上を入力してください"
                                    },
                                    max: {
                                        value: 1440,
                                        message: "1440分以内で入力してください"
                                    }
                                })}
                            />
                            <ErrorMessage
                                errors={errors}
                                name={`tasks.${index}.tasktime`}
                                render={({ message }) => <p className='error-message'>{message}</p>}
                            />
                        </td>
                        <td className='task-td-width10'>
                            <select
                                className={errors.tasks?.[index]?.importance ? 'error-input' : ''}
                                {...register(`tasks.${index}.importance`, {
                                    required: "重要度は必須です"
                                })}
                            >
                                <option value="1">1</option>
                                <option value="2">2</option>
                                <option value="3">3</option>
                            </select>
                            <ErrorMessage
                                errors={errors}
                                name={`tasks.${index}.importance`}
                                render={({ message }) => <p className='error-message'>{message}</p>}
                            />
                        </td>
                        <td className='task-td-width0'>
                            <button
                                type="button"
                                className='close-button'
                                onClick={() => remove(index)}
                                disabled={fields.length === 1}
                                title={fields.length === 1 ? 'タスクは1つ以上必要です' : ''}
                            >
                                <span className="material-symbols-outlined">close</span>
                            </button>
                        </td>
                    </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
}

export default Task;
