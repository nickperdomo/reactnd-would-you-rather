import React, { Component } from 'react'
import './LeaderCard.scss'


class LeaderCard extends Component {
  render() {
    const {
      id,
      name,
      avatarURL,
      answerCount,
      questionCount,
      totalScore,
    } = this.props.user
    const rank = this.props.rank
    //TODO: rank = Append ordinals based on last digit

    return (
      <div className='qContainer leaderContainer'>
        <img className='qAvatar leaderAvatar' src={avatarURL} alt={`${name}'s avatar`} />
        <span className='leaderRank'>{rank + 1}</span>
        <div>
          <div className='qBubble'> 
            <h2 className='leaderName'>{name}</h2>
            <div className='leaderStats'>
              <div className='leaderStatsCol'>
                <h3 className='leaderStatsTitle'>Answered Questions</h3>
                <p className='leaderStatsNum'>{answerCount}</p>
              </div>
              <div className='leaderStatsCol'>
                <h3 className='leaderStatsTitle'>Created Questions</h3>
                <p className='leaderStatsNum'>{questionCount}</p>
              </div>
              <div className='leaderStatsCol'>
                <h3 className='leaderStatsTitle'>Total Score</h3>
                <p className='leaderStatsNum'>{totalScore}</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    )
  }
}

export default LeaderCard