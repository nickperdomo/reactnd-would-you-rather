import React, { Component } from 'react'
import { connect } from 'react-redux'
import { Link } from 'react-router-dom'
import { formatQuestion } from '../utils/helpers'
import './QuestionCard.scss'

class QuestionCard extends Component {
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
                  checked={true}
                  // onChange={handleQuestionFilter}
                />
                {`${optionOne.text}?`}
              </label>
              <label className='qOption pollChoice-label'>
                <input
                  type='radio'
                  name='choice'
                  value='optionTwo'
                  // checked={questionFilter === 'answered'}
                  // onChange={handleQuestionFilter}
                />
                {`${optionTwo.text}?`}
              </label>
              <button className='qBtn'>Vote</button>
            </form>
          </div>
        </div>
      </div>
    )


    const displayCard = () => {
      switch (this.props.mode) {
        case 'question':
          return questionCard
        case 'poll':
          return pollCard  
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