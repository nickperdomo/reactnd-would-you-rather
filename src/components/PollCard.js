import React, { Component } from 'react'
import { connect } from 'react-redux'
import { formatQuestion } from '../utils/helpers'
import { handleAddAnswer } from '../actions/questions'

class PollCard extends Component {
    state = {
      selectedChoice: 'optionOne',
    }
  
    handleChoiceChange = (e) => {
      const choice = e.target.value
      this.setState(()=> ({
        selectedChoice: choice
      }))
    }
  
    handleVote = (e) => {
      e.preventDefault()
     const {
       dispatch,
       question,
       authedUser,
     } = this.props
  
     const answer = this.state.selectedChoice
  
     dispatch(handleAddAnswer({
       authedUser,
       qid: question.id,
       answer,
     }))
    }
    
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
      const selectedChoice = this.state.selectedChoice
      
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
                    onChange={this.handleChoiceChange}
                  />
                  {`${optionOne.text}?`}
                </label>
                <label className='qOption pollChoice-label'>
                  <input
                    type='radio'
                    name='choice'
                    value='optionTwo'
                    checked={selectedChoice === 'optionTwo'}
                    onChange={this.handleChoiceChange}
                  />
                  {`${optionTwo.text}?`}
                </label>
                <button
                  type='submit'
                  className='qBtn'
                  onClick={this.handleVote}
                  >
                    Vote
                  </button>
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


export default connect(mapStateToProps)(PollCard)