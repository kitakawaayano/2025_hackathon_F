import postTask from './task';  

const postPreset = async (name, finishtime, taskname, tasktime, importance) => {

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
    console.log(data.id);

    postTask(taskname, tasktime, importance,data.id);

}

export default postPreset;
