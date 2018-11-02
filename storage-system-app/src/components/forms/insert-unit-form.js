import React, { Component } from 'react'
import { connect } from 'react-redux';
import { Field, reduxForm } from 'redux-form'

export class UnitForm extends Component {
    render() {
        return (
            <form onSubmit={this.props.submitUnit}>
                <div className="business-info">
                    <div className="form-row-unit">
                        <label htmlFor='unitName'>Unit Name</label>
                        <Field name='unitName' component="input" type="text" required={true} />
                        <label htmlFor='blockName'>Block Name</label>
                        <Field name="blockName" component="select" required={true}>
                            <option value="Select Block">Select Block</option>
                            {this.props.allBlocks.map(block => {
                                return <option key={this.props.allBlocks.indexOf(block)} value={block.name}>{block.name}</option>
                            })}
                        </Field>
                    </div>
                </div>
                <button type="submit">submit</button>
            </form>
        )
    }
}
UnitForm = reduxForm({
    form: 'InsertUnitForm'
})(UnitForm)
export default connect(null, null)(UnitForm);
