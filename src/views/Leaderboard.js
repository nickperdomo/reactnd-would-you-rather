import React, { Component } from 'react'
import { connect } from 'react-redux'
import './Leaderboard.scss'
import '../components/LeaderCard'
import LeaderCard from '../components/LeaderCard';

class Leaderboard extends Component {
  render() {
    const users = this.props.users
    const usersIds = Object.keys(users)

    const usersByRank = usersIds.map( id => {
      const user = users[id]
      return {
        id: user.id,
        name: user.name,
        avatarURL: user.avatarURL,
        answerCount: Object.keys(user.answers).length,
        questionCount: user.questions.length,
        get totalScore() { return this.answerCount + this.questionCount}
      }
    }).sort((a,b) => (a.totalScore < b.totalScore) ? 1 : -1)
    // console.log(usersByRank)

    return (
      <main>
        <h1 className='viewTitle'>Leaderboard</h1>
        <ul className='leaderList'>
          {usersByRank.map( (user, index) => (
            <li key={user.id}>
              <LeaderCard user={user} rank={index}/>
            </li>
          ))}
        </ul> 
      </main>
    )
  }
}



function mapStateToProps({users}) {
  return {
    users,
  }
}

export default connect(mapStateToProps)(Leaderboard)