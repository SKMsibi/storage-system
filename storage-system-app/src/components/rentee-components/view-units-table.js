import React, { Component } from 'react'
import { connect } from 'react-redux';
import { PlaceOrder, removeOrder } from '../../redux/thunks'
import jwtDecode from 'jwt-decode';
import "../../App.css";

class ViewUnitsTable extends Component {
    constructor(props) {
        super(props)
        this.state = {
            userMessage: "",
            showMessage: false
        }
    }

    removeUnitOrder(details) {
        this.props.removeUnits(details)
        this.props.updateAvailable();
    }
    placeOrder(details) {
        var token = sessionStorage.getItem("jwtToken");
        if (token && jwtDecode(token).role) {
            this.props.placeOrder(details, this.props.searchBy, this.props.searchPhrase);
            this.props.updateAvailable();
        } else {
            this.setState({ showMessage: true, userMessage: "Log-in or sign up to order." })
        }

    }
    formatDate(date) {
        var daysOfTheWeek = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];
        var monthsOfTheYear = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
        var newDate = new Date(date);
        return { time: `${newDate.getHours()}:${newDate.getMinutes()}`, day: `${daysOfTheWeek[newDate.getDay()]}`, date: `${newDate.getDate()}-${monthsOfTheYear[newDate.getMonth()]}-${newDate.getYear()}` }
    }
    render() {
        return (
            <div>
                {this.state.showMessage && (
                    <h5>{this.state.userMessage}</h5>
                )}
                {!this.props.units || this.props.units.length <= 0 ? <h4>Sorry No units are available.</h4> :
                    <table key="unitsTable" className="unitsTable">
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
                                {this.props.showOrderButton ? null : <th>Order date</th>}
                                <th></th>
                            </tr>
                        </thead>
                        <tbody>
                            {this.props.units.map(singleUnit => {
                                var dateFormated = this.formatDate(singleUnit.bookdate)
                                return <tr key={this.props.units.indexOf(singleUnit)}>
                                    <td>{this.props.units.indexOf(singleUnit) + 1}</td>
                                    <td>{singleUnit.unitsname}</td>
                                    <td>{singleUnit.blockname}</td>
                                    <td>{singleUnit.unittypename}</td>
                                    <td>{singleUnit.length}</td>
                                    <td>{singleUnit.width}</td>
                                    <td>{singleUnit.height}</td>
                                    <td>{singleUnit.region}</td>
                                    <td>{singleUnit.city}</td>
                                    {this.props.showOrderButton ? null : <td>{dateFormated.time}<br />{dateFormated.day}<br />{dateFormated.date}</td>}
                                    <td>< button onClick={() => this.props.showOrderButton ? this.placeOrder(singleUnit) : this.removeUnitOrder(singleUnit)}>{this.props.showOrderButton ? "Order" : "Remove Order"}</button> </td>
                                </tr>
                            }
                            )}
                        </tbody>
                    </table>
                }
            </div>
        )
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        placeOrder: (unitDetails, searchBy, searchPhrase) => {
            dispatch(PlaceOrder(unitDetails, searchBy, searchPhrase))
        },
        removeUnits: (unitDetails) => {
            dispatch(removeOrder(unitDetails))
        }
    }
}
const mapStateToProps = (state) => {
    return {
        searchBy: state.displayUnits.searchBy,
        searchPhrase: state.displayUnits.searchPhrase
    }
}
export default connect(mapStateToProps, mapDispatchToProps)(ViewUnitsTable);
