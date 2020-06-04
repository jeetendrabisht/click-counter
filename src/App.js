import React, { Component } from 'react';
import './App.css';

class App extends Component {
  constructor(props) {
    super(props);

    this.state = {
      counter: 0
    };
  }
  render() {
    return (
      <div data-test="component-app">
        <h1 data-test="counter-currentvalue-app">Counter set to {this.state.counter}</h1>
        <button
          data-test="increment-button-app"
          onClick={() => this.setState({counter : this.state.counter + 1}) }
        >
          Increment Counter
            </button>
      </div>
    );
  }
}

export default App;
