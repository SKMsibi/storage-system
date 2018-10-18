import React, { Component } from 'react'
import { Link } from 'react-router-dom'

export default class navbar extends Component {

    render() {
        return (
            <header className="nav">
                <Link to="/"><button className="navigation-button">Register Business</button></Link>
                <Link to="/insertLocation"><button className="navigation-button">Business location</button></Link>
                <Link to="/insertBlocks"><button className="navigation-button">Insert Blocks</button></Link>
                <Link to="/insertUnitType"><button className="navigation-button">Insert unites</button></Link>
                <Link to="/displayBusinessData"><button className="navigation-button">view Business</button></Link>
            </header>
        )
    }
}
