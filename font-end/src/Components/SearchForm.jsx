import React, { useState } from 'react';
import {debounce} from 'lodash';
function SearchForm(props) {
    const {searchData} = props;
    const [input, setInput] = useState("");
    const onHandleChange = (e) => {
        setInput(e.target.value);
        searchData(input);
    }

    return (
        <input 
            type="text" 
            className="input-text" 
            placeholder="Tên công việc"
            name = "input"
            value = {input}
            onChange = {onHandleChange}
            />
    );
}

export default SearchForm;