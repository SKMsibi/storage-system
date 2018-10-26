import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import { Redirect } from 'react-router-dom';
import InsertLocationForm from './forms/insert-location-form';
import * as actions from '../redux/actions';
import businesses from '../redux/thunks'

export class InsertLocation extends Component {
    constructor() {
        super();
        this.state = {
            showForm: false,
            selectedBusiness: '',
            shouldRedirect: false
        }
    }
    async componentDidMount() {
        this.props.getBusinesses();
    }
    render() {
        return (
            <div className="App-container">
                <div>
                    <h3>Business Address</h3>
                    <p>Please select the business you want to insert location for.</p>
                    <select ref="select" onChange={() => { if (this.refs.select.value === "Select Business") { this.setState({ showForm: false }) } else { this.setState({ showForm: true, selectedBusiness: this.refs.select.value }) } }}>
                        <option value="Select Business">Select Business</option>
                        { this.props.businesses.allBusinesses.map(singleBusiness => {
                            return <option key={this.props.businesses.allBusinesses.indexOf(singleBusiness)} value={singleBusiness.name}>{singleBusiness.name}</option>
                        })}
                    </select>
                    {this.state.showForm && (
                        <InsertLocationForm selectedBusiness={this.state.selectedBusiness} redirect={() => this.setState({ shouldRedirect: true })} />
                    )}
                    {this.state.shouldRedirect && (
                        <Redirect to='/insertBlocks' />
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
        businessForm: state.form,
        businesses: state.business
    };
}
const mapDispatchToProps = (dispatch) => {
    return {
        getBusinesses: () => {
            dispatch(businesses())
        },
        setBusinessName: (name) => {
            dispatch(actions.changeSelectedBusiness(name))
        }
    }
}
export default connect(mapStateToProps, mapDispatchToProps)(InsertLocation);
