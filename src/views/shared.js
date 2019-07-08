export const cardMode = {
  question: 'question',
  newQuestion: 'newQuestion',
  poll: 'poll',
  pollResults: 'pollResults',
}

export function hasAnswered(authedUser, question) {
  const votes = [
    ...question.optionOne.votes,
    ...question.optionTwo.votes,
  ]
  const answered = votes.indexOf(authedUser) === -1 ? false : true

  return answered
}