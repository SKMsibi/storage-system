import React, { Component } from 'react'
import { connect } from 'react-redux';
import { PlaceOrder } from '../redux/thunks'
import "../App.css"

class ViewUnitsTable extends Component {
    placeOrder(details) {
        this.props.placeOrder(details);
    }
    render() {
        return (
            <div>
                {this.props.units.length <= 0 ? <h4>Sorry No units are available for the selected options.</h4> :
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
                                <th></th>
                            </tr>
                        </thead>
                        <tbody>
                            {this.props.units.map(singleUnit =>
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
                                    <td><button onClick={() => this.placeOrder(singleUnit)}>Order</button></td>
                                </tr>
                            )}
                        </tbody>
                    </table>
                }
            </div>
        )
    }
}
const mapStateToProps = (state) => {
    return {
        units: state.displayUnits.allUnits
    }
}
const mapDispatchToProps = (dispatch) => {
    return {
        placeOrder: (unitDetails) => {
            dispatch(PlaceOrder(unitDetails))
        }
    }
}
export default connect(mapStateToProps, mapDispatchToProps)(ViewUnitsTable);
