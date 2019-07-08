import React, { Component } from 'react'
import { connect } from 'react-redux'
// import { withRouter } from 'react-router-dom'
import { formatQuestion } from '../utils/helpers'

class PollResultsCard extends Component {
   
    render() {
      const authedUser = this.props.authedUser
      const {
        name,
        id,
        // author,
        avatar,
        optionOne,
        optionTwo,
      } = this.props.question
      // TODO: Capture selectedChoice
      const selectedChoice = 'optionOne'
      
      return (
        <div className='qContainer'>
          <img className='qAvatar' src={avatar} alt={`${name}'s avatar`} />
          <div>
            <span className='qAuthor'>{name} asks:</span>
            <div className='qBubble'> 
              <p>
                <span className='qIntro'>Would you rather&hellip;</span>
              </p>
              <form className='poll'>
                <label className='qOption pollChoice-label'>
                  <input
                    type='radio'
                    name='choice'
                    value='optionOne'
                    checked={selectedChoice === 'optionOne'}
                    readOnly
                  />
                  {`${optionOne.text}?`}
                </label>
                <label className='qOption pollChoice-label'>
                  <input
                    type='radio'
                    name='choice'
                    value='optionTwo'
                    checked={selectedChoice === 'optionTwo'}
                    readOnly
                  />
                  {`${optionTwo.text}?`}
                </label>
              </form>
            </div>
          </div>
        </div>
      )
  }
}

function mapStateToProps({authedUser, users, questions}, {id}) {
  const question = questions[id]
  return {
    authedUser,
    question: formatQuestion(authedUser, users[question.author], question),
  }
}


export default connect(mapStateToProps)(PollResultsCard)