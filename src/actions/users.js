import { saveUser } from '../utils/api.js';
import { showLoading, hideLoading } from 'react-redux-loading-bar';

export const RECEIVE_USERS = 'RECEIVE_USERS';
export const SAVE_QUESTION = 'SAVE_QUESTION';
export const SAVE_QUESTION_ANSWER = 'SAVE_QUESTION_ANSWER';
export const SAVE_NEW_USER = 'SAVE_NEW_USER';

export function receivedUsers(users) {
  return {
    type: RECEIVE_USERS,
    users,
  };
}

function addUser(user) {
  return {
    type: SAVE_NEW_USER,
    user,
  };
}

export function handleAddNewUser(id, avatarURL, name) {
  return (dispatch, getState) => {
    dispatch(showLoading());

    return saveUser({
      id,
      avatarURL,
      name,
    })
      .then((user) => dispatch(addUser(user)))
      .then(() => dispatch(hideLoading()));
  };
}
