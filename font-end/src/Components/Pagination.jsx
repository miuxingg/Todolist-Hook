import React, { useState } from 'react';
import PaginationItem from './PaginationItem';


function Pagination(props) {
    const {pagination, getPagination, total_task} = props;
    const [pagi, setPagi] = useState(pagination);
    const element = [];
    const getPageIndex = (index) => {
        setPagi({...pagi, page: index});
        getPagination(pagi);
    }
    for(let i = 1; i <= Math.ceil(total_task/pagi.limit); i++){
        element.push(
            <PaginationItem 
                key = {i}
                pageIndex = {i}
                isChecked = {i === pagi.page ? true : false}
                getPageIndex = {getPageIndex}
                ></PaginationItem>
        );
    }
    const onHandlePre = () => {
        if(pagi.page > 1) {
            setPagi({...pagi, page : pagi.page - 1});
            getPagination(pagi);
        }
    };
    const onHandleNext = () => {
        if(pagi.page < Math.ceil(total_task/pagi.limit)) 
        {
            setPagi({...pagi, page : pagi.page + 1});
            getPagination(pagi);
        }
    }
    return (
            <ul className = "pagination">
                <li className = {(pagi.page <= 1 ? "enable" : "")} onClick = {onHandlePre}>Pre</li>
                {element}
                <li className = {(pagi.page >= (Math.ceil(total_task/pagi.limit) ) ? "enable" : "")} onClick = {onHandleNext}>Next</li>
            </ul>
    );
}

export default React.memo(Pagination) ;