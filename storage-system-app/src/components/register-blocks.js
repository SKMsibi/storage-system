import React, { Component } from 'react';
import { Link } from 'react-router-dom'
import { connect } from 'react-redux';
import BlockForm from './forms/insert-block-form';
import { getAllBusinessesWithLocations, getBusinessLocations, submitBlocks } from '../redux/thunks'
import '../App.css';
import * as actions from '../redux/actions';

export class RegisterBlocks extends Component {
    constructor(props) {
        super(props)
        this.state = {
            showForm: false,
            numberOfBlocks: 1,
            blocks: [],
            showBlocksInsert: false,
        }
        this.handleChange = this.handleChange.bind(this);
        this.createBlockForms = this.createBlockForms.bind(this);
        this.submitBlocks = this.submitBlocks.bind(this);
        this.handleBusinessSelection = this.handleBusinessSelection.bind(this);
        this.handleLocationSelection = this.handleLocationSelection.bind(this);
    }
    componentDidMount() {
        this.props.getBusinesses();
    }
    handleChange(event) {
        this.setState({ numberOfBlocks: event.target.value, showBlocksInsert: false });
    }
    createBlockForms() {
        var arrTemp = [];
        for (let index = 1; index <= this.state.numberOfBlocks; index++) {
            arrTemp.push(index);
        }
        this.setState({ blocks: arrTemp, showBlocksInsert: true })
    }
    submitBlocks() {
        this.props.submitBlocks(this.props.blocksData.InsertBlockForm.values, this.props.selectedBusiness, this.props.selectLocation);
        this.props.history.push("/insertUnitType");
    }
    handleBusinessSelection() {
        if (this.refs.select.value === "Select Business") {
            this.setState({ showLocationDropDown: false })
        } else {
            this.props.changeSelectedBusiness(this.refs.select.value)
            setTimeout(() => {
                this.props.changeBusinessLocation(this.props.selectedBusiness)
                this.setState({ showLocationDropDown: true })
            }, 1000);
        }
    }
    handleLocationSelection() {
        if (this.refs.location.value === "Select location") {
            this.setState({ showForm: false })
        } else {
            this.props.changeLocation(this.refs.location.value);
            this.setState({ showForm: true, selectedLocation: this.refs.location.value })
        }
    }
    render() {
        return (
            <div className="register-blocks">
                <div className="App-container">
                    {!this.state.showForm && (
                        <div className="register-location">
                            <h4>Select the business you want to insert Blocks for.</h4>
                            <select ref="select" onChange={this.handleBusinessSelection}>
                                <option value="Select Business">Select Business</option>
                                {this.props.businesses.map(singleBusiness => {
                                    return <option key={this.props.businesses.indexOf(singleBusiness)} value={singleBusiness.name}>{singleBusiness.name}</option>
                                })}
                            </select>
                            {this.state.showLocationDropDown && (
                                <h4>Select the location the Blocks.</h4>
                            )}
                            {this.state.showLocationDropDown && (
                                <select ref="location" onChange={this.handleLocationSelection}>
                                    <option value="Select location">Select location</option>
                                    {this.props.locations.map(singleLocation => {
                                        return <option key={this.props.locations.indexOf(singleLocation)} value={`${singleLocation.address1},${singleLocation.address2},${singleLocation.city},${singleLocation.region}`}>{singleLocation.address1}, {singleLocation.address2}, {singleLocation.city}, {singleLocation.region}</option>
                                    })}
                                </select>
                            )}
                        </div>
                    )}
                    {this.state.showForm && (
                        <div className="block-form">
                            <h4>How many blocks are you adding?</h4><br />
                            <input type="number" min="1" name="numberOfBlocks" value={this.state.numberOfBlocks} onChange={this.handleChange} />
                            <button ref="addToDatabase" onClick={this.createBlockForms}>Go</button>
                            {this.state.blocks.map(item => {
                                return <BlockForm number={item} key={item} />
                            })}
                            {this.state.showBlocksInsert && (
                                <button onClick={this.submitBlocks}>Insert Blocks</button>
                            )}
                        </div>
                    )}
                    <Link to="/"><button>back</button></Link>
                </div>
            </div >
        );
    }
}

const mapStateToProps = state => {
    return {
        state: state,
        blocksData: state.form,
        businesses: state.blocks.allBusinessWithLocation,
        selectedBusiness: state.blocks.selectedBusiness,
        locations: state.blocks.selectedBusinessLocations,
        selectLocation: state.blocks.selectLocation
    };
}
const mapDispatchToProps = (dispatch) => {
    return {
        getBusinesses: () => {
            dispatch(getAllBusinessesWithLocations())
        },
        changeSelectedBusiness: (newBusiness) => {
            dispatch(actions.changeSelectedBusinessInBlocks(newBusiness))
        },
        changeBusinessLocation: (business) => {
            dispatch(getBusinessLocations(business))
        },
        changeLocation: (location) => {
            dispatch(actions.changeLocationsInBlocks(location))
        },
        submitBlocks: (blocksValues, businessName, location) => {
            dispatch(submitBlocks(blocksValues, businessName, location))
        }
    }
}
export default connect(mapStateToProps, mapDispatchToProps)(RegisterBlocks);
