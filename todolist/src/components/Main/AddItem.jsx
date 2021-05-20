import React from 'react';
import PropTypes from 'prop-types';

AddItem.propTypes = {
    display : PropTypes.bool,
    onDisplay : PropTypes.func
};



function AddItem(props) {
    const {display, onDisplay} = props;
    const handleDisplay = () => {
        onDisplay(!display);
    };



    return (
        <button
          className="submit bg-blue mg-0 pd-0 btn-add"
          onClick={handleDisplay}
        >
          <i className="fas fa-plus" />
          Thêm công việc
        </button>
    );
}

export default AddItem;