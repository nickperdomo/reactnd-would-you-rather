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
    
    const rankColor = (rank) => {
      switch (rank) {
        case 1 :
          return 'leaderRank-gold'
        case 2 :
          return 'leaderRank-silver'
        case 3 :
          return 'leaderRank-bronze'
        default :
          return  'leaderRank-default'
      }
    }

    return (
      <div className='qContainer leaderContainer'>
        <div className='leaderAvatarCont'>
          <img className={'qAvatar leaderAvatar ' + rankColor(rank)} src={avatarURL} alt={`${name}'s avatar`} />
          <span className={'leaderRank ' + rankColor(rank)}>{rank}</span>
        </div>
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
    )
  }
}

export default LeaderCard