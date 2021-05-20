import React from 'react';  
import TaskItem from './TaskItem';

function TaskList(props) {
    const {tasks , updateStatus, onUpdateTask, onDeleteTask} = props;
    const updateStatusItem = (id) => {
        updateStatus(id);
    }
    const updateTaskItem = (id) => {
        onUpdateTask(id);
    }
    const deleteTaskItem = (id) => {
        onDeleteTask(id);
    }
    const taskItem = tasks.map((task, index) => {
        return (
            <TaskItem 
                key = {task._id}
                task = {task}
                index = {index + 1}
                updateStatusItem = {updateStatusItem}
                updateTaskItem = {updateTaskItem}
                deleteTaskItem = {deleteTaskItem}
            />
        )
    });
    return (
        <table  className = "tb-list"  
        >
            <thead>
                <tr>
                    <td className="col-1">STT</td>
                    <td className="col-2">Tên công việc</td>
                    <td className="col-3">Trạng thái</td>
                    <td className="col-4">Chức năng</td>
                </tr>
            </thead>
            {taskItem}
        </table>
    );
}

export default TaskList;