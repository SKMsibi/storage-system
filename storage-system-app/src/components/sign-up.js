import React, { Component } from 'react'
import { connect } from 'react-redux';
import { Field, reduxForm } from 'redux-form';
import { signIn } from '../redux/thunks';

export class SignUp extends Component {
    constructor(props) {
        super(props)
        this.state = {
            errorPresent: false,
            errorMessage: ""
        }
        this.registerUser = this.registerUser.bind(this);
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
    registerUser(e) {
        e.preventDefault();
        console.log("default prevented")
        if (this.props.formDetails.values.password1 === this.props.formDetails.values.password2) {
            this.setState({ errorPresent: false, errorMessage: "" })
            this.props.userSigningIn(this.props.formDetails.values);
            this.checkResults()
        } else {
            this.setState({ errorMessage: "passwords do not match!", errorPresent: true })
        }
    }
    render() {
        return (
            <div className="App-container">
                <div className="sign-up">
                    {this.state.errorPresent && (
                        <p style={{ color: "red" }}>{this.state.errorMessage}</p>
                    )}
                    <form onSubmit={this.registerUser}>
                        <div className="form-row">
                            <label htmlFor="userName">User name</label>
                            <Field name="userName" component="input" type="text" required={true} />
                        </div>
                        <div className="form-row">
                            <label htmlFor="email">Email</label>
                            <Field name="email" component="input" type="email" required={true} />
                        </div>
                        <div className="form-row">
                            <label htmlFor="password1">Password</label>
                            <Field name="password1" component="input" type="password" required={true} />
                        </div>
                        <div className="form-row">
                            <label htmlFor="password2">Verify password</label>
                            <Field name="password2" component="input" type="password" required={true} />
                        </div>
                        <button type="submit">Sign up!</button>
                    </form>
                </div>
            </div >
        )
    }
}
const mapDispatchToProps = (dispatch) => {
    return {
        userSigningIn: (userDetails) => {
            dispatch(signIn(userDetails))
        }
    }
};
const mapStateToProps = (state) => {
    return {
        signInDetails: state.SignInLogIn,
        formDetails: state.form.signUpForm
    }
}
SignUp = reduxForm({
    form: 'signUpForm'
})(SignUp);
export default connect(mapStateToProps, mapDispatchToProps)(SignUp);
