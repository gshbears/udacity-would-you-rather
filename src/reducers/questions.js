import {
    RECEIVED_QUESTIONS,
    SAVE_QUESTION,
    SAVE_QUESTION_ANSWER,
} from '../actions/questions'

export default function question(state = {}, action) {
    switch (action.type) {
        case RECEIVED_QUESTIONS:
            return {
                ...state,
                ...action.questions,
            }
        case SAVE_QUESTION:
            return {
                ...state,
                [action.question.id]: action.question,
            }
        case SAVE_QUESTION_ANSWER:
            const { answer, qid, authedUser } = action

            return {
                ...state,
                [qid]: {
                    ...state[qid],
                    [answer]: {
                        ...state[qid][answer],
                        votes: state[qid][answer].votes.concat([authedUser]),
                    },
                },
            }

        default:
            return state
    }
}
