import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import { getUserUnits } from '../../redux/thunks';

export class ViewUserUnits extends Component {
    static propTypes = {
        prop: PropTypes
    }
    componentDidMount = () => {
        this.props.getUserUnits();
    }

    render() {
        return (
            <div className="App-container">
                This is the user units component

            </div>
        )
    }
}

const mapStateToProps = (state) => ({

})

const mapDispatchToProps = (dispatch) => {
    return {
        getUserUnits: () => {
            dispatch(getUserUnits())
        }
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(ViewUserUnits)
