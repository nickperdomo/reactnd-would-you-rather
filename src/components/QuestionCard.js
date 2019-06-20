import React, { Component } from 'react'
import { connect } from 'react-redux'
import { formatQuestion } from '../utils/helpers'
import './QuestionCard.scss'

class QuestionCard extends Component {
  render() {
    console.log(this.props)
    const authedUser = this.props.authedUser
    const {
      name,
      // id,
      // author,
      avatar,
      // timestamp,
      optionOne,
      optionTwo,
    } = this.props.question

    return (
      <div className='qContainer'>
        <img className='qAvatar' src={avatar} alt={`${name}'s avatar`} />
        <div>
          <span className='qAuthor'>{name} asks:</span>
          <div className='qBubble'> 
            <p>
              <span className='qIntro'>Would you rather&hellip;</span>
              <span className='qOptions'>
                {optionOne.text} 
                <span className='qOptionOr'> or </span>
                {optionTwo.text}
              </span>
            </p>
            <button className='qBtn' type='button'>View Poll</button>
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
    question: formatQuestion(authedUser, users[question.author], question)
  }
}

export default connect(mapStateToProps)(QuestionCard)