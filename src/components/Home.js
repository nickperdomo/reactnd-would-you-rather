import React, { Component } from 'react'
import { connect } from 'react-redux'
import './Home.scss'
import QuestionCard from './QuestionCard';

class Home extends Component {
  render() {
    const {
      authedUser,
      questions,
    } = this.props
    const unanswered = []
    const answered = []
    let filteredQuestions = []
    const questionIds = Object.keys(questions).sort(
      (a,b) => questions[b].timestamp - questions[a].timestamp
    )
    
    questionIds.forEach( id => {
      hasAnswered(authedUser, questions[id]) 
        ? answered.push(questions[id])
        : unanswered.push(questions[id])
    })
    console.log("answered: ", answered)
    console.log("unanswered: ", unanswered)

    // TODO: Make toggle a controlled component
    const toggle = 'unanswered'
    toggle === 'unanswered'
      ? filteredQuestions = unanswered
      : filteredQuestions = answered
      


    return (
      <div>
        <h1 className='viewTitle'>Questions</h1>
        <form>
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
        </form>
        <ul className='questionList'>
          {filteredQuestions.map((question) => (
            <li key={question.id}>
              <QuestionCard id={question.id} />
            </li>
          ))}
        </ul>
      </div>
    )
  }
}

function hasAnswered(authedUser, question) {
  const votes = [
    ...question.optionOne.votes,
    ...question.optionTwo.votes,
  ]
  const answered = votes.indexOf(authedUser) === -1 ? false : true

  return answered
}

function mapStateToProps({authedUser, questions}) {
  return {
    authedUser,
    questions,
  }
}

export default connect(mapStateToProps)(Home)