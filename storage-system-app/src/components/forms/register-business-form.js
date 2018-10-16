import React, { Component } from 'react'
import { connect } from 'react-redux';
import axios from "axios";
import { Redirect } from 'react-router-dom'
import { Field, reduxForm } from 'redux-form'

export class BusinessForm extends Component {
    constructor(props) {
        super(props)
        this.state = {
            shouldRedirect: false,
            IsError: false,
            errorMessage: ""
        }
    }
    componentDidMount = () => {
        this.setState({ shouldRedirect: false })
    }

    async registerBusiness() {
        try {
            var sendingData = await axios.post('http://localhost:3003/businessData', this.props.businessForm.RegisterBusiness.values);
            if (sendingData.status === 201) {
                this.setState({ shouldRedirect: true })
            } else {
                this.setState({ IsError: true, errorMessage: sendingData.data })
            }
        } catch (error) {
            console.log("error", error);

            this.setState({ IsError: true, errorMessage: "Could not process your request. Please make sure all fields are filled and try again." });
            setTimeout(() => {
                this.setState({ IsError: false, shouldRedirect: false })
            }, 3000);
        }
    }
    render() {
        return (
            <div>
                {this.state.IsError && (
                    <h4>{this.state.errorMessage}</h4>
                )}
                {!this.state.shouldRedirect && !this.state.IsError && (
                    <div>
                        <h2>Register your business here.</h2>
                        <form>
                            <div className="business-info">
                                <h3>Business Info</h3>
                                <div className="form-row">
                                    <label htmlFor="firstName">Business Name</label>
                                    <Field name="businessName" component="input" type="text" />
                                </div>
                                <div className="form-row">
                                    <label htmlFor="lastName">Contact Name</label>
                                    <Field name="contactName" component="input" type="text" />
                                </div>
                                <div className="form-row">
                                    <label htmlFor="telephone">Telephone</label>
                                    <Field name="telephone" component="input" type="tel" />
                                </div>
                                <div className="form-row">
                                    <label htmlFor="email">Email</label>
                                    <Field name="email" component="input" type="email" />
                                </div>
                            </div>
                        </form>
                        <button onClick={() => this.registerBusiness()}>Next</button>
                    </div>
                )}
                {this.state.shouldRedirect && !this.state.IsError && (
                    <Redirect to='/insertLocation' />
                )}
            </div>
        )
    }
}
BusinessForm = reduxForm({
    form: 'RegisterBusiness'
})(BusinessForm)

const mapStateToProps = state => {
    return { businessForm: state.form };
}
export default connect(mapStateToProps, null)(BusinessForm);