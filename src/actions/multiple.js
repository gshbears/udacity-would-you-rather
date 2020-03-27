import { getInitialData } from '../utils/api';
import { receivedUsers } from './users';
import { receivedQuestions } from './questions';
import { setAuthedUser } from './authedUser';
import { showLoading, hideLoading } from 'react-redux-loading-bar';

const AUTHED_ID = '';

export function handleInitalData() {
  return (dispatch) => {
    dispatch(showLoading());
    return getInitialData().then(({ users, questions }) => {
      dispatch(receivedUsers(users));
      dispatch(receivedQuestions(questions));
      dispatch(setAuthedUser(AUTHED_ID));
      dispatch(hideLoading());
    });
  };
}
