import React, { Component } from 'react';
import { connect } from 'react-redux';
import { UnitForm } from "./forms/insert-unit-form";
import axios from 'axios';
import '../App.css';

class InsertUnit extends Component {
    constructor(props) {
        super(props)

        this.state = {
            allTypes: [],
            showForm: false,
            selectedType: null
        }
        this.handleSelect = this.handleSelect.bind(this)
    }

    async componentDidMount() {
        var allAvailableUnitTypes = await axios.get('http://localhost:3003/unitTypes');
        this.setState({ allTypes: allAvailableUnitTypes.data })
    }
    handleSelect(e) {
        if (e.target.value === "select unit type") {
            this.setState({ showForm: false })
        } else {
            this.setState({ selectedType: e.target.value, showForm: true })
        }
    }
    render() {
        return (
            <div className="register-blocks">
                <div className="App-container">
                    <h4> Select the unit type of the unit.</h4>
                    <select onChange={this.handleSelect}>
                        <option value="select unit type">Type name (height, length, width)</option>
                        {this.state.allTypes.map(singleType => {
                            return <option key={this.state.allTypes.indexOf(singleType)} value={`${singleType.name},${singleType.height},${singleType.length},${singleType.width}`}>{singleType.name} ({singleType.height}, {singleType.length}, {singleType.width})</option>
                        })}
                    </select>
                    {/* <h4>Unit details</h4> */}
                    {this.state.showForm && (
                        <UnitForm />
                    )}
                </div>
            </div>
        );
    }
}
export default connect(null, null)(InsertUnit);
