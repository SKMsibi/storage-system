import React, { Component } from 'react'
import { connect } from 'react-redux'
import ViewUnitsTable from '../view-units-table';
import { getUserUnits } from '../../redux/thunks';

export class ViewUserUnits extends Component {
    componentDidMount = () => {
        this.props.getUserUnits();
    }

    render() {
        return (
            <div className="App-container">
                <h3>Your current rented Units</h3>
                <ViewUnitsTable units={this.props.units} showOrderButton={false} updateAvailable={() => this.props.getUserUnits()} />
            </div>
        )
    }
}

const mapStateToProps = (state) => ({
    units: state.displayUnits.allUserUnits
})

const mapDispatchToProps = (dispatch) => {
    return {
        getUserUnits: () => {
            dispatch(getUserUnits())
        }
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(ViewUserUnits)
