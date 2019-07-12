import React, { Component } from 'react'
import { connect } from 'react-redux'
import { withRouter } from 'react-router-dom'
import { hasAnswered } from './shared'
import './Poll.scss'
import PollCard from '../components/PollCard'
import PollResultsCard from '../components/PollResultsCard'
import NotFound from './NotFound';


class Poll extends Component {

  render() {
    const { question_id } = this.props.match.params
    const { 
      authedUser,
      questions
    } = this.props
    
    if (!questions[question_id]) {
      return <NotFound />
    }
    
    return (
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