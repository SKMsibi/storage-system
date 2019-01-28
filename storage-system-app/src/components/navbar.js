import React, { Component } from 'react';
import { connect } from 'react-redux';
import { updateUserStatus } from '../redux/thunks'
class navbar extends Component {
    changeRoute(route) {
        if (route === "/logOut") {
            sessionStorage.removeItem("jwtToken");
            this.props.history.push("/logIn");
        } else {
            this.props.history.push(route);
        }
    }
    render() {
        return (
            <div className="nav">
                <div className="nav-btn">
                    <label htmlFor="nav-check">
                        <span></span>
                        <span></span>
                        <span></span>
                    </label>
                </div>
                <div className="nav-links">
                    {this.props.userStatus && (
                        // eslint-disable-next-line
                        <a onClick={() => { this.changeRoute("/logOut"); this.props.logOut(); return true; }} >log out</a>
                    )}
                    {!this.props.userStatus && (
                        // eslint-disable-next-line
                        <a onClick={() => this.changeRoute("/signUp")}>Sign-up</a>
                    )}
                    {!this.props.userStatus && (
                        // eslint-disable-next-line
                        <a onClick={() => this.changeRoute("/logIn")}>Login</a>
                    )}

                    {(this.props.userStatus && this.props.role === "Storage Owner") && (
                        // eslint-disable-next-line
                        <a onClick={() => this.changeRoute("/registerBusiness")} >Register Business</a>
                    )}
                    {(this.props.userStatus && this.props.role === "Storage Owner") && (
                        // eslint-disable-next-line
                        <a onClick={() => this.changeRoute("/insertLocation")} >Business location</a>
                    )}
                    {(this.props.userStatus && this.props.role === "Storage Owner") && (
                        // eslint-disable-next-line
                        <a onClick={() => this.changeRoute("/insertBlocks")} >Insert Blocks</a>
                    )}
                    {(this.props.userStatus && this.props.role === "Storage Owner") && (
                        // eslint-disable-next-line
                        <a onClick={() => this.changeRoute("/insertUnitType")} >Insert unites</a>
                    )}
                    {(this.props.userStatus && this.props.role === "Storage Owner") && (
                        // eslint-disable-next-line
                        <a onClick={() => this.changeRoute("/rentedOutUnits")} >Rented Units</a>
                    )}

                    {(this.props.userStatus && this.props.role === "Storage Ranter") && (
                        // eslint-disable-next-line
                        <a onClick={() => this.changeRoute("/displayUnits")} >Rent a unit</a>
                    )}
                    {(this.props.userStatus && this.props.role === "Storage Ranter") && (
                        // eslint-disable-next-line
                        <a onClick={() => this.changeRoute("/displayUserUnits")} >View My Units</a>
                    )}
                </div>
            </div>

        )
    }
}
const mapStateToProps = (state) => {
    return {
        state: state,
        userStatus: state.SignInLogIn.userLoggedIn,
        role: state.SignInLogIn.loggedInUserRole
    }
}
const mapDispatchToProps = (dispatch) => {
    return {
        logOut: () => {
            dispatch(updateUserStatus(false, null))
        }
    }
}
export default connect(mapStateToProps, mapDispatchToProps)(navbar)