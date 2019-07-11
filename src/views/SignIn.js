import React, { Component } from 'react'
import { connect } from 'react-redux'
import { Redirect, withRouter } from 'react-router'
import './SignIn.scss'
import { setAuthedUser } from '../actions/authedUser'

class SignIn extends Component {
  state = {
    redirectToReferrer: false,
    selectedUserId: '',
    // selectedUserId: Object.keys(this.props.users)
    //   .sort((a,b) => (a.name > b.name) ? 1 : -1)[0]
  }

  handleUserSelect = (e) => {
    const userId = e.target.value
    this.setState(() => ({
      selectedUserId: userId
    }))
  }

  handleSignIn = (e) => {
    e.preventDefault()
    const {
      dispatch,
      history,
    } = this.props
    const selectedUserId = this.state.selectedUserId

    dispatch(setAuthedUser(selectedUserId))
    this.setState(() => ({
      redirectToReferrer: true
    }))
     history.replace('/')
  }
  
  render() {
    const {
      users,
    } = this.props

    const usersIds = Object.keys(users)

    const { 
      redirectToReferrer, 
      selectedUserId
    } = this.state

    const { from } = this.props.location.state || { from: { pathname: '/' } }

    const usersByName = usersIds.map( id => {
      const user = users[id]
      return {
        id: user.id,
        name: user.name,
        avatarURL: user.avatarURL,
      }
    }).sort((a,b) => (a.name > b.name) ? 1 : -1)
    
    if (redirectToReferrer === true) {
      return <Redirect to={from} />
    }

    return (
      <main>
        <h1 className='viewTitle'>Would You Rather?</h1>
        <div className='qContainer leaderContainer signInCont'>
          <div className='leaderAvatarCont'>
            {selectedUserId !== ''
              ?  <img 
                  className='qAvatar leaderAvatar'
                  src={users[selectedUserId].avatarURL}
                  alt={`${users[selectedUserId].name}'s avatar`} 
                 />
              : null
            }           
          </div>
          <div className='qBubble'> 
            <p className='qIntro'>Select a user to play!</p>
            <form>
              <select
                className='userSelect'
                // value='empty'
                defaultValue='empty'
                onChange={this.handleUserSelect}
              >
                <option key={'empty'} value='empty'></option>
                {usersByName.map( user => (
                  <option key={user.id} value={user.id}>{user.name}</option>
                ))}
              </select>
              <button
                className='siginBtn'
                onClick={this.handleSignIn}
              >
                Sign In
              </button>
            </form>
          </div>
        </div>
      </main>
    )
  }
}

function mapStateToProps({users}) {
  return {
    users,
  }
}

export default withRouter(connect(mapStateToProps)(SignIn))