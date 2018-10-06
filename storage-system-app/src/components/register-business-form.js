import React, { Component } from 'react'

class BusinessForm extends Component {
    render() {
        return (
            <form onSubmit={this.props.handleSubmit}>
                <div>
                    <label htmlFor="firstName">First Name</label>
                    <input name="firstName" type="text" />
                </div>
                <div>
                    <label htmlFor="lastName">Last Name</label>
                    <input name="lastName" type="text" />
                </div>
                <div>
                    <label htmlFor="email">Email</label>
                    <input name="email" type="email" />
                </div>
                <button type="submit">Submit</button>
            </form>
        )
    }
}
export default BusinessForm;