import React, { Component } from 'react'
import { connect } from 'react-redux'
import { withRouter } from 'react-router-dom'
import './Poll.scss'
import QuestionCard from '../components/QuestionCard'

class Poll extends Component {
  render() {
    const { question_id } = this.props.match.params
    console.log("Poll props: ", this.props)

    return (
      <QuestionCard id={question_id} mode='poll'/>
    )
  }
}


// export default withRouter(connect(mapStateToProps)(Poll))
export default withRouter(Poll)