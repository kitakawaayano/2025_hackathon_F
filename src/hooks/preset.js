import postTask from './task';  

const postPreset = async (name, finishtime, tasks, userId) => {
    const response = await fetch('https://two025-hackathon-json.onrender.com/presets', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({
            preset_name: name,
            finish_time: finishtime,
            user_id: userId
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
