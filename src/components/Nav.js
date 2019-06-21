import React, { Component } from 'react'
import { connect } from 'react-redux'
import { NavLink, Link } from 'react-router-dom'
import './Nav.scss'

class Nav extends Component {
  render() {
    const {
      authedUser,
      users
    } = this.props

    return (
      <nav className='nav'>
        <div className='navInner'>
          <ul>
            <li key='home'>
              <NavLink 
                exact to="/questions"
                activeClassName="navActiveView"
                >
                  Home
              </NavLink>
            </li>
            <li key='newQuestion'>
              <NavLink 
                exact to="/add"
                activeClassName="navActiveView"
                >
                  New Question
              </NavLink>
            </li>
            <li key='leaderboard'>
              <NavLink 
                exact to="/leaderboard"
                activeClassName="navActiveView"
                >
                  Leaderboard
              </NavLink>
            </li>
          </ul>
          <div className='signOutContainer'>
              <Link 
                exact to="/"
                >
                  <span>Sign out</span>
                  <img src={users[authedUser].avatarURL} alt={`${users[authedUser].name}'s avatar`} />
              </Link>
          </div>
        </div>
      </nav>
    )
  }
}

function mapStateToProps({authedUser, users}) {
  return {
    authedUser,
    users
  }
}

export default connect(mapStateToProps)(Nav)