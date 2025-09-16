import putTask from './taskPut';  

const putPreset = async (id, name, finishtime, tasks) => {

    const response = await fetch(`http://localhost:3000/presets/${id}`, {

        method: 'PUT',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({
            id: id,
            preset_name: name,
            finish_time: finishtime
        }),
    });

    const data = await response.json();
    // console.log(data);

    tasks.map(task => {
        // console.log(task);
        putTask(task ,data.id);
    })

    return data.id;
}

export default putPreset;
