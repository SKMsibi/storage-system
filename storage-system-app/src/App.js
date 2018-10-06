import React, { Component } from 'react';
import BusinessForm from './components/redux-form';
import './App.css';

class App extends Component {
  submit(data) {
    console.log("data", data);
  }
  render() {
    return (
      <div className="App">
        <header className="App-header">
          <BusinessForm handleSubmit={this.submit.bind(this)} />
        </header>
      </div>
    );
  }
}

export default App;
