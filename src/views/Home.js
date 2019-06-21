import React, { Component } from 'react'
import { connect } from 'react-redux'
import './Home.scss'
import Nav from '../components/Nav'
import QuestionToggle from '../components/QuestionToggle'
import QuestionCard from '../components/QuestionCard'

class Home extends Component {
  state = {
    questionFilter: 'unanswered'
  }

  handleQuestionFilter = (e) => {
    const filter = e.target.value
    this.setState(() => ({
      questionFilter: filter
    }))
  }

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
    // console.log("answered: ", answered)
    // console.log("unanswered: ", unanswered)
    this.state.questionFilter === 'unanswered'
      ? filteredQuestions = unanswered
      : filteredQuestions = answered
      


    return (
      <main>
        <h1 className='viewTitle'>Questions</h1>
        <QuestionToggle 
          questionFilter={this.state.questionFilter}
          handleQuestionFilter={this.handleQuestionFilter} 
        />
        <ul className='questionList'>
          {filteredQuestions.map((question) => (
            <li key={question.id}>
              <QuestionCard id={question.id} />
            </li>
          ))}
        </ul>
      </main>
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