import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Nav, Navbar, NavItem } from 'react-bootstrap';

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
            <div>
                <Navbar fluid className={'navbar-bg'}>
                    <Navbar.Header>
                        <Navbar.Brand>
                            <a>StorageGuru</a>
                        </Navbar.Brand>
                        <Navbar.Toggle />
                    </Navbar.Header>
                    <Navbar.Collapse>
                        <Nav>
                            {this.props.userStatus && (
                                <NavItem onClick={() => this.changeRoute("/logOut")} >User log out</NavItem>
                            )}
                        </Nav>
                        {!this.props.userStatus && (
                            <Nav pullRight>
                                <NavItem eventKey={1} onClick={() => this.changeRoute("/signUp")}>User sign-up</NavItem>
                                <NavItem eventKey={2} onClick={() => this.changeRoute("/logIn")}>User Login</NavItem>
                            </Nav>
                        )}
                        {(this.props.userStatus && this.props.role === "Storage Owner") && (
                            <Nav pullRight>
                                <NavItem onClick={() => this.changeRoute("/registerBusiness")} >Register Business</NavItem>
                                <NavItem onClick={() => this.changeRoute("/insertLocation")} >Business location</NavItem>
                                <NavItem onClick={() => this.changeRoute("/insertBlocks")} >Insert Blocks</NavItem>
                                <NavItem onClick={() => this.changeRoute("/insertUnitType")} >Insert unites</NavItem>
                                <NavItem onClick={() => this.changeRoute("/rentedOutUnits")} >Rented Units</NavItem>
                            </Nav>
                        )}
                        {(this.props.userStatus && this.props.role === "Storage Owner") && (
                            <Nav pullRight>
                                <NavItem onClick={() => this.changeRoute("/registerBusiness")} >Register Business</NavItem>
                                <NavItem onClick={() => this.changeRoute("/insertLocation")} >Business location</NavItem>
                                <NavItem onClick={() => this.changeRoute("/insertBlocks")} >Insert Blocks</NavItem>
                                <NavItem onClick={() => this.changeRoute("/insertUnitType")} >Insert unites</NavItem>
                                <NavItem onClick={() => this.changeRoute("/rentedOutUnits")} >Rented Units</NavItem>
                            </Nav>
                        )}
                        {(this.props.userStatus && this.props.role === "Storage Ranter") && (
                            <Nav pullRight>
                                <NavItem onClick={() => this.changeRoute("/displayUnits")} >View All Units</NavItem>
                                <NavItem onClick={() => this.changeRoute("/displayUserUnits")} >View My Units</NavItem>
                            </Nav>
                        )}
                    </Navbar.Collapse>
                </Navbar>
            </div >
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
export default connect(mapStateToProps, null)(navbar)
