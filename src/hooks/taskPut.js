import postTask from './task';  

const putTask = async (tasks, presetid) => {

    const response = await fetch(`http://localhost:3000/tasks/${tasks.id}`, {
        method: 'PUT',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({
            id: tasks.id,
            task_name: tasks.name,
            task_time: tasks.tasktime,
            Importance: tasks.importance,
            preset_id: presetid
        }),
    });
    if (tasks.id){
        // console.log("idあり");
        const data = await response.json();
        console.log(data);
    } else {
        // console.log("idなし");
        postTask(tasks, presetid);
    }

}

export default putTask;
