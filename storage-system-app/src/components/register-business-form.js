import React, { Component } from 'react'
import { Redirect } from 'react-router-dom'
import { Field, reduxForm } from 'redux-form'

class BusinessForm extends Component {
    constructor(props) {
        super(props)
        this.state = {
            shouldRedirect: false
        }
    }
    componentDidMount = () => {
        this.setState({ shouldRedirect: false })
    }

    render() {
        return (
            <div>
                {!this.state.shouldRedirect && (
                    <form action="http://localhost:3003/testing" method="get">
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
                        <button type="submit" onClick={() => this.setState({ shouldRedirect: true })}>Next</button>
                    </form>
                )}
                {this.state.shouldRedirect && (
                    <Redirect to='/specifyBlocks' />
                )}
            </div>
        )
    }
}
BusinessForm = reduxForm({
    form: 'RegisterBusiness'
})(BusinessForm)
export default BusinessForm;