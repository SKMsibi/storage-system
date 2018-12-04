import React, { Component } from 'react'
import { connect } from 'react-redux';
import "../App.css"

class ViewUnitsTable extends Component {
    render() {
        console.log('this.props :', this.props);
        return (
            <div>
                <table key="unitsTable">
                    <thead>
                        <tr>
                            <th>No.</th>
                            <th>Unit Name</th>
                            <th>Block name</th>
                            <th>Unit type</th>
                            <th>length</th>
                            <th>width</th>
                            <th>height</th>
                            <th>Region</th>
                            <th>City</th>
                        </tr>
                    </thead>
                    <tbody>
                        {this.props.units.length <= 0 ? <tr><td>Sorry No units are available for the selected options.</td></tr> : this.props.units.map(singleUnit =>
                            <tr key={this.props.units.indexOf(singleUnit)}>
                                <td>{this.props.units.indexOf(singleUnit) + 1}</td>
                                <td>{singleUnit.unitsname}</td>
                                <td>{singleUnit.blockname}</td>
                                <td>{singleUnit.unittypename}</td>
                                <td>{singleUnit.length}</td>
                                <td>{singleUnit.width}</td>
                                <td>{singleUnit.height}</td>
                                <td>{singleUnit.region}</td>
                                <td>{singleUnit.city}</td>
                            </tr>
                        )}
                    </tbody>
                </table>
            </div>
        )
    }
}
const mapStateToProps = (state) => {
    return {
        units: state.displayUnits.allUnits
    }
}
export default connect(mapStateToProps, null)(ViewUnitsTable);
