import React, { useState } from 'react';
import PropTypes from 'prop-types';

TaskItem.propTypes = {
    name : PropTypes.string,
    status : PropTypes.bool,
    id : PropTypes.string,
    onGetStatus : PropTypes.func,
    onUpdate : PropTypes.func,
    onGetDelete : PropTypes.func,
};

function TaskItem(props) {
    const {stt, name, status, id, onGetStatus, onGetUpdate, onGetDelete} = props;
    const [_id] = useState(id);

    const onHandleClick = () =>{
      onGetStatus(_id);
    }

    const onClickUpdate = () =>{
        onGetUpdate(_id);
    }

    const onClickRemove = () => {
        onGetDelete(_id);
    }

    return (
        <tr className="row">
                <td>{stt}</td>
                <td>{name}</td>
                <td 
                  className = {status ? 'color-green' : 'color-red'}
                  onClick = {onHandleClick}
                  >{status ? 'Active' : 'None'}
                  </td>
                <td>
                  <input
                    type="submit"
                    className="submit bg-orange mg-0"
                    value="Sửa"
                    onClick = {onClickUpdate}
                  />
                  <input
                    type="submit"
                    className="submit bg-red mg-0"
                    value="Xóa"
                    onClick = {onClickRemove}
                  />
                </td>
              </tr>
    );
}

export default TaskItem;