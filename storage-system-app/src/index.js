import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import RegisterBlocks from './components/business-owner-components/register-blocks';
import InsertUnit from './components/business-owner-components/insert-unit';
import InsertLocation from './components/business-owner-components/insert-location';
import viewInfo from "./components/rentee-components/view-info";
import RegisterBusiness from './components/business-owner-components/register-business';
import ViewUserUnits from './components/rentee-components/view-user-units'
import LandingPage from './components/business-owner-components/landing-page-after-login';
import viewRentedUnits from './components/business-owner-components/view-rented-units'
import LogIn from './components/log-in'
import navbar from './components/navbar'
import { Provider } from 'react-redux';
import { BrowserRouter as Router, Route, Redirect } from 'react-router-dom'
import axios from 'axios';
import './index.css';
import store from './redux/store';
import jwt_decode from 'jwt-decode';

function checkTokenInSessionForBusinessOwner() {
    var token = sessionStorage.getItem("jwtToken");
    if (token && jwt_decode(token).role === "Storage Owner") {
        return true;
    } else {
        sessionStorage.removeItem("jwtToken");
        return false;
    }
}
function checkTokenInSessionForClient() {
    var token = sessionStorage.getItem("jwtToken");
    if (token && jwt_decode(token).role === "Storage Ranter") {
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
const PrivateRouteForClient = ({ component: Component, ...rest }) => (
    <Route {...rest} render={props => (
        checkTokenInSessionForClient() ? <Component {...props} />
            : <Redirect to={{ pathname: '/login' }} />
    )} />
)
const PrivateRouteForBusinessOwner = ({ component: Component, ...rest }) => (
    <Route {...rest} render={props => (
        checkTokenInSessionForBusinessOwner() ? <Component {...props} />
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
                <Route exact path="/landingPage" component={LandingPage} />
                <PrivateRouteForClient exact path="/displayUnits" component={viewInfo} />
                <PrivateRouteForClient exact path="/displayUserUnits" component={ViewUserUnits} />
                <PrivateRouteForBusinessOwner exact path="/insertBlocks" component={RegisterBlocks} />
                <PrivateRouteForBusinessOwner exact path="/insertUnitType" component={InsertUnit} />
                <PrivateRouteForBusinessOwner exact path="/insertLocation" component={InsertLocation} />
                <PrivateRouteForBusinessOwner exact path="/registerBusiness" component={RegisterBusiness} />
                <PrivateRouteForBusinessOwner exact path="/rentedOutUnits" component={viewRentedUnits} />
            </div>
        </Router>
    </Provider >, document.getElementById('root'));
