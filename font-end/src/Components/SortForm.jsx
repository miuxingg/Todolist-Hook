import React, { useState } from 'react';


function SortForm(props) {
    const {sortData} = props;
    const [status, setStatus] = useState(false);
    const onHandleClick = (e) => {
        e.preventDefault();
        setStatus(!status);
        sortData(status);
    }
    return (
        <button type="submit" className="btn blue" onClick = {onHandleClick}>Sắp xếp</button>
    );
}

export default SortForm;