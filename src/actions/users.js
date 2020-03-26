export const RECEIVE_USERS = 'RECEIVE_USERS'
export const SAVE_QUESTION = 'SAVE_QUESTION'
export const SAVE_QUESTION_ANSWER ='SAVE_QUESTION_ANSWER'

export function receivedUsers (users){
  return {
    type: RECEIVE_USERS,
    users,
  }
}
