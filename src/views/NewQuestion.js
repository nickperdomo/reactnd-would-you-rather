import React, { Component } from 'react'
import './NewQuestion.scss'
import NewQuestionCard from '../components/NewQuestionCard'

class NewQuestion extends Component {
  render() {
    return (
      <div>
        <NewQuestionCard />
      </div>
    )
  }
}

export default NewQuestion