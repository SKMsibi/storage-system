import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Field, reduxForm } from 'redux-form'

export class InsertLocationForm extends Component {
    render() {
        return (
            <form>
                <div className="business-info">
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
        )
    }
}
InsertLocationForm = reduxForm({
    form: 'LocationForm'
})(InsertLocationForm)
export default connect(null, null)(InsertLocationForm);
