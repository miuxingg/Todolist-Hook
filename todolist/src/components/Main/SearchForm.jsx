import React, { useState } from 'react';
import PropTypes from 'prop-types';

SearchForm.propTypes = {
    onGetSearch: PropTypes.func,
};

function SearchForm(props) {
    const {onGetSearch} = props;
    const [searchValue, setSearchValue] = useState('');
    const onHandleChange = (e) => {
        const target = e.target;
        const value = target.value;
        //const name = target.name;
        setSearchValue(value);
        
  }
    const onHandleClick = (e) =>{
        e.preventDefault();
        onGetSearch(searchValue);
    }
    return (
        <div>
            <input
            type="text"
            className="input-text width-60"
            placeholder="Nhập từ khóa..."
            value = {searchValue}
            onChange = {onHandleChange}
          />
          <button className="submit bg-blue " onClick = {onHandleClick}>
            <i className="fas fa-plus" /> Tìm
          </button>
        </div>
    );
}

export default SearchForm;