import { RECEIVE_QUESTIONS} from '../actions/questions'
import { ADD_ANSWER } from '../actions/questions'

export default function questions(state = {}, action) {
  switch (action.type) {
    case RECEIVE_QUESTIONS :
      return {
        ...state,
        ...action.questions
      }
    case ADD_ANSWER :
     return {
       ...state,
      [action.qid]: {
        ...state[action.qid],
        [action.answer]: {
          ...state[action.qid][action.answer],
          votes: state[action.qid][action.answer].votes.indexOf(action.authedUser) === -1
            ? state[action.qid][action.answer].votes.concat([action.authedUser])
            : state[action.qid][action.answer].votes
        }
      }
     }
    default :
      return state
  }
}