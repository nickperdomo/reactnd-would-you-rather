import React, { Component } from 'react'
import { Link } from 'react-router-dom'
import './NotFound.scss'

class NotFound extends Component {
  render() {
    return (
      <div>
        <p>This page does not exist.</p>
        <Link to='/'>Go Home</Link>
      </div>
    )
  }
}

export default NotFound