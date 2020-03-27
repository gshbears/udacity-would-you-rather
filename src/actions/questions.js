import { saveQuestion, saveQuestionAnswer } from '../utils/api.js'
import { showLoading, hideLoading } from 'react-redux-loading-bar'

export const RECEIVED_QUESTIONS = 'RECEIVED_QUESTIONS'
export const SAVE_QUESTION = 'SAVE_QUESTION'
export const SAVE_QUESTION_ANSWER = 'SAVE_QUESTION_ANSWER'

export function receivedQuestions(questions) {
    return {
        type: RECEIVED_QUESTIONS,
        questions,
    }
}

function addQuestion(question) {
    return {
        type: SAVE_QUESTION,
        question,
    }
}

export function handleAddQuestion(optionOneText, optionTwoText) {
    return (dispatch, getState) => {
        const { authid } = getState()

        dispatch(showLoading())

        return saveQuestion({
            optionOneText,
            optionTwoText,
            author: authid,
        })
            .then((question) => dispatch(addQuestion(question)))
            .then(() => dispatch(hideLoading()))
    }
}

function addQuestionAnswer(answer, qid, authedUser) {
    return {
        type: SAVE_QUESTION_ANSWER,
        answer,
        qid,
        authedUser,
    }
}

export function handleQuestionAnswer(answer, qid) {
    return (dispatch, getState) => {
        const { authid } = getState()

        dispatch(showLoading())

        return saveQuestionAnswer({
            answer: answer,
            qid: qid,
            authedUser: authid,
        })
            .then(({ answer, qid, authedUser }) => {
                dispatch(addQuestionAnswer(answer, qid, authedUser))
            })
            .then(() => dispatch(hideLoading()))
    }
}
