import React from 'react';

import './search-panel.scss';

function SearchPanel ({ onSearchChange }) {
    return (
        <div className='search-panel'>
            <input type="text"
                placeholder='search'
                className="form-control search-input"
                onChange={onSearchChange}/>
        </div>
    )
};

export default SearchPanel;