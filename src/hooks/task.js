const postTask = async (tasks, presetid) => {

    const response = await fetch('https://two025-hackathon-json.onrender.com/tasks', {
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
