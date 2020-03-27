import { combineReducers } from 'redux';
import { loadingBarReducer } from 'react-redux-loading-bar';
import users from './users';
import questions from './questions';
import authid from './authedUser';

export default combineReducers({
  authid,
  users,
  questions,
  loadingBar: loadingBarReducer,
});
