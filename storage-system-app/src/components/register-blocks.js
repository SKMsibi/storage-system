import React, { Component } from 'react';
import '../App.css';

class RegisterBlocks extends Component {
    render() {
        return (
            <div className="register-blocks">
                <header className="App-header">
                    <label>How many blocks are you adding?</label>
                    <input type="numb" name="number-of-blocks" />
                </header>
            </div>
        );
    }
}

export default RegisterBlocks;
