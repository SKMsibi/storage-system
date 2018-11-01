import React, { Component } from 'react'
import { connect } from 'react-redux';
import { Field, reduxForm } from 'redux-form'

export class UnitForm extends Component {
    render() {
        return (
            <form>
                <div className="business-info">
                    <div className="form-row-unit">
                        <label htmlFor='unitName'>Unit Name</label>
                        <Field name='unitName' component="input" type="text" />
                        <label htmlFor='blockName'>Block Name</label>
                        <Field name="favoriteColor" component="select">
                            <option value="#ff0000">Select Block</option>
                            {this.props.allBlocks.map(block => {
                                return <option key={this.props.allBlocks.indexOf(block)} value={block.name}>{block.name}</option>
                            })}
                        </Field>
                    </div>
                </div>
            </form>
        )
    }
}
UnitForm = reduxForm({
    form: 'InsertUnitForm'
})(UnitForm)
export default connect(null, null)(UnitForm);
