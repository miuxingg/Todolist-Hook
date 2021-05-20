import React from 'react';
function PaginationItem(props) {
    const {pageIndex, isChecked, getPageIndex} = props;
    const onHandleClick = () => {
        getPageIndex(pageIndex);
    }
    return (
        <li 
            className = {isChecked ? "not-active" : ""}
            onClick = {onHandleClick}
        >{pageIndex}</li>
    );
}

export default PaginationItem;