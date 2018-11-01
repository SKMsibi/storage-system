import React, { Component } from 'react';
import { connect } from 'react-redux';
import { UnitForm } from "./forms/insert-unit-form";
import { getAllUnitTypes, submitAUnitType, getBusinesses, getAllBlocks } from '../redux/thunks';
import InsertUnitTypeForm from './forms/insert-unit-type-form'
import '../App.css';

class InsertUnit extends Component {
    constructor(props) {
        super(props)
        this.state = {
            selectedBusiness: null,
            allTypes: [],
            showForm: false,
            showTypeForm: false,
            selectedType: null
        }
        this.showUnitTypeForm = this.showUnitTypeForm.bind(this);
        this.addUnitType = this.addUnitType.bind(this);
        this.handleTypeSelect = this.handleTypeSelect.bind(this);
        this.handleBusinessSection = this.handleBusinessSection.bind(this);
    }
    componentDidMount() {
        this.props.getBusinesses();
        this.props.getUnitTypes();
    };
    showUnitTypeForm() {
        this.setState({ showTypeForm: true, showForm: false });
    };
    async addUnitType(e) {
        this.props.submitNewUnitType({ ...this.props.unitTypeValues.values, businessName: this.state.selectedBusiness })
        this.setState({ showTypeForm: false });
        this.props.getUnitTypes();
        e.preventDefault()
    };
    handleBusinessSection(e) {
        if (e.target.value === "Select Business") {
            this.setState({ showForm: false, showTypeForm: false })
        } else {
            this.setState({ selectedBusiness: e.target.value })
        }
    };
    handleTypeSelect(e) {
        if (e.target.value === "select unit type") {
            this.setState({ showForm: false })
        } else {
            this.setState({ selectedType: e.target.value, showForm: true, showTypeForm: false })
            this.props.getAllBlocks(this.state.selectedBusiness)
        }
    };
    render() {
        return (
            <div className="App-container">
                <div className="register-blocks">
                    <h4>Please select the business you want to insert location for.</h4>
                    <select onChange={this.handleBusinessSection}>
                        <option value="Select Business">Select Business</option>
                        {this.props.businesses.allBusinesses.map(singleBusiness => {
                            return <option key={this.props.businesses.allBusinesses.indexOf(singleBusiness)} value={singleBusiness.name}>{singleBusiness.name}</option>
                        })}
                    </select>
                    <h4> Select the unit type of the unit or Add a new one.</h4>
                    <div>
                        <select ref="unitType" onChange={this.handleTypeSelect}>
                            <option value="select unit type">Type name (height, length, width)</option>
                            {this.props.allUnitTypes.map(singleType => {
                                return <option key={this.props.allUnitTypes.indexOf(singleType)} value={`${singleType.name},${singleType.height},${singleType.length},${singleType.width}`}>{singleType.name} ({singleType.height}, {singleType.length}, {singleType.width})</option>
                            })}
                        </select><button onClick={this.showUnitTypeForm}>Add Type</button>
                    </div>
                    {this.state.showForm && (
                        <UnitForm allBlocks={this.props.allBlocks} />
                    )}
                    {this.state.showTypeForm && (
                        <div>
                            <h4>All units of measurement are in square metres</h4>
                            <InsertUnitTypeForm submitFunction={this.addUnitType} />
                        </div>
                    )}
                </div>
            </div>
        );
    }
}
const mapStateToProps = (state) => {
    return {
        state: state,
        allUnitTypes: state.unitType.allUnitTypes,
        unitTypeValues: state.form.InsertUnitTypeForm,
        businesses: state.business,
        allBlocks: state.unitType.allBlocks
    }
}
const mapDispatchToProps = (dispatch) => {
    return {
        getBusinesses: () => {
            dispatch(getBusinesses())
        },
        getUnitTypes: () => {
            dispatch(getAllUnitTypes())
        },
        submitNewUnitType: (values) => {
            dispatch(submitAUnitType(values))
        },
        getAllBlocks: (businessName) => {
            dispatch(getAllBlocks(businessName))
        }
    }
}
export default connect(mapStateToProps, mapDispatchToProps)(InsertUnit);
