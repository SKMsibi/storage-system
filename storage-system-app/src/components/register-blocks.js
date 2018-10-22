import React, { Component } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom'
import { connect } from 'react-redux';
import BlockForm from './forms/insert-block-form';
import '../App.css';

export class RegisterBlocks extends Component {
    constructor(props) {
        super(props)
        this.state = {
            allBusiness: [],
            showForm: false,
            numberOfBlocks: 1,
            blocks: [],
            showBlocksInsert: false,
            selectedBusiness: ""
        }
        this.handleChange = this.handleChange.bind(this);
        this.createBlockForms = this.createBlockForms.bind(this);
        this.submitBlocks = this.submitBlocks.bind(this);
    }
    async componentDidMount() {
        var allTheBusiness = await axios.get('http://localhost:3003/businesses');
        this.setState({ allBusiness: allTheBusiness.data });
    }
    handleChange(event) {
        this.setState({ numberOfBlocks: event.target.value, showBlocksInsert: false });
    }
    createBlockForms() {
        var arrTemp = [];
        for (let index = 1; index <= this.state.numberOfBlocks; index++) {
            arrTemp.push(index);
        }
        this.setState({ blocks: arrTemp, showBlocksInsert: true })
    }
    async submitBlocks() {
        var sendingBlocks = await axios.post('http://localhost:3003/submitBlocks', { formValues: this.props.blocksData.InsertBlockForm.values, businessName: this.state.selectedBusiness });
        if (sendingBlocks.status === 201) {
            this.setState({ shouldRedirect: true })
        } else {
            this.setState({ error: true, errorMessage: sendingBlocks.data })
        }
    }
    handleBusinessSelection() {
        if (this.refs.select.value === "Select Business") {
            this.setState({ showForm: false })
        } else {
            this.setState({ showForm: true, selectedBusiness: this.refs.select.value })
        }
    }
    render() {
        return (
            <div className="register-blocks">
                <div className="App-container">
                    <label>Select the business you want to insert Blocks for.</label>
                    <select ref="select" onChange={() => this.handleBusinessSelection()}>
                        <option value="Select Business">Select Business</option>
                        {this.state.allBusiness.map(singleBusiness => {
                            return <option key={this.state.allBusiness.indexOf(singleBusiness)} value={singleBusiness.name}>{singleBusiness.name}</option>
                        })}
                    </select>
                    {this.state.showForm && (
                        <div className="block-form">
                            <label>How many blocks are you adding?</label><br />
                            <input type="number" min="1" name="numberOfBlocks" value={this.state.numberOfBlocks} onChange={this.handleChange} />
                            <button ref="addToDatabase" onClick={this.createBlockForms}>Go</button>
                            {this.state.blocks.map(item => {
                                return <BlockForm number={item} key={item} />
                            })}
                            {this.state.showBlocksInsert && (
                                <Link to="/insertUnitType"><button onClick={this.submitBlocks}>Insert Blocks</button></Link>
                            )}
                        </div>
                    )}
                    <Link to="/"><button>back</button></Link>
                </div>
            </div >
        );
    }
}

const mapStateToProps = state => {
    return { blocksData: state.form };
}
export default connect(mapStateToProps, null)(RegisterBlocks);
