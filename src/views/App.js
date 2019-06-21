import React, { Component } from 'react'
import { Route } from 'react-router-dom'
import { connect } from 'react-redux'
import { handleInitalData } from '../actions/shared'
import './App.scss';
import Nav from '../components/Nav'
import Home from './Home'
import NewQuestion from './NewQuestion'
import Leaderboard from './Leaderboard'
import SignIn from './SignIn'

class App extends Component {
  componentDidMount() {
    this.props.dispatch(handleInitalData())
  }

  render() {
    return (
      <div className="App">
        {this.props.loading === true
          ? null
          : <>
              <Nav />
              <Route exact path='/questions' component={Home} />
              <Route exact path='/add' component={NewQuestion} />
              <Route exact path='/leaderboard' component={Leaderboard} />
              <Route exact path='/' component={SignIn} />
            </>
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

export default connect(mapStateToProps)(App);