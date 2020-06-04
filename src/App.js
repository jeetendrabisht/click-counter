import React, { Component } from 'react';
import './App.css';

class App extends Component {
  constructor(props) {
    super(props);

    this.state = {
      counter: 0,
      counterFlag: false
    };
  }

  /**
   * increment the counter
   * @function onIncrement
   * @returns null
  */
  onIncrement = () => {
    this.setState({ counter: this.state.counter + 1 });
    this.state.counterFlag && this.setState({ counterFlag : false});
    return null;
  }

  /**
   * decrement the counter
   * @function onDecrement
   * @returns null
  */
  onDecrement = () => {
    this.state.counter > 0 && this.setState({ counter: this.state.counter - 1});
    this.state.counter === 0 && !this.state.counterFlag && this.setState({ counterFlag : true});
    return null;
  }

  render() {
    return (
      <div data-test="component-app">
        <h1 data-test="counter-currentvalue-app">Counter set to {this.state.counter}</h1>
        {this.state.counterFlag && <h2 style={{color:'red'}} data-test="counter-error-message">The counter cannot go below zero</h2>}
        <button
          data-test="increment-button-app"
          onClick={this.onIncrement.bind(this)}
        >
          Increment Counter
          </button>
        <button
          data-test="decrement-button-app"
          onClick={this.onDecrement.bind(this)}
        >
          Decrement Counter
            </button>
      </div>
    );
  }
}

export default App;
