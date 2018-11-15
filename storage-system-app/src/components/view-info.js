import React, { Component } from 'react'
import { connect } from 'react-redux';
import * as thunks from '../redux/thunks';


class viewInfo extends Component {
    constructor(props) {
        super(props)
        this.state = {
            showLocationDropDown: false,
            displaySelected: false,
            searchBy: '',
            searchPhrase: '',
            showInput: false,
            displayUnits: false
        }
    }
    componentDidMount() {
        this.refs.getButton.disabled = true;
    }
    async changeSearchBy() {
        if (this.refs.search.value === 'search') {
            this.setState({ showInput: false, displayUnits: false })
        } else {
            this.setState({ displayUnits: false })
            if (this.refs.search.value === 'business') {
                this.props.getAllBusinesses();
                this.setState({ showInput: true, searchBy: this.refs.search.value });
            } else if (this.refs.search.value === "unit Types") {
                this.props.getAllUnitTypes()
                this.setState({ showInput: true, searchBy: this.refs.search.value });
            } else {
                this.props.getAllLocations()
                this.setState({ showLocationDropDown: true, searchBy: this.refs.search.value })
            }
        }
    }
    handleChange() {
        switch (this.refs.select.name) {
            case "location":
                if (this.refs.select.value.length > 0) {
                    this.setState({ searchPhrase: this.refs.select.value })
                } else {
                    this.refs.getButton.disabled = true;
                    this.setState({ searchPhrase: this.refs.select.value })
                }
                break;
            case "business":
                if (this.refs.select.value === "Select Business") {
                    this.refs.getButton.disabled = true;
                } else {
                    this.setState({ searchPhrase: this.refs.select.value })
                    this.refs.getButton.disabled = false;
                }
                break;
            case "unit types":
                if (this.refs.select.value === "Select unit type") {
                    this.refs.getButton.disabled = true;
                } else {
                    this.setState({ searchPhrase: this.refs.select.value })
                    this.refs.getButton.disabled = false;
                }
                break;
            default:
                break;
        }
    }
    handleLocationChange() {
        this.setState({ searchPhrase: this.refs.locationDropDown.value })
        this.refs.getButton.disabled = false;
    }
    async getData() {
        this.props.getAllAvailableUnits(this.state.searchBy, this.state.searchPhrase);
        this.setState({ displayUnits: true });
    }
    render() {
        console.log('this.pro :', this.props);
        return (
            <div className="App-container">
                <h3>View all units</h3>
                <select ref="search" onChange={() => this.changeSearchBy()}>
                    <option value="search">sort by</option>
                    <option value="business">Business</option>
                    <option value="unit Types">Unit Type</option>
                    <option value="locations">Locations</option>
                </select>
                {this.state.showInput && this.state.searchBy === "business" && (
                    <select ref="select" name="business" onChange={() => this.handleChange()}>
                        <option value="Select Business">Select Business</option>
                        {this.props.businesses.map(singleBusiness => {
                            return <option key={this.props.businesses.indexOf(singleBusiness)} value={singleBusiness.name}>{singleBusiness.name}</option>
                        })}
                    </select>)}
                {this.state.showLocationDropDown && this.state.searchBy === "locations" && (
                    <select ref="locationDropDown" name="locationDropDown" onChange={() => this.handleLocationChange()}>
                        <option value="Select locations">Select locations</option>
                        {this.props.locations.map(singleBusiness => {
                            return <option key={this.props.locations.indexOf(singleBusiness)} value={`${singleBusiness.region},${singleBusiness.city},${singleBusiness.address1},${singleBusiness.address2}`}>{singleBusiness.region}, {singleBusiness.city}, {singleBusiness.address1}, {singleBusiness.address2}</option>
                        })}
                    </select>
                )}
                {this.state.showInput && this.state.searchBy === "unit Types" && (
                    <select ref="select" name="unit types" onChange={() => this.handleChange()}>
                        <option value="Select unit type">Select unit type (height, length, width)</option>
                        {this.props.unitTypes.map(singleUnitType => {
                            return <option key={this.props.unitTypes.indexOf(singleUnitType)} value={`${singleUnitType.name}, ${singleUnitType.height}, ${singleUnitType.length}, ${singleUnitType.width}`}> {singleUnitType.name} ({singleUnitType.height}, {singleUnitType.length}, {singleUnitType.width})</option>
                        })}
                    </select>)}
                <button onClick={() => this.getData()} ref="getButton">Go</button>
                {this.state.displayUnits && (
                    this.props.units.length <= 0 ? <p>Sorry No units are available for the selected options.</p> : this.props.units.map(item =>
                        <h4 key={this.props.units.indexOf(item)}>{item.name}</h4>)
                )}
            </div >
        )
    }
}
const mapDispatchToProps = (dispatch) => {
    return {
        getAllBusinesses: () => {
            dispatch(thunks.getBusinessesForUnits())
        },
        getAllUnitTypes: () => {
            dispatch(thunks.getAllUnitTypesForUnis())
        },
        getAllLocations: () => {
            dispatch(thunks.getLocationsForUnits())
        },
        getAllAvailableUnits: (searchBy, searchPhrase) => {
            dispatch(thunks.getAllAvailableUnits(searchBy, searchPhrase))
        }
    }
}
const mapStateToProps = (state) => {
    return {
        state: state.displayUnits,
        businesses: state.displayUnits.allBusiness,
        unitTypes: state.displayUnits.allUnitTypes,
        locations: state.displayUnits.allLocations,
        units: state.displayUnits.allUnits
    }
}
export default connect(mapStateToProps, mapDispatchToProps)(viewInfo);
