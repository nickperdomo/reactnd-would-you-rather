import React, { Component } from 'react'
import { connect } from 'react-redux'
import { withRouter } from 'react-router-dom'
import { NavLink } from 'react-router-dom'
import './Nav.scss'
import { setAuthedUser } from '../actions/authedUser'

class Nav extends Component {
  
  handleSignout = (e) => {
    e.preventDefault()
    
    const { 
      dispatch,
      history
    } =this.props

    dispatch(setAuthedUser(null))
    history.replace('/signin')
  }

  render() {
    const {
      authedUser,
      users,
    } = this.props

    return (
      <nav className='nav'>
        <div className='navInner'>
          <ul>
            <li key='home'>
              <NavLink 
                exact to="/"
                className="navLink"
                activeClassName="navActiveView"
                >
                  Home
              </NavLink>
            </li>
            <li key='newQuestion'>
              <NavLink 
                exact to="/add"
                className="navLink"
                activeClassName="navActiveView"
                >
                  New Question
              </NavLink>
            </li>
            <li key='leaderboard'>
              <NavLink 
                exact to="/leaderboard"
                className="navLink"
                activeClassName="navActiveView"
                >
                  Leaderboard
              </NavLink>
            </li>
          </ul>
          <div className='signOutContainer'>
            {authedUser !== '' && authedUser !== null
              ? <>
                  <button 
                    className='navLink'
                    onClick={this.handleSignout}
                  >
                    Sign Out { users[authedUser].name.substring(0, users[authedUser].name.indexOf(' ')) }
                  </button>
                  <img 
                    src={users[authedUser].avatarURL}
                    alt={`${users[authedUser].name}'s avatar`} 
                  />
                </>
              : null
            }
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

export default withRouter(connect(mapStateToProps)(Nav))