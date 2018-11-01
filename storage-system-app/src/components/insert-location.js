import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import InsertLocationForm from './forms/insert-location-form';
import * as actions from '../redux/actions';
import { getBusinesses, submitLocation } from '../redux/thunks'

export class InsertLocation extends Component {
    constructor() {
        super();
        this.state = {
            showForm: false,
            selectedBusiness: '',
            shouldRedirect: false
        }
        this.submitData = this.submitData.bind(this);
        this.handleSection = this.handleSection.bind(this);
    }
     componentDidMount() {
        this.props.getBusinesses();
    }
     submitData() {
        this.props.saveLocation({ ...this.props.formData.values, businessName: this.state.selectedBusiness });
        this.props.completeSubmission();
        this.props.history.push("/insertBlocks");
    };
    handleSection() {
        if (this.refs.select.value === "Select Business") {
            this.setState({ showForm: false })
        } else {
            this.setState({ showForm: true, selectedBusiness: this.refs.select.value })
        }
    }
    render() {
        return (
            <div className="App-container">
                <div>
                    <h3>Business Address</h3>
                    <p>Please select the business you want to insert location for.</p>
                    <select ref="select" onChange={this.handleSection}>
                        <option value="Select Business">Select Business</option>
                        {this.props.businesses.allBusinesses.map(singleBusiness => {
                            return <option key={this.props.businesses.allBusinesses.indexOf(singleBusiness)} value={singleBusiness.name}>{singleBusiness.name}</option>
                        })}
                    </select>
                    {this.state.showForm && (
                        <InsertLocationForm submitData={this.submitData} />
                    )}
                    <div>
                        <Link to="/"><button>back</button></Link>
                    </div>
                </div >
            </div>
        )
    }
}
const mapStateToProps = state => {
    return {
        state: state,
        businesses: state.business,
        formData: state.form.LocationForm
    };
};
const mapDispatchToProps = (dispatch) => {
    return {
        getBusinesses: () => {
            dispatch(getBusinesses())
        },
        setBusinessName: (name) => {
            dispatch(actions.changeSelectedBusiness(name))
        },
        saveLocation: (location) => {
            dispatch(submitLocation(location))
        },
        completeSubmission: () => {
            dispatch({ type: "COMPLETE_LOCATION_SUBMISSION" })
        }
    }
}
export default connect(mapStateToProps, mapDispatchToProps)(InsertLocation);
