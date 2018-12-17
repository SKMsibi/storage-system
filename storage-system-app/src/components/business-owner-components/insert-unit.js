import React, { Component } from 'react';
import { connect } from 'react-redux';
import { UnitForm } from "../forms/insert-unit-form";
import { getAllUnitTypes, submitAUnitType, getBusinesses, getAllBlocks, submitUnit } from '../../redux/thunks';
import InsertUnitTypeForm from '../forms/insert-unit-type-form'
import '../../App.css';
import * as actions from '../../redux/actions'

class InsertUnit extends Component {
    constructor(props) {
        super(props)
        this.state = {
            allTypes: [],
            showForm: false,
            showTypeForm: false,
            selectedType: null,
        }
        this.showUnitTypeForm = this.showUnitTypeForm.bind(this);
        this.addUnitType = this.addUnitType.bind(this);
        this.handleTypeSelect = this.handleTypeSelect.bind(this);
        this.handleBusinessSection = this.handleBusinessSection.bind(this);
        this.submitUnit = this.submitUnit.bind(this);
    }
    componentDidMount() {
        this.props.getBusinesses();
        this.props.getUnitTypes();
    };
    showUnitTypeForm() {
        this.setState({ showTypeForm: true, showForm: false });
    };
    async addUnitType(e) {
        this.props.submitNewUnitType({ ...this.props.unitTypeValues.values, businessName: this.props.selectedBusiness })
        this.setState({ showTypeForm: false });
        this.props.getUnitTypes();
        e.preventDefault()
    };
    handleBusinessSection(e) {
        if (e.target.value === "Select Business") {
            this.setState({ showForm: false, showTypeForm: false });
            this.props.changeSelectedBusiness(null)
        } else {
            this.props.changeSelectedBusiness(e.target.value)
        }
    };
    handleTypeSelect(e) {
        if (e.target.value === "select unit type") {
            this.setState({ showForm: false })
            this.props.changeSelectedUnitType(null)
        } else {
            this.setState({ showForm: true, showTypeForm: false })
            this.props.changeSelectedUnitType(e.target.value)
            this.props.getAllBlocks(this.props.selectedBusiness)
        }
    };
    submitUnit(e) {
        this.props.submittingAUnit(this.props.unitValues.values, this.props.selectedUnitType, this.props.selectedBusiness);
        if (this.props.errorPresent) {
            e.preventDefault();
        }
    }
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
                        <select ref="unitType" onChange={this.handleTypeSelect} disabled={!this.props.selectedBusiness}>
                            <option value="select unit type">Type name (height, length, width)</option>
                            {this.props.allUnitTypes.map(singleType => {
                                return <option key={this.props.allUnitTypes.indexOf(singleType)} value={`${singleType.name},${singleType.height},${singleType.length},${singleType.width}`}>{singleType.name} ({singleType.height}, {singleType.length}, {singleType.width})</option>
                            })}
                        </select><button onClick={this.showUnitTypeForm} disabled={!this.props.selectedBusiness}>New Type</button>
                    </div>
                    {this.state.showForm && (
                        <UnitForm allBlocks={this.props.allBlocks} submitUnit={this.submitUnit} />
                    )}
                    {this.state.showTypeForm && (
                        <div>
                            <h4>All units of measurement are in square metres</h4>
                            <InsertUnitTypeForm submitFunction={this.addUnitType} />
                        </div>
                    )}
                </div>
                {this.props.errorPresent && (
                    <h4>Error submitting, check your all your fields</h4>
                )}
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
        allBlocks: state.unit.allBlocks,
        unitValues: state.form.InsertUnitForm,
        selectedBusiness: state.business.selectedBusiness,
        selectedUnitType: state.unit.selectedUnitType,
        errorPresent: state.unit.errorOnSubmitting
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
        },
        changeSelectedBusiness: (business) => {
            dispatch(actions.changeSelectedBusiness(business))
        },
        changeSelectedUnitType: (unitType) => {
            dispatch(actions.setSelectedType(unitType))
        },
        submittingAUnit: (values, selectedUnitType, selectedBusiness) => {
            dispatch(submitUnit(values, selectedUnitType, selectedBusiness))
        }
    }
}
export default connect(mapStateToProps, mapDispatchToProps)(InsertUnit);
