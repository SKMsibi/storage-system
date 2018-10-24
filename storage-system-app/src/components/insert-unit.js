import React, { Component } from 'react';
import { UnitTypeForm } from "./forms/insert-unit-type-form";
import '../App.css';

export default class InsertUnite extends Component {
    render() {
        return (
            <div className="register-blocks">
                <div className="App-container">
                    <h3>How many unites are you inserting?</h3>
                    <UnitTypeForm />
                </div>
            </div>
        );
    }
}