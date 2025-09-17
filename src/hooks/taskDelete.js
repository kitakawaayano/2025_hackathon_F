const deleteTask = async (taskId) => {
    try {
        // const response = await fetch(`https://2025-hackathon-f-json.vercel.app/tasks/${taskId}`, {
        const response = await fetch(`http://localhost:3000/tasks/${taskId}`, {  // 後で戻す
            method: 'DELETE',
            headers: {
                'Content-Type': 'application/json',
            }
        });

        if (!response.ok) {
            throw new Error(`タスクの削除に失敗しました: ${response.status}`);
        }

        console.log(`削除されたタスクID: ${taskId}`);
        return true;
    } catch (error) {
        console.error('タスク削除エラー:', error);
        throw error;
    }
};

const deleteMultipleTasks = async (taskIds) => {
    try {
        const deletePromises = taskIds.map(taskId => deleteTask(taskId));
        await Promise.all(deletePromises);
        console.log(`削除されたタスク数: ${taskIds.length}`);
        return true;
    } catch (error) {
        console.error('複数タスク削除エラー:', error);
        throw error;
    }
};

export { deleteTask, deleteMultipleTasks };
export default deleteTask;
