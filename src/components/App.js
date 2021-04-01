import React from 'react';
import { BrowserRouter, Route } from 'react-router-dom';
import Dropdown from './Dropdown';
import SpotList from './SpotList';

const App = () => {
    return (
        <div className="ui container" style={{ padding: '15px 0' }}>
            <BrowserRouter>
                <React.Fragment>
                    <Dropdown />
                    <Route path={["/scenicSpot", "/scenicSpot/:city"]} exact component={SpotList} />
                </React.Fragment>
            </BrowserRouter>
        </div>
    );
};

export default App;
