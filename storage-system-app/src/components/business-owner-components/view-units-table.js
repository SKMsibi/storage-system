import React, { Component } from 'react'
import { connect } from 'react-redux';
import { PlaceOrder, removeOrder } from '../../redux/thunks'
import "../../App.css"

export default class ViewUnitsTable extends Component {
    formatDate(date) {
        var daysOfTheWeek = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];
        var monthsOfTheYear = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
        var newDate = new Date(date);
        return { time: `${newDate.getHours()}:${newDate.getMinutes()}`, day: `${daysOfTheWeek[newDate.getDay()]}`, date: `${newDate.getDate()}-${monthsOfTheYear[newDate.getMonth()]}-${newDate.getYear()}` }
    }
    render() {
        return (
            <div>
                {this.props.units.length <= 0 ? <h4>There are not rented out units.</h4> :
                    <table key="unitsTable" className="unitsTable">
                        <thead>
                            <tr>
                                <th>No.</th>
                                <th>Business name</th>
                                <th>Unit Name</th>
                                <th>Block name</th>
                                <th>Region</th>
                                <th>City</th>
                                <th>Rented date</th>
                            </tr>
                        </thead>
                        <tbody>
                            {this.props.units.map(singleUnit => {
                                var dateFormated = this.formatDate(singleUnit.bookdate)
                                return <tr key={this.props.units.indexOf(singleUnit)}>
                                    <td>{this.props.units.indexOf(singleUnit) + 1}</td>
                                    <td>{singleUnit.businessname}</td>
                                    <td>{singleUnit.unitsname}</td>
                                    <td>{singleUnit.blockname}</td>
                                    <td>{singleUnit.region}</td>
                                    <td>{singleUnit.city}</td>
                                    {this.props.showOrderButton ? null : <td>{dateFormated.time}<br />{dateFormated.day}<br />{dateFormated.date}</td>}
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
