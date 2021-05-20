import React, { useState } from 'react';
import PropTypes from 'prop-types';

SortForm.propTypes = {
    onSetSort : PropTypes.bool,
    onGetSort : PropTypes.func,
};

function SortForm(props) {
    const {onGetSort, onSetSort} = props;
    const [status, setStatus] = useState(onSetSort);
    const onHandleClick = (e) => {
        e.preventDefault();
        setStatus(!status);
        onGetSort(status);
    }
    return (
        <div>
            <button className="submit bg-blue posi-parent" onClick = {onHandleClick}>
            <i className="fas fa-plus" /> Sắp xếp
          </button>
        </div>
    );
}

export default SortForm;