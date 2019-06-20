import React, { Component } from 'react'
import './Nav.scss'

class Nav extends Component {
  render() {
    return (
      <nav className='nav'>
        <div className='navInner'>
          <ul>
            <li key='home'>Home</li>
            <li key='newQuestion'>New Question</li>
            <li key='leaderboard'>Leaderboard</li>
          </ul>
          <div className='signOutContainer'>
            <span>Sign out</span>
            <img src='' alt='' />
          </div>
        </div>
      </nav>
    )
  }
}

export default Nav