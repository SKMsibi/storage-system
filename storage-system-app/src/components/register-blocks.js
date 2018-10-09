import React, { Component } from 'react';
import { connect } from 'react-redux';
import BlockForm from './insert-block-form';
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
                        <button>Insert Blocks</button>
                    )}
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
