import React, { Component } from 'react'
import { Route, Switch } from 'react-router-dom'
import { connect } from 'react-redux'
import LoadingBar from 'react-redux-loading'
import { handleInitalData } from '../actions/shared'
import './App.scss';
import Nav from '../components/Nav'
import Home from './Home'
import NewQuestion from './NewQuestion'
import Leaderboard from './Leaderboard'
import SignIn from './SignIn'
import NotFound from './NotFound'

class App extends Component {
  componentDidMount() {
    this.props.dispatch(handleInitalData())
  }

  render() {
    return (
      <div className="App">
        <LoadingBar style={{backgroundColor: '#0d68cf'}}/>
        {this.props.loading === true
          ? null
          : <>
              <Nav />
              <Switch>
                <Route exact path='/questions' component={Home} />
                <Route exact path='/add' component={NewQuestion} />
                <Route exact path='/leaderboard' component={Leaderboard} />
                <Route exact path='/signin' component={SignIn} />
                <Route component={NotFound} />
              </Switch>
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