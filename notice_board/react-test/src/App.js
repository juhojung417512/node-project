import React, { Component } from 'react';
import "./App.css";
import Counter from "./Counter";

class App extends Component {
  render() {
    const name = "hello";
    
    return (
        <div className="App">
          <h1>{name}</h1>
          <Counter />
        </div>
    );
  }
}

export default App;
