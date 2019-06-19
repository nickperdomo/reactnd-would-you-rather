import React, { Component } from 'react'
import { connect } from 'react-redux'
import { formatQuestion } from '../utils/helpers'

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
      <div>
        <img src={avatar} alt={`${name}'s avatar`} />
        <span>{name} asks:</span> 
        <p>Would you rather&hellip;<br />
          <span>{optionOne.text}</span> or
          <span> {optionTwo.text}</span>
        </p>
        <button type='button'>View Poll</button>

        {/* <form>
          <label>
            <input
              type='radio'
              name='filter'
              value='Unanswered'
              defaultChecked
            />
            Unanswered
          </label>
          <label>
            <input
              type='radio'
              name='filter'
              value='Answered'
            />
            Answered
          </label>
        </form> */}
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