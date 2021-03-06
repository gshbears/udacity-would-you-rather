import {
  RECEIVE_USERS,
  SAVE_QUESTION,
  SAVE_QUESTION_ANSWER,
  SAVE_NEW_USER,
} from '../actions/users';

export default function user(state = {}, action) {
  switch (action.type) {
    case RECEIVE_USERS:
      return {
        ...state,
        ...action.users,
      };
    case SAVE_QUESTION:
      const { question } = action;
      return {
        ...state,
        [question.author]: {
          ...state[question.author],
          questions: state[question.author].questions.concat([question.id]),
        },
      };

    case SAVE_QUESTION_ANSWER:
      const { answer, qid, authedUser } = action;

      return {
        ...state,
        [authedUser]: {
          ...state[authedUser],
          answers: {
            ...state[authedUser].answers,
            [qid]: answer,
          },
        },
      };
    case SAVE_NEW_USER:
      return {
        ...state,
        [action.user.id]: action.user,
      };
    default:
      return state;
  }
}
