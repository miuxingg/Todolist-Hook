import React from 'react';

function OpenTask(props) {
    const {openTaskForm} = props;
    const onHandleClick = (e) => {
        e.preventDefault();
        openTaskForm();
    }
    return (
        <div className="open-form">
            <button type="submit" className="btn btn-open" onClick = {onHandleClick}>Thêm công việc</button>
        </div>
    );
}

export default OpenTask;