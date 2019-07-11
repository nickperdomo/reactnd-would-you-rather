import React, { Component } from 'react'
import { connect } from 'react-redux'
import { Route, withRouter } from 'react-router-dom'
import { NavLink, Link } from 'react-router-dom'
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
      location,
    } = this.props

    return (
      <>
      {location.pathname.match('/signin')
        ? null
        : <nav className='nav'>
          <div className='navInner'>
            <ul>
              <li key='home'>
                <NavLink 
                  exact to="/questions"
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
                {/* <Link 
                  to="/signin"
                  className="navLink"
                  >
                    <span>Sign out</span>
                    <img src={users[authedUser].avatarURL} alt={`${users[authedUser].name}'s avatar`} />
                </Link>
                <Route path="/signin" component={SignIn} /> */}
              <button
                onClick={this.handleSignout}
              >
                Sign Out
              </button>   
            </div>
        </div>
      </nav>
      }
      </>
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