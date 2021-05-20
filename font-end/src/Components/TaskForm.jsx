import React, { useEffect, useState } from 'react';


function TaskForm(props) {
    const {closeForm, taskUpdate, setData} = props;
    const [task, setTask] = useState({
        task : "",
        status: false,
    });
    const [taskDefault] = useState({
        task : "",
        status: false,
    });
    useEffect(() => {
        setTask(taskUpdate);
    }, [taskUpdate]);
    const onCloseForm = (e) => {
        e.preventDefault();
        setTask(taskDefault);
        closeForm();
    }
    const onHandleChange = (e) => {
        setTask({...task, [e.target.name] : e.target.value});
    }

    const onSubmitHandle = (e) => {
        e.preventDefault();
        setData(task);
        closeForm();
    }
    return (
        <div>
            <div className="task-form">
                <div className="task-header">
                    <span className="task-name">Thêm công việc</span>
                    <i className="far fa-times-circle cursor" onClick = {onCloseForm}></i>
                </div>
                <div className="task-input">
                    <form onSubmit = {onSubmitHandle}>
                        <span>Tên công việc</span>
                        <input 
                            type="text" 
                            className="input-text" 
                            placeholder="Tên công việc"
                            name = "task"
                            value = {task.task}
                            onChange = {onHandleChange}
                            />
                        <span>Trạng thái</span>
                        <select 
                            className="input-text"
                            name = "status"
                            value = {task.status}
                            onChange = {onHandleChange}
                            >
                            <option value = {false}>Ẩn</option>
                            <option value = {true}>Kích hoạt</option>
                        </select>
                        <button type="submit" className="btn green">Cập nhật</button>
                        <button type="submit" className="btn red" onClick = {onCloseForm}>Hủy bỏ</button>
                    </form>
                </div>
            </div>
            <div className="clear-both"></div>
        </div>
    );
}

export default TaskForm;