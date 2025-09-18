const postTask = async (tasks, presetid) => {

    // const response = await fetch('http://localhost:3000/tasks', {
        const response = await fetch('https://2025-hackathon-f-json.vercel.app/tasks', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({
            task_name: tasks.name,
            task_time: tasks.tasktime,
            Importance: tasks.importance,
            preset_id: presetid
        }),
    });
    const data = await response.json()

    console.log(data);
}

export default postTask;
