import React, { useState } from 'react';
import { Link } from 'react-router-dom';

const Dropdown = ({ selected, onSelectedChange, options }) => {
    const [open, setOpen] = useState(false);

    const renderOptions = options.map(option => {
        return (
            <Link
                key={option.value}
                className="item"
                to={`/scenicSpot/${option.value}`}
                onClick={() => onSelectedChange(option.label)}
            >
                {option.label}
            </Link>
        );
    });

    return (
        <div className="ui form">
            <div
                className={`ui selection dropdown ${open ? 'visible active' : ''}`}
                onClick={() => setOpen(!open)}
            >
                <i className="dropdown icon"></i>
                <div className="text">{selected}</div>
                <div className={`menu ${open ? 'visible transition' : ''}`}>
                    {renderOptions}
                </div>
            </div>
        </div>
    );
};

export default Dropdown;
