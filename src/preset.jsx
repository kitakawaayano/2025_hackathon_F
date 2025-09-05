import { useState } from 'react';

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
        <label>
          Preset Name:
          <input
            type="text"
            value={name}
            onChange={e => setName(e.target.value)}
          />
        </label>
        <label>
          Finish Time:
          <input
            type="time"
            value={finishtime}
            onChange={e => setFinishtime(e.target.value)}
          />
        </label>
        <button type="submit" onClick={postPreset}>Save</button>
      </form>
    </div>
  );
}

export default Preset;
