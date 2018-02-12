import axios from 'axios';
import setAuthorizationToken from '../utils/setAuthorizationToken';
import jwtDecode from 'jwt-decode';
import { SET_CURRENT_USER, GET_CURRENT_USER, SET_USEREMAIL_PASSWORD } from './types';

export function setCurrentUser(user) {
  return {
    type: SET_CURRENT_USER,
    user
  };
}
export function setUserEmailPassword(user) {
  return dispatch => {
    dispatch({
      type: SET_USEREMAIL_PASSWORD,
      user
    });
  };
}

export function getCurrentUser() {
  return dispatch => {
    dispatch({ type: GET_CURRENT_USER });
  };
}

export function logout() {
  return dispatch => {
    localStorage.removeItem('jwtToken');
    setAuthorizationToken(false);
    dispatch(setCurrentUser({}));
  };
}

export function login(data) {
  return dispatch => {
    // Sample token
    let token =
      'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiIxMjM0NTY3ODkwIiwibmFtZSI6IkpvaG4gRG9lIiwiYWRtaW4iOnRydWV9.TJVA95OrM7E2cBab30RMHrHDcEfxjoYZgeFONFh7HgQ';
    localStorage.setItem('jwtToken', token);
    setAuthorizationToken(token);
    data.token = token;
    dispatch(setCurrentUser(data));
    return new Promise((resolve, reject) => {
      resolve();
    });
  };
}
