import React, { Component } from 'react'
import { connect } from 'react-redux';
import { Field, reduxForm } from 'redux-form';
import { signIn } from '../redux/thunks';

export class SignUp extends Component {
    render() {
        return (
            <div className="App-container">
                <div className="sign-up">
                    <form onSubmit={() => this.props.userLoggingIn(this.props.formDetails.values)}>
                        <div className="form-row">
                            <label htmlFor="userName">User name</label>
                            <Field name="userName" component="input" type="text" required={true} />
                        </div>
                        <div className="form-row">
                            <label htmlFor="email">Email</label>
                            <Field name="email" component="input" type="email" required={true} />
                        </div>
                        <div className="form-row">
                            <label htmlFor="firstName">First Name</label>
                            <Field name="firstName" component="input" type="text" required={true} />
                        </div>
                        <div className="form-row">
                            <label htmlFor="lastName">Last Name</label>
                            <Field name="lastName" component="input" type="text" required={true} />
                        </div>
                        <div className="form-row">
                            <label htmlFor="password">password</label>
                            <Field name="password" component="input" type="password" required={true} />
                        </div>
                        <button type="submit">submit</button>
                    </form>
                </div>
            </div >
        )
    }
}
const mapDispatchToProps = (dispatch) => {
    return {
        userLoggingIn: (userDetails) => {
            dispatch(signIn(userDetails))
        }
    }
};
const mapStateToProps = (state) => {
    return {
        formDetails: state.form.signUpForm
    }
}
SignUp = reduxForm({
    form: 'signUpForm'
})(SignUp);
export default connect(mapStateToProps, mapDispatchToProps)(SignUp);
