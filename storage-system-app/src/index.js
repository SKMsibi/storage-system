import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import RegisterBlocks from './components/register-blocks';
import InsertUniteType from './components/insert-unit-type';
import InsertLocation from './components/insert-location'
import { Provider } from 'react-redux';
import { BrowserRouter as Router, Route } from 'react-router-dom'
import './index.css';
import store from './store';

ReactDOM.render(
    <Provider store={store}>
        <Router>
            <div>
                <Route exact path="/" component={App} />
                <Route exact path="/insertBlocks" component={RegisterBlocks} />
                <Route exact path="/insertUnitType" component={InsertUniteType} />
                <Route exact path="/insertLocation" component={InsertLocation} />
            </div>
        </Router>
    </Provider >, document.getElementById('root'));