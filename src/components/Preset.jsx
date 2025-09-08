import { useState } from 'react';
import '../App.css';

function Preset() {
    const [name, setName] = useState('');
    const [finishtime, setFinishtime] = useState('');

    const postPreset = async (e) => {
        e.preventDefault();
        setName('');
        setFinishtime('');
        console.log(name);
        console.log(finishtime);

        const response = await fetch('http://localhost:3000/presets', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                preset_name: name,
                finish_time: finishtime
            }),
        });
        const data = await response.json();
        console.log(data);
    }
  return (
    <div>
      <form>
        <div className='input-container'>
          <label htmlFor='preset-name'>プリセット名</label>
          <input
            type="text"
            id='preset-name'
            value={name}
            onChange={e => setName(e.target.value)}
            placeholder='例 : 朝のルーティーン'
          />
        </div>
        <div className='input-container'>
          <label htmlFor='finish-time'>終了目標時刻</label>
          <input
            type="time"
            id='finish-time'
            value={finishtime}
            onChange={e => setFinishtime(e.target.value)}
          />
        </div>
        <div className='button-container'>
          <button type="submit" onClick={postPreset}>登録</button>
        </div>
      </form>
    </div>
  );
}

export default Preset;
