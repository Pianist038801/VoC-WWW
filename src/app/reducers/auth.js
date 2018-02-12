import { SET_CURRENT_USER, GET_CURRENT_USER, SET_USEREMAIL_PASSWORD } from '../actions/types';
import isEmpty from 'lodash/isEmpty';

const initialState = {
  isAuthenticated: false,
  user: {},
  emailUsername: '',
  password: ''
};

export default (state = initialState, action = {}) => {
  switch (action.type) {
    case SET_CURRENT_USER:
      return {
        ...state,
        isAuthenticated: !isEmpty(action.user),
        user: action.user
      };
    case GET_CURRENT_USER:
      return { ...state };
    case SET_USEREMAIL_PASSWORD:
      return {
        ...state,
        emailUsername: action.user.identifier,
        password: action.user.password
      };

    default:
      return state;
  }
};
