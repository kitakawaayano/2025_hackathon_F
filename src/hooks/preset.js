import postTask from './task';  

const postPreset = async (name, finishtime, tasks, userId) => {
    // const response = await fetch('http://localhost:3000/presets', {
    const response = await fetch('https://2025-hackathon-f-json.vercel.app/presets', {
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
