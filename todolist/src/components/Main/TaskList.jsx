import React from 'react';
import PropTypes from 'prop-types';
import TaskItem from './TaskItem';

TaskList.propTypes = {
    tasks : PropTypes.array,
    onGetStatus : PropTypes.func,
};

function TaskList(props) {
  const {tasks, onGetStatus, onGetUpdate, onGetDelete} = props;
  const getStatus = (val) =>{
    onGetStatus(val);
  }
  const onUpdate = (val) =>{
    onGetUpdate(val);
  }
  const onDelete = (val) => {
    onGetDelete(val);
  }
  const listTasks = tasks.map((task, index) => {
      return <TaskItem 
                stt = {index + 1}
                key = {task.id}
                id = {task.id}
                name = {task.name}
                status = {task.status}
                onGetStatus = {getStatus}
                onGetUpdate = {onUpdate}
                onGetDelete = {onDelete}
      />
  
  });  
    return (
        <table className="table">
            <thead>
              <tr>
                <th className="width-10">STT</th>
                <th className="width-50">Tên</th>
                <th className="width-20">Trạng thái</th>
                <th className="width-20">Hành động</th>
              </tr>
            </thead>
            <tbody>
              {listTasks}
            </tbody>
          </table>
    );
}

export default TaskList;