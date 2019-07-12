import { saveQuestion, saveQuestionAnswer } from '../utils/api'
import { RECEIVE_QUESTIONS } from './types'
import { ADD_ANSWER } from './types'
import { ADD_QUESTION } from './types'

export function receiveQuestions(questions) {
  return {
    type: RECEIVE_QUESTIONS,
    questions,
  }
}

function addAnswer({authedUser, qid, answer}) {
  return {
    type: ADD_ANSWER,
    authedUser,
    qid,
    answer,
  }
}

export function handleAddAnswer(info) {
  return (dispatch) => {
    dispatch(addAnswer(info))

    return saveQuestionAnswer(info)
      .catch((e) => {
        console.warn('Error in handleAddAnswer: ', e)
        dispatch(addAnswer(info))
        alert('There was an error submitting your vote. Try again.')
      })
  }
}

function addQuestion(question) {
  return {
    type: ADD_QUESTION,
    question: question,
  }
}

export function handleAddQuestion(newQuestion) {
  return (dispatch) => {

    return saveQuestion(newQuestion)
      .catch((e) => {
        console.warn('Error in handleAddQuestion: ', e)
        alert('There was an error submitting your question. Try again.')
      })
      .then( formattedQ => {
        dispatch(addQuestion(formattedQ))
      })
  }
}