import {combineReducers} from 'redux';
import flashMessages from './reducers/flashMessages';
import auth from './reducers/auth';
import dashboardReducer from './reducers/dashboardReducer';
import global from './reducers/global';
export default combineReducers({flashMessages, auth, dashboardReducer, global});
