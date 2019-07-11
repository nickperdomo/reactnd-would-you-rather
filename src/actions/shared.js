import { getInitialData } from '../utils/api'
import { receiveUsers } from './users'
import { receiveQuestions } from './questions'
import { setAuthedUser } from './authedUser'
import { showLoading, hideLoading } from 'react-redux-loading'

// const AUTHED_ID = 'sarahedo'

export function handleInitalData() {
  return (dispatch) => {
    dispatch(showLoading())
    return getInitialData()
      .then(({ users, questions }) => {
        dispatch(receiveUsers(users))
        dispatch(receiveQuestions(questions))
        // dispatch(setAuthedUser(
        //   Object.keys(users).sort((a,b) => (a.name > b.name) ? 1 : -1)[0])
        // )
        dispatch(hideLoading())
      })
  }
}