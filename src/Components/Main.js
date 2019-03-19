import React, { Component } from 'react';
import './App.css';
import Form from './Form';
import tWriter from '../tWriter';

class Main extends Component {
  
  componentDidMount() {
    tWriter();
  }

  render() {
    return (
      <div className="App">
        <header className="App-header">
        </header>
        <div id="sub">
          <div className="opacity">
            <h2 className="tw"></h2>
            <Form />
          </div>
        </div>
        <div id="triangle-topright"></div>
      </div>
    );
  }
}

export default Main;
