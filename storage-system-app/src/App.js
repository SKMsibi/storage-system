import React, { Component } from 'react';
import SignUp from './components/sign-up'
import './App.css';

class App extends Component {
  render() {
    return (
      <div className="App">
        <SignUp {...this.props} />
      </div>
    );
  }
}

export default App;
