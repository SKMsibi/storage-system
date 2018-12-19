import React, { Component } from 'react';
import { connect } from 'react-redux';
import { getAllRentedUnits } from '../../redux/thunks';
import ViewUnitsTable from './view-units-table';


class viewRentedUnits extends Component {
    componentDidMount = () => {
        this.props.getAllRentedUnits();
    }

    render() {
        return (
            <div className="App-container">
                <p>Rented out units.</p>
                <ViewUnitsTable units={this.props.rentedOutUnits} />
            </div>
        )
    }
}

const mapStateToProps = (state) => {
    return {
        rentedOutUnits: state.displayUnits.allRentedOutUnits
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        getAllRentedUnits: () => {
            dispatch(getAllRentedUnits())
        }
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(viewRentedUnits)