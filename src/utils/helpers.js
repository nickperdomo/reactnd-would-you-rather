export function formatQuestion(autherUser, user, question) {
  const {
    name,
    avatarURL,
  } = user

  const { 
    id,
    author,
    timestamp,
    optionOne,
    optionTwo,
  } = question

  return {
    name,
    id,
    author,
    avatar: avatarURL,
    timestamp,
    optionOne,
    optionTwo,
    optionOneVotes: question.optionOne.votes,
    optionTwoVotes: question.optionTwo.votes,
  }
}