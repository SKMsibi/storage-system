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
            numberOfBlocks: 1,
            blocks: [],
            showBlocksInsert: false
        }
        this.handleChange = this.handleChange.bind(this);
        this.createBlockForms = this.createBlockForms.bind(this);
        this.submitBlocks = this.submitBlocks.bind(this);
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
        var sendingBlocks = await axios.post('http://localhost:3003/submitBlocks', this.props.blocksData.InsertBlockForm.values);
        if (sendingBlocks.status === 201) {
            this.setState({ shouldRedirect: true })
        } else {
            this.setState({ error: true, errorMessage: sendingBlocks.data })
        }
    }
    render() {
        return (
            <div className="register-blocks">
                <header className="App-header">
                    <label>How many blocks are you adding?</label>
                    <input type="number" min="1" name="numberOfBlocks" value={this.state.numberOfBlocks} onChange={this.handleChange} />
                    <button onClick={this.createBlockForms}>Go</button>
                    {this.state.blocks.map(item => {
                        return <BlockForm number={item} key={item} />
                    })}
                    {this.state.showBlocksInsert && (
                        <Link to="/insertUnitType"><button onClick={this.submitBlocks}>Insert Blocks</button></Link>
                    )}
                    <Link to="/"><button>back</button></Link>
                </header>
            </div>
        );
    }
}

const mapStateToProps = state => {
    return { blocksData: state.form };
}
export default connect(mapStateToProps, null)(RegisterBlocks);
