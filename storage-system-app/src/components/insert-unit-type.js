import React, { Component } from 'react';
import { UnitTypeForm } from "./forms/insert-unit-type-form";
import '../App.css';

export default class InsertUniteType extends Component {
    render() {
        return (
            <div className="register-blocks">
                <header className="App-header">
                    <h3>How many unites are you inserting?</h3>
                    <UnitTypeForm />
                </header>
            </div>
        );
    }
}