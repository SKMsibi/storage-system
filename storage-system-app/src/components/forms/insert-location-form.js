import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Field, reduxForm } from 'redux-form';
export class InsertLocationForm extends Component {
    render() {
        return (
            <div>
                <form onSubmit={this.props.submitData}>
                    <div className="business-info">
                        <div className="form-row">
                            <label htmlFor="address1">Address Line 1</label>
                            <Field name="address1" component="input" type="text" required={true} />
                        </div>
                        <div className="form-row">
                            <label htmlFor="address2">Address Line 2</label>
                            <Field name="address2" component="input" type="text" required={true} />
                        </div>
                        <div className="form-row">
                            <label htmlFor="city">City / Town</label>
                            <Field name="city" component="input" type="text" required={true} />
                        </div>
                        <div className="form-row">
                            <label htmlFor="region">State / Province</label>
                            <Field name="region" component="input" type="text" required={true} />
                        </div>
                    </div>
                    <button>Submit</button>
                </form>
            </div>
        )
    }
}
InsertLocationForm = reduxForm({
    form: 'LocationForm'
})(InsertLocationForm);
export default connect(null, null)(InsertLocationForm);
