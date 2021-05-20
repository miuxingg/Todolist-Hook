import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';


TaskForm.propTypes = {
  onCloseForm : PropTypes.func,
  onTask : PropTypes.func,
  taskUpdate : PropTypes.object
};

function TaskForm(props) {
    const {onCloseForm, onTask, taskUpdate} = props;
    const [task, setTask] = useState({
        id : '',
        name: '',
        status : false,
    });

    useEffect(()=>{
        setTask(taskUpdate);
        
    }, [taskUpdate]);

    const onClear = () => {
      setTask(
        {
          id : '',
          name: '',
          status : false,
        }
      );
      onCloseForm();
    }

    const onChange = (e) =>{

        const target = e.target;
        const name = target.name;
        const value = target.value;
        const updateInput = {...task, [name]:value};
        setTask(updateInput);
        
        
    }
    const onSubmit = (e) =>{
        e.preventDefault();
        onTask(task);
        onClear();
    }
    return (
        <div className="content-left">
        <div className="heading">
          <div className="title">Thêm công việc</div>
          <div className="icon">
            <i className="fas fa-times-circle" onClick = {onClear}/>
          </div>
        </div>
        <form className="form" onSubmit = {onSubmit}>
            <div className="lable">Tên:</div>
            <input type="text" 
                className="input-text width-100" 
                value = {task.name} 
                onChange = {onChange} 
                name = 'name'
                />
          <div className="lable">Trạng thái:</div>
          <select 
                className="selection width-100" 
                name = 'status' 
                onChange = {onChange}
                value = {task.status}
                
            >
            <option value = {true}>Kích hoạt</option>
            <option value = {false}>Ẩn</option>
          </select>
          <input
            type="submit"
            className="submit bg-orange"
            value="Lưu lại"
          />
          <input
            type="button"
            onClick = {onClear}
            className="submit bg-red"
            value="Hủy bỏ"
          />
        </form>
      </div>
    );
}

export default TaskForm;