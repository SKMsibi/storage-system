import React, { Component } from 'react'
import { connect } from 'react-redux';
import { Field, reduxForm } from 'redux-form'

export class UnitTypeForm extends Component {
    render() {
        return (
            <form>
                <div className="business-info">
                    <div className="form-row-unit">
                        <label htmlFor='unitName'>Unit Name</label>
                        <Field name='unitName' component="input" type="text" />
                        <label htmlFor='blockName'>Block Name</label>
                        <Field name='blockName' component="input" type="text" />
                    </div>
                </div>
            </form>
        )
    }
}
UnitTypeForm = reduxForm({
    form: 'InsertUniteForm'
})(UnitTypeForm)

const mapStateToProps = state => {
    return { UnitTypeForm: state.form };
}
export default connect(mapStateToProps, null)(UnitTypeForm);
