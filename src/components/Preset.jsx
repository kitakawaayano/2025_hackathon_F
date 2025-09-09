import '../App.css';
import postPreset from '../hooks/preset';


function Preset({
    name,
    setName,
    finishtime,
    setFinishtime,
    taskname,
    tasktime,
    importance
}) {
    const handleSubmit = async (e) => {
    e.preventDefault();
    setName('');
    setFinishtime('');
    await postPreset(name, finishtime, taskname, tasktime, importance);
  };
  
  return (
    <div>
      <form>
        <div className='input-container'>
          <label htmlFor='preset-name'>
            <span className="material-symbols-outlined">match_case</span>
            プリセット名
            </label>
          <input
            type="text"
            id='preset-name'
            value={name}
            onChange={e => setName(e.target.value)}
            placeholder='例 : 朝のルーティーン'
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
            value={finishtime}
            onChange={e => setFinishtime(e.target.value)}
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
