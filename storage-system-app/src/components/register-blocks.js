import React, { Component } from 'react';
import { connect } from 'react-redux';
import '../App.css';

export class RegisterBlocks extends Component {
    
    render() {
        return (
            <div className="register-blocks">
                <header className="App-header">
                    <label>How many blocks are you adding?</label>
                    <input type="numb" name="numberOfBlocks" />
                </header>
            </div>
        );
    }
}

const mapStateToProps = state => {
    return { businessInfo: state };
}
const mapDispatchToProps = dispatch => ({
})
export default connect(mapStateToProps, mapDispatchToProps)(RegisterBlocks);
