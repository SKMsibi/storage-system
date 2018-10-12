import React, { Component } from 'react';
import { connect } from 'react-redux';
import axios from 'axios';
import { Field, reduxForm } from 'redux-form'

export class BlockForm extends Component {
    render() {
        return (
            <form>
                <div className="business-info">
                    <div className="form-row">
                        <label htmlFor={`blockName${this.props.number}`}>Block {this.props.number} Name</label>
                        <Field name={`blockName${this.props.number}`} component="input" type="text" />
                    </div>
                </div>
            </form>
        )
    }
}
BlockForm = reduxForm({
    form: 'InsertBlockForm'
})(BlockForm)

const mapStateToProps = state => {
    return { businessForm: state.form };
}
export default connect(mapStateToProps, null)(BlockForm);
