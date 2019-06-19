import React, { Component } from 'react';
import { connect } from 'react-redux'
import { handleInitalData } from '../actions/shared'
import './App.css';
import Home from './Home'

class App extends Component {
  componentDidMount() {
    this.props.dispatch(handleInitalData())
  }

  render() {
    return (
      <div className="App">
        {this.props.loading === true
          ? null
          : <Home />
        } 
      </div>
    );
  }
}

function mapStateToProps({authedUser}) {
  return {
    loading: authedUser === null
  }
}

export default connect()(App);