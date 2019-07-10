import React, { Component } from 'react'
import { connect } from 'react-redux'
import './Home.scss'
import QuestionToggle from '../components/QuestionToggle'
import QuestionCard from '../components/QuestionCard'
import { hasAnswered } from './shared'

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

function mapStateToProps({authedUser, questions}) {
  return {
    authedUser,
    questions,
  }
}

export default connect(mapStateToProps)(Home)