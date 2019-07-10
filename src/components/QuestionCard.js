import React, { Component } from 'react'
import { connect } from 'react-redux'
import { Link } from 'react-router-dom'
import { formatQuestion } from '../utils/helpers'
import './QuestionCard.scss'


class QuestionCard extends Component {
  render() {
    const {
      name,
      id,
      avatar,
      optionOne,
      optionTwo,
    } = this.props.question

    return (
      <div className='qContainer'>
        <img className='qAvatar' src={avatar} alt={`${name}'s avatar`} />
        <div>
          <span className='qAuthor'>{name} asks:</span>
          <div className='qBubble'> 
            <p className='qBlurb'>
              <span className='qIntro'>Would you rather&hellip;</span>
              <span className='qOption'>
                {optionOne.text} 
                <span className='qOptionOr'> or </span>
                {optionTwo.text}?
              </span>
            </p>
            <Link to={`/questions/${id}`} className='qBtn'>View Poll</Link>
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

export default connect(mapStateToProps)(QuestionCard)