import React, { Component } from 'react'
import { Route, Redirect, withRouter } from 'react-router-dom'
import { connect } from 'react-redux'

const PrivateRoute = ( {component: Component, authedUser, ...rest} ) => (
  <Route {...rest} render={(props) => (
    // isAuthenticated === true
    authedUser !== null
      ? <Component {...props} />
      : <Redirect to={{
          pathname: '/signin',
          state: { from: props.location }
        }} />
  )} />
)

const mapStateToProps = ({ authedUser }) => ({
  // isAuthenticated: authedUser !== null
  authedUser,
})

export default withRouter(connect(mapStateToProps)(PrivateRoute))
