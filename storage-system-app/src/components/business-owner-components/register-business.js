import React, { Component } from 'react'
import BusinessForm from '../forms/register-business-form';
export default class RegisterBusiness extends Component {
    render() {
        return (
            <div className="App">
                <div className="App-container">
                    <BusinessForm {...this.props} />
                </div>
            </div>
        )
    }
}
