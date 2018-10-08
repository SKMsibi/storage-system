import React, { Component } from 'react';
import BusinessForm from './components/register-business-form';
import './App.css';

class App extends Component {
  render() {
    return (
      <div className="App">
        <header className="App-header">
          <BusinessForm />
        </header>
      </div>
    );
  }
}

export default App;
