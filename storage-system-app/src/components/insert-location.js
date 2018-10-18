import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom'
import { Redirect } from 'react-router-dom'
import InsertLocationForm from './forms/insert-location-form'
import axios from 'axios';

export class InsertLocation extends Component {
    constructor() {
        super();
        this.state = {
            showForm: false,
            allBusiness: [],
            selectedBusiness: '',
            shouldRedirect: false
        }
    }
    async componentDidMount() {
        var allTheBusiness = await axios.get('http://localhost:3003/businesses');
        this.setState({ allBusiness: allTheBusiness.data })
    }
    render() {
        return (
            <div className="App-container">
                <div>
                    <h3>Business Address</h3>
                    <p>Please select the business you want to insert location for.</p>
                    <select ref="select" onChange={() => { if (this.refs.select.value === "Select Business") { this.setState({ showForm: false }) } else { this.setState({ showForm: true, selectedBusiness: this.refs.select.value }) } }}>
                        <option value="Select Business">Select Business</option>
                        {this.state.allBusiness.map(singleBusiness => {
                            return <option key={this.state.allBusiness.indexOf(singleBusiness)} value={singleBusiness.name}>{singleBusiness.name}</option>
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
    return { businessForm: state.form };
}
export default connect(mapStateToProps, null)(InsertLocation);
