import React, { Component } from 'react'
import { connect } from 'react-redux';
import { Field, reduxForm } from 'redux-form';
import { submitBusiness } from '../../redux/thunks';
import * as actions from '../../redux/actions';

export class BusinessForm extends Component {
    constructor(props) {
        super(props)
        this.registerBusiness = this.registerBusiness.bind(this)
    }
    componentDidMount = () => {
        this.setState({ shouldRedirect: false })
    }
    async registerBusiness(e) {
        this.props.saveBusiness(this.props.businessForm.RegisterBusiness.values);
        this.props.history.push("/insertLocation");
        e.preventDefault();
    }
    render() {
        return (
            <div>
                {this.props.errorPresent && (
                    <div>
                        <h4>Could not process your request. Please make sure all fields are filled and try again.</h4>
                        <button onClick={() => this.props.removeErr()}>Okay</button>
                    </div>
                )}
                {!this.props.businessState && !this.props.errorPresent && (
                    <div>
                        <h2>Register your business here.</h2>
                        <form >
                            <div className="business-info">
                                <h3>Business Info</h3>
                                <div className="form-row">
                                    <label htmlFor="firstName">Business Name</label>
                                    <Field name="businessName" component="input" type="text" required={true} />
                                </div>
                                <div className="form-row">
                                    <label htmlFor="lastName">Contact Name</label>
                                    <Field name="contactName" component="input" type="text" required={true} />
                                </div>
                                <div className="form-row">
                                    <label htmlFor="telephone">Telephone</label>
                                    <Field name="telephone" component="input" type="tel" required={true} />
                                </div>
                                <div className="form-row">
                                    <label htmlFor="email">Email</label>
                                    <Field name="email" component="input" type="email" required={true} />
                                </div>
                            </div>
                        </form>
                        <button onClick={this.registerBusiness} >Next</button>
                    </div>
                )}
            </div>
        )
    }
}
BusinessForm = reduxForm({
    form: 'RegisterBusiness'
})(BusinessForm)
const mapStateToProps = state => {
    return {
        businessForm: state.form,
        businessState: state.business.businessSubmitted,
        errorPresent: state.business.errorOnSubmitting
    };
}
const mapDispatchToProps = (dispatch) => {
    return {
        saveBusiness: (businessData) => {
            dispatch(submitBusiness(businessData))
        },
        removeErr: () => {
            dispatch(actions.removeError());
        },
        completeSubmission: () => {
            dispatch({ type: "COMPLETE_SUBMISSIONS" });
        }
    }
}
export default connect(mapStateToProps, mapDispatchToProps)(BusinessForm);