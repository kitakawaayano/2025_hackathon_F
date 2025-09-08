const postTask = async (name, tasktime, importance, presetid) => {

    const response = await fetch('http://localhost:3000/tasks', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({
            task_name: name,
            task_time: tasktime,
            Importance: importance,
            presetid: presetid
        }),
    });
    const data = await response.json()
    console.log(data);
}

export default postTask;
