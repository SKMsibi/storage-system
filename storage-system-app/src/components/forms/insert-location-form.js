import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Field, reduxForm } from 'redux-form';
import axios from 'axios'

export class InsertLocationForm extends Component {
    constructor(props) {
        super(props)
        this.submitData = this.submitData.bind(this);
    }
    async submitData() {
        if (this.props.formData.values) {
            var submitAddress = await axios.post('http://localhost:3003/businessLocation', { ...this.props.formData.values, businessName: this.props.selectedBusiness });
            if (submitAddress.status === 201) {
                this.props.redirect();
            }
        } else {
            console.log('object : Please fill in all inputs');
        }
    }
    render() {
        return (
            <div>
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
                <button onClick={this.submitData}>Submit</button>
            </div>
        )
    }
}
InsertLocationForm = reduxForm({
    form: 'LocationForm'
})(InsertLocationForm);

const mapStateToProps = (state) => {
    return {
        formData: state.form.LocationForm
    }
}
export default connect(mapStateToProps, null)(InsertLocationForm);
