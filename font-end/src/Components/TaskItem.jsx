import React from 'react';

function TaskItem(props) {
    const {task, index, updateStatusItem, updateTaskItem, deleteTaskItem} = props;

    const onUpdateStatus = (e) => {
        e.preventDefault();
        updateStatusItem(task._id);
    }

    const onUpdateTask = (e) => {
        e.preventDefault();
        updateTaskItem(task._id);
    }
    const onDeleteTask = (e) => {
        e.preventDefault();
        deleteTaskItem(task._id);
    }
    return (
        <tbody>
            <tr>
                <td>{index}</td>
                <td>{task.task}</td>
                <td 
                    className = {
                        task.status 
                        ?   "active"
                        :   "not-active"
                    }
                >
                    <span onClick = {onUpdateStatus} className = "cursor">{task.status ? "Kích hoạt" : "Ẩn"}</span>
                </td>
                <td>
                    <button type="submit" className="btn green" onClick = {onUpdateTask}>Sửa</button>
                    <button type="submit" className="btn red" onClick = {onDeleteTask}>Xóa</button>
                </td>
            </tr>
        </tbody>
    );
}

export default TaskItem;