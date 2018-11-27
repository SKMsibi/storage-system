import React, { Component } from 'react'
import { connect } from 'react-redux';
import { Field, reduxForm } from 'redux-form';
import { logIn } from '../redux/thunks';

export class LogIn extends Component {
    constructor(props) {
        super(props)
        this.state = {
            errorPresent: false,
            errorMessage: ""
        }
        this.logInUser = this.logInUser.bind(this);
    }
    checkResults() {
        setTimeout(() => {
            if (this.props.signInDetails.errorPresent) {
                this.setState({ errorMessage: this.props.signInDetails.errorMessage, errorPresent: true })
            } else {
                this.props.history.push("/displayUnits")
            }
        }, 1000);
    }
    logInUser(e) {
        e.preventDefault();
        this.setState({ errorPresent: false, errorMessage: "" })
        this.props.userLoggingIn(this.props.formDetails.values);
        this.checkResults()
    }
    render() {
        return (
            <div className="App-container">
                <div className="sign-up">
                    {this.state.errorPresent && (
                        <p style={{ color: "red" }}>{this.state.errorMessage}</p>
                    )}
                    <form onSubmit={this.logInUser}>
                        <div className="form-row">
                            <label htmlFor="email">Email</label>
                            <Field name="email" component="input" type="email" required={true} />
                        </div>
                        <div className="form-row">
                            <label htmlFor="password">Password</label>
                            <Field name="password" component="input" type="password" required={true} />
                        </div>
                        <button type="submit">Log In!</button>
                    </form>
                </div>
            </div >
        )
    }
}
const mapDispatchToProps = (dispatch) => {
    return {
        userLoggingIn: (userDetails) => {
            dispatch(logIn(userDetails))
        }
    }
};
const mapStateToProps = (state) => {
    return {
        signInDetails: state.SignInLogIn,
        formDetails: state.form.logInForm
    }
}
LogIn = reduxForm({
    form: 'logInForm'
})(LogIn);
export default connect(mapStateToProps, mapDispatchToProps)(LogIn);
