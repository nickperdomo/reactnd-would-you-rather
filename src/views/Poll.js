import React, { Component } from 'react'
import { connect } from 'react-redux'
import { withRouter } from 'react-router-dom'
import { hasAnswered } from './shared'
import './Poll.scss'
import PollCard from '../components/PollCard'
import PollResultsCard from '../components/PollResultsCard'


class Poll extends Component {

  render() {
    const { question_id } = this.props.match.params
    const { 
      authedUser,
      questions
    } = this.props
    
    return (
      // TODO: Unanswered = show PollCard
      //       Answered = show PollResultsCard
      hasAnswered(authedUser, questions[question_id]) !== true
        ? <PollCard id={question_id} />
        : <PollResultsCard id={question_id} />
      
    )
  }
}

function mapStateToProps({authedUser, questions}) {
  return {
    authedUser,
    questions,
  }
}

export default withRouter(connect(mapStateToProps)(Poll))
// export default withRouter(Poll)