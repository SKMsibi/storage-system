import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import RegisterBlocks from './components/register-blocks';
import InsertUnit from './components/insert-unit';
import InsertLocation from './components/insert-location';
import viewInfo from "./components/view-info";
import RegisterBusiness from './components/register-business';
import LogIn from './components/log-in'
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
                <Route exact path="/insertUnitType" component={InsertUnit} />
                <Route exact path="/insertLocation" component={InsertLocation} />
                <Route exact path="/displayUnits" component={viewInfo} />
                <Route exact path="/registerBusiness" component={RegisterBusiness} />
                <Route exact path="/logIn" component={LogIn} />
            </div>
        </Router>
    </Provider >, document.getElementById('root'));
