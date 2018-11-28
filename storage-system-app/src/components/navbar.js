import React, { Component } from 'react'
export default class navbar extends Component {
    changeRoute(route) {
        if (route === "/") {
            sessionStorage.removeItem('jwtToken');
        }
        this.props.history.push(route)
    }
    render() {
        return (
            <header className="nav">
                <button onClick={() => this.changeRoute("/logIn")} className="navigation-button">User log out</button>
                <button onClick={() => this.changeRoute("/signUp")} className="navigation-button">User sign-up</button>
                <button onClick={() => this.changeRoute("/logIn")} className="navigation-button">User Login</button>
                <button onClick={() => this.changeRoute("/registerBusiness")} className="navigation-button">Register Business</button>
                <button onClick={() => this.changeRoute("/insertLocation")} className="navigation-button">Business location</button>
                <button onClick={() => this.changeRoute("/insertBlocks")} className="navigation-button">Insert Blocks</button>
                <button onClick={() => this.changeRoute("/insertUnitType")} className="navigation-button">Insert unites</button>
                <button onClick={() => this.changeRoute("/displayUnits")} className="navigation-button">view Units</button>
            </header >
        )
    }
}
