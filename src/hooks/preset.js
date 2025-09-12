import postTask from './task';  

const postPreset = async (name, finishtime, tasks) => {

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
    // console.log(data.id);

    tasks.map(task => {
        // console.log(task);
        postTask(task ,data.id);
    })

    return data.id;
}

export default postPreset;
