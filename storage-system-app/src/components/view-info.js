import React, { Component } from 'react'
import axios from 'axios'

export default class viewInfo extends Component {
    constructor(props) {
        super(props)
        this.state = {
            allBusiness: [],
            selectedBusiness: '',
            displaySelected: false,
            onlyShow: ''
        }
    }
    async componentDidMount() {
        var allTheBusiness = await axios.get('http://localhost:3003/business');
        this.setState({ allBusiness: allTheBusiness.data })
    }
    handleChange() {
        if (this.refs.select.value === "Select Business") {
            this.setState({ displaySelected: false })
        }
        else {
            this.setState({ displaySelected: true, selectedBusiness: this.refs.select.value })
        }
    }
    render() {
        return (
            <div className="App-container">
                <select ref="select" onChange={() => this.handleChange()}>
                    <option value="Select Business">Select Business</option>
                    {this.state.allBusiness.map(singleBusiness => {
                        return <option key={this.state.allBusiness.indexOf(singleBusiness)} value={singleBusiness.name}>{singleBusiness.name}</option>
                    })}
                </select>
                <select>
                    <option value="Select what to show">Select what to show</option>
                    <option value="Blocks">Blocks</option>
                    <option value="Unites">Unites</option>
                </select>
            </div>
        )
    }
}
