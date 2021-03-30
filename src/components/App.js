import React from 'react';
import { BrowserRouter, Route } from 'react-router-dom';
import Header from './Header';
import SpotList from './SpotList';

const App = () => {
    return (
        <div className="ui container">
            <BrowserRouter>
                <React.Fragment>
                    <Header />
                    <Route path="/scenicSpot" exact component={SpotList} />
                    <Route path="/scenicSpot/:city" exact component={SpotList} />
                </React.Fragment>
            </BrowserRouter>
        </div>
    );
};

export default App;
