import React, { Component } from 'react'
import { connect } from 'react-redux'
import { Link } from 'react-router-dom'
import { formatQuestion } from '../utils/helpers'
import './QuestionCard.scss'
import { cardMode } from '../views/shared'
import { handleAddAnswer } from '../actions/questions'

class QuestionCard extends Component {
  state = {
    selectedChoice: 'optionOne',
    cardMode: cardMode.question
  }

  handleChoiceChange = (e) => {
    const choice = e.target.value
    this.setState(()=> ({
      selectedChoice: choice
    }))
  }

  handleVote = (e) => {
    // TODO: Save choice to API
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
    
    // this.setState(()=> ({
    //   mode: cardMode.pollResults
    // }))
  }
  
  render() {
    // console.log(this.props)
    const authedUser = this.props.authedUser
    const {
      name,
      id,
      // author,
      avatar,
      // timestamp,
      optionOne,
      optionTwo,
    } = this.props.question
    const { 
      mode,
      // handleVote,
    } = this.props
    const selectedChoice = this.state.selectedChoice
    

    const questionCard = (
      <div className='qContainer'>
        <img className='qAvatar' src={avatar} alt={`${name}'s avatar`} />
        <div>
          <span className='qAuthor'>{name} asks:</span>
          <div className='qBubble'> 
            <p>
              <span className='qIntro'>Would you rather&hellip;</span>
              <span className='qOption'>
                {optionOne.text} 
                <span className='qOptionOr'> or </span>
                {optionTwo.text}?
              </span>
            </p>
            <Link to={`/questions/${id}`} className='qBtn' >View Poll</Link>
          </div>
        </div>
      </div>
    )

    const pollCard = (
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

    const pollResultsCard = (
      <div>Poll Results</div>
    )


    const displayCard = () => {
      switch (mode) {
        case cardMode.question:
          return questionCard
        case cardMode.poll:
          return pollCard 
        case cardMode.pollResults:
          return pollResultsCard    
        default:
          return questionCard
      }
    }

    return (
      displayCard()
    )
  }
}

function mapStateToProps({authedUser, users, questions}, {id}) {
  const question = questions[id]
  return {
    authedUser,
    question: formatQuestion(authedUser, users[question.author], question)
  }
}

export default connect(mapStateToProps)(QuestionCard)