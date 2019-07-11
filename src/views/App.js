import React, { Component } from 'react'
import { Route, Switch } from 'react-router-dom'
import { connect } from 'react-redux'
// import LoadingBar from 'react-redux-loading'
import { handleInitalData } from '../actions/shared'
import PrivateRoute from '../components/PrivateRoute'
import Nav from '../components/Nav'
import Home from './Home'
import NewQuestion from './NewQuestion'
import Poll from './Poll'
import Leaderboard from './Leaderboard'
import SignIn from './SignIn'
import NotFound from './NotFound'
import './App.scss';


class App extends Component {
  componentDidMount() {
    this.props.dispatch(handleInitalData())
  }

  render() {
    // const authedUser = this.props.authedUser

    return (
      <div className="App">  
        <Nav />
        <Switch>
          <Route exact path='/signin' component={SignIn} />
          <PrivateRoute exact path='/' component={Home} />
          <PrivateRoute exact path='/add' component={NewQuestion} />
          <PrivateRoute exact path='/questions/:question_id' component={Poll} />
          <PrivateRoute exact path='/leaderboard' component={Leaderboard} />
          <Route component={NotFound} />
        </Switch>
      </div>
    )
  }
}

function mapStateToProps({authedUser}) {
  return {
    loading: authedUser === null,
    authedUser,
  }
}

export default connect(mapStateToProps)(App);