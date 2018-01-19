import { combineReducers } from 'redux';
import flashMessages from './reducers/flashMessages';
import auth from './reducers/auth'; 
import global from './reducers/global';

export default combineReducers({
  flashMessages,
  auth,
  global
});