import React, { Component } from 'react';
import BusinessForm from './components/forms/register-business-form';
import './App.css';

class App extends Component {
  render() {
    return (
      <div className="App">
        <div className="App-container">
          <BusinessForm />
        </div>
      </div>
    );
  }
}

export default App;
