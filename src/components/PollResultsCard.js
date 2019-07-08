import React, { Component } from 'react'
import { connect } from 'react-redux'
// import { withRouter } from 'react-router-dom'
import { formatQuestion } from '../utils/helpers'

class PollResultsCard extends Component {
    render() {
      const { 
        authedUser,
        users,
      } = this.props
      const {
        name,
        id,
        // author,
        avatar,
        optionOne,
        optionTwo,
      } = this.props.question
      
      const selectedChoice = users[authedUser].answers[id]
      //TODO: Capture votes and calculate percentages
    
      
      return (
        <div className='qContainer'>
          <img className='qAvatar' src={avatar} alt={`${name}'s avatar`} />
          <div>
            <span className='qAuthor'>{name} asks:</span>
            <div className='qBubble'> 
              <p>
                <span className='qIntro'>Would you rather&hellip;</span>
              </p>
              <form className='pollResults' readOnly>
                <label className='qOption pollChoice-label'>
                  <input
                    type='radio'
                    name='choice'
                    value='optionOne'
                    checked={selectedChoice === 'optionOne'}
                    readOnly
                  />
                  {`${optionOne.text}?`}
                </label>
                <div className='resultsCont'>
                  <div className='resultsTrack'>
                    <div className='resultsPct' style={{width: '40%'}}>100%</div>
                    <div className='resultsBar' style={{width: '40%'}}></div>
                  </div>
                  <p className='resultsVotes'>3/3 votes</p>
                </div>
                <label className='qOption pollChoice-label'>
                  <input
                    type='radio'
                    name='choice'
                    value='optionTwo'
                    checked={selectedChoice === 'optionTwo'}
                    readOnly
                  />
                  {`${optionTwo.text}?`}
                </label>
                <div className='resultsCont'>
                  <div className='resultsTrack'>
                    <div className='resultsPct' style={{width: '80%'}}>100%</div>
                    <div className='resultsBar' style={{width: '80%'}}></div>
                  </div>
                  <p className='resultsVotes'>3/3 votes</p>
                </div>
              </form>
            </div>
          </div>
        </div>
      )
  }
}

function mapStateToProps({authedUser, users, questions}, {id}) {
  const question = questions[id]
  return {
    authedUser,
    users,
    question: formatQuestion(authedUser, users[question.author], question),
  }
}


export default connect(mapStateToProps)(PollResultsCard)