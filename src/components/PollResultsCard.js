import React, { Component } from 'react'
import { connect } from 'react-redux'
import { formatQuestion } from '../utils/helpers'

class PollResultsCard extends Component {
    countVotes = () => {
      const {
        optionOneVotes,
        optionTwoVotes,
      } = this.props.question

      return {
        optOne: optionOneVotes.length,
        optTwo: optionTwoVotes.length,
        get optOnePct() { return Math.round( (this.optOne / this.total) * 100) + '%' },
        get optTwoPct() { return Math.round( (this.optTwo / this.total) * 100) + '%' },
        get total() { return this.optOne + this.optTwo },
      }
    }

    render() {
      const { 
        authedUser,
        users,
      } = this.props
      const {
        name,
        id,
        avatar,
        optionOne,
        optionTwo,
      } = this.props.question
      
      const selectedChoice = users[authedUser].answers[id]
      const voteCount = this.countVotes()
      
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
                    <div className='resultsPct' style={{width: `${voteCount.optOnePct}`}}>
                      {`${voteCount.optOnePct}`}
                    </div>
                    <div className='resultsBar' style={{width: `${voteCount.optOnePct}`}}></div>
                  </div>
                  <p className='resultsVotes'>{`${voteCount.optOne}/${voteCount.total} votes`}</p>
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
                    <div className='resultsPct' style={{width: `${voteCount.optTwoPct}`}}>
                      {`${voteCount.optTwoPct}`}
                    </div>
                    <div className='resultsBar' style={{width: `${voteCount.optTwoPct}`}}></div>
                  </div>
                  <p className='resultsVotes'>{`${voteCount.optTwo}/${voteCount.total} votes`}</p>
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