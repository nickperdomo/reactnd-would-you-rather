import React, { Component } from 'react'
import { connect } from 'react-redux'
import { handleAddQuestion } from '../actions/questions'
import './NewQuestionCard.scss'

class NewQuestionCard extends Component {
    state = {
      optionOneText: '',
      optionTwoText: '',
    }
    
    handleOptionInput = (e) => {
      const option = e.target.name
      const text = e.target.value

      this.setState(()=> ({
        [option]: text,
      }))
    }

    handleCreate = (e) => {
      e.preventDefault()
      const {
       dispatch,
       authedUser,
       users,
      } = this.props
      const {
        optionOneText,
        optionTwoText,
      } = this.state

      dispatch(handleAddQuestion({
      //  authedUser,
       optionOneText,
       optionTwoText,
       author: authedUser,
     }))
     //TODO: Redirect to home
    }
    
    render() {
      const authedUser = this.props.authedUser
      const {
        optionOneText,
        optionTwoText,
      } = this.state
      const isDisabled = optionOneText.length > 0 && optionTwoText.length > 0

      return (
        <div className='qContainer newQ'>
          <div className='qBubble'> 
            <p>
              <span className='qIntro'>Would you rather&hellip;</span>
            </p>
            <form className='newQForm'>
              <input
                type='text'
                name='optionOneText'
                placeholder='first option'
                autoComplete='off'
                value={this.state.optionOneText}
                onChange={this.handleOptionInput}
              />
              <span className='qOptionOr'>or</span>
              <input
                type='text'
                name='optionTwoText'
                placeholder='second option'
                autoComplete='off'
                value={this.state.optionTwoText}
                onChange={this.handleOptionInput}
              />
            <button
              type='submit'
              className='qBtn'
              disabled={!isDisabled}
              onClick={this.handleCreate}
              >
                Create
              </button>
            </form>
          </div>
        </div>
      )
  }
}

function mapStateToProps({authedUser, users}) {
  return {
    authedUser,
    users,
  }
}


export default connect(mapStateToProps)(NewQuestionCard)