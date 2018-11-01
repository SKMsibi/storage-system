import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Field, reduxForm } from 'redux-form'
import '../../App.css';

class InsertUnitTypeForm extends Component {
    render() {
        return (
            <div className="unit-type-form">
                <form onSubmit={this.props.submitFunction}>
                    <div className="form-row">
                        <label htmlFor='typeName'>Name</label>
                        <Field name='typeName' component="input" placeholder="example(Garage)" type="text" required={true} />
                    </div>
                    <div className="form-row">
                        <label htmlFor='height'>Height</label>
                        <Field name='height' component="input" min="1" placeholder="example(25)" type="number" required={true} />
                    </div>
                    <div className="form-row">
                        <label htmlFor='length'>Length</label>
                        <Field name='length' component="input" min="1" placeholder="example(20)" type="number" required={true} />
                    </div>
                    <div className="form-row">
                        <label htmlFor='width'>Width</label>
                        <Field name='width' component="input" min="1" placeholder="example(30)" type="number" required={true} />
                    </div>
                    <button>submit</button>
                </form>
            </div>
        );
    }
}
InsertUnitTypeForm = reduxForm({
    form: 'InsertUnitTypeForm'
})(InsertUnitTypeForm)
export default connect(null, null)(InsertUnitTypeForm);
