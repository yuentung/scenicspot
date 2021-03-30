import React from 'react';

const SpotItem = ({ spot, lastItemRef, style }) => {
    return (
        <div className="item" style={style} ref={lastItemRef}>
            <div className="content">
                <h2 className="header" style={{ fontSize: '16px' }}>{spot.Name}</h2>
                <div className="description">
                    <p>{spot.Description}</p>
                </div>
            </div>
        </div>
    );
};

export default SpotItem;
