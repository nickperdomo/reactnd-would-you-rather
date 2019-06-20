import React, { Component } from 'react'
import './QuestionToggle.scss'

class QuestionToggle extends Component {
  render() {
    const {
      questionFilter,
      handleQuestionFilter
    } = this.props

    return (
      <form className='questionToggle'>
          <label className={questionFilter === 'unanswered' ? 'questionToggleActive' : 'questionToggleInactive '}>
            <input
              type='radio'
              name='filter'
              value='unanswered'
              checked={questionFilter === 'unanswered'}
              onChange={(e) => handleQuestionFilter(e.target.value)}
            />
            Unanswered
          </label>
          <label className={questionFilter === 'answered' ? 'questionToggleActive' : 'questionToggleInactive '}>
            <input
              type='radio'
              name='filter'
              value='answered'
              checked={questionFilter === 'answered'}
              onChange={(e) => handleQuestionFilter(e.target.value)}
            />
            Answered
          </label>
        </form>
    )
  }
}

export default QuestionToggle