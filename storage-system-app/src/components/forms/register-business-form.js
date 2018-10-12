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
            error: false,
            errorMessage: ""
        }
    }
    componentDidMount = () => {
        this.setState({ shouldRedirect: false })
    }

    async registerBusiness() {
        var sendingData = await axios.post('http://localhost:3003/businessData', this.props.businessForm.RegisterBusiness.values);
        if (sendingData.status === 201) {
            this.setState({ shouldRedirect: true })
        } else {
            this.setState({ error: true, errorMessage: sendingData.data })
        }
    }
    render() {
        return (
            <div>
                {!this.state.shouldRedirect && (
                    <div>
                        <form>
                            <div className="business-info">
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
                            <div className="business-address">
                                <div className="form-row">
                                    <label htmlFor="country">Country</label>
                                    <Field name="country" component="input" type="text" />
                                </div>
                                <div className="form-row">
                                    <label htmlFor="address1">address1</label>
                                    <Field name="address1" component="input" type="text" />
                                </div>
                                <div className="form-row">
                                    <label htmlFor="address2">Address2</label>
                                    <Field name="address2" component="input" type="text" />
                                </div>
                                <div className="form-row">
                                    <label htmlFor="address3">Address3</label>
                                    <Field name="address3" component="input" type="text" />
                                </div>
                            </div>
                        </form>
                        <button onClick={() => this.registerBusiness()}>Next</button>
                    </div>
                )}
                {this.state.shouldRedirect && (
                    <Redirect to='/insertBlocks' />
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