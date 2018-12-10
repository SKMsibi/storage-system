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
import { BrowserRouter as Router, Route, Redirect } from 'react-router-dom'
import axios from 'axios';
import './index.css';
import store from './redux/store';

function checkTokenInSession() {
    var token = sessionStorage.getItem("jwtToken");
    if (token) {
        return true;
    } else {
        sessionStorage.removeItem("jwtToken");
        return false;
    }
}
async function checkTokenOnReload() {
    var results = await axios.get('http://localhost:3003/check/jwt');
    if (results.status === 202) {
        return true;
    } else {
        sessionStorage.removeItem("jwtToken");
        return false;
    }
}
const PrivateRoute = ({ component: Component, ...rest }) => (
    <Route {...rest} render={props => (
        checkTokenInSession() ? <Component {...props} />
            : <Redirect to={{ pathname: '/login' }} />
    )} />
)

ReactDOM.render(
    <Provider store={store}>
        <Router>
            <div>
                {(async function () {
                    await checkTokenOnReload()
                })() ? true : true}
                <Route path="/" component={navbar} />
                <Route exact path="/" component={App} />
                <Route exact path="/signUp" component={App} />
                <Route exact path="/logIn" component={LogIn} />
                <PrivateRoute exact path="/insertBlocks" component={RegisterBlocks} />
                <PrivateRoute exact path="/insertUnitType" component={InsertUnit} />
                <PrivateRoute exact path="/insertLocation" component={InsertLocation} />
                <PrivateRoute exact path="/displayUnits" component={viewInfo} />
                <PrivateRoute exact path="/registerBusiness" component={RegisterBusiness} />
            </div>
        </Router>
    </Provider >, document.getElementById('root'));
