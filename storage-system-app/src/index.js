import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import RegisterBlocks from './components/register-blocks';
import InsertUnite from './components/insert-unit-type';
import InsertLocation from './components/insert-location';
import viewInfo from "./components/view-info";
import navbar from './components/navbar'
import { Provider } from 'react-redux';
import { BrowserRouter as Router, Route } from 'react-router-dom'
import './index.css';
import store from './redux/store';

ReactDOM.render(
    <Provider store={store}>
        <Router>
            <div>
                <Route path="/" component={navbar} />
                <Route exact path="/" component={App} />
                <Route exact path="/insertBlocks" component={RegisterBlocks} />
                <Route exact path="/insertUnitType" component={InsertUnite} />
                <Route exact path="/insertLocation" component={InsertLocation} />
                <Route exact path="/displayUnits" component={viewInfo} />
            </div>
        </Router>
    </Provider >, document.getElementById('root'));
