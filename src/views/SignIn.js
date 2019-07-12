import React, { Component } from 'react'
import { connect } from 'react-redux'
import { Redirect, withRouter } from 'react-router'
import './SignIn.scss'
import questionAvatarIco from '../img/questionAvatar.svg'
import { setAuthedUser } from '../actions/authedUser'

class SignIn extends Component {
  state = {
    redirectToReferrer: false,
    selectedUserId: '',
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

    const isDisabled = selectedUserId === ''

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
            {selectedUserId !== '' && selectedUserId !== null
              ? <img 
                  className='qAvatar leaderAvatar leaderRank-default'
                  src={users[selectedUserId].avatarURL}
                  alt={`${users[selectedUserId].name}'s avatar`} 
              />
              : <img 
                  className='qAvatar leaderAvatar leaderRank-default'
                  src={questionAvatarIco}
                  alt='Unknown avatar'
                />
            }
          </div>
          <div className='qBubble signinPanel'> 
            <p className='qIntro'>Select a user to play!</p>
            <form>
              <select
                className='userSelect'
                defaultValue=''
                onChange={this.handleUserSelect}
              >
                <option key={'empty'} value=''></option>
                {usersByName.map( user => (
                  <option key={user.id} value={user.id}>{user.name}</option>
                ))}
              </select>
              <button
                className='qBtn siginBtn'
                disabled={isDisabled}
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