import React, { Component } from 'react';
import { connect } from 'react-redux'
import { handleInitalData } from './actions/shared'
import './App.css';

class App extends Component {
  componentDidMount() {
    this.props.dispatch(handleInitalData())
  }

  render() {
    return (
      <div className="App">
       App
      </div>
    );
  }
}

export default connect()(App);