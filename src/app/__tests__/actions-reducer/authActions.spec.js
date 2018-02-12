import reducer from '../../reducers/auth';
import { setCurrentUser, getCurrentUser, login, logout, setUserEmailPassword } from '../../actions/authActions';
import { SET_CURRENT_USER, GET_CURRENT_USER, SET_USEREMAIL_PASSWORD } from '../../actions/types';
import expect from 'expect';
let user = {};
describe('auth reducer', () => {
  it('should return the initial state', () => {
    expect(reducer(undefined, {})).toEqual({ emailUsername: '', isAuthenticated: false, password: '', user: {} });
  });

  it('should handle SET_CURRENT_USER', () => {
    const action = {
      type: SET_CURRENT_USER,
      user
    };
    // it's empty on purpose because it's just starting to fetch posts
    expect(reducer({}, action)).toEqual({ isAuthenticated: false, user: {} });
  });

  it('should handle GET_CURRENT_USER', () => {
    const action = {
      type: GET_CURRENT_USER
      // important to pass correct payload, that's what the tests are for ;)
    };
    expect(
      reducer(
        {
          emailUsername: '',
          isAuthenticated: false,
          password: '',
          user: {}
        },
        action
      )
    ).toEqual({ emailUsername: '', isAuthenticated: false, password: '', user: {} });
  });

  it('should handle SET_USEREMAIL_PASSWORD', () => {
    const action = {
      type: SET_USEREMAIL_PASSWORD,
      user
    };
    expect(reducer({}, action)).toEqual({});
  });

  describe('Actions', () => {
    it('setCurrentUser is called', () => {
      expect(setCurrentUser({})).toBeTruthy();
    });
    it('getCurrentUser is called', () => {
      expect(getCurrentUser({})).toBeTruthy();
    });
    it('login is called', () => {
      expect(login({})).toBeTruthy();
    });
    it('logout is called', () => {
      expect(logout({})).toBeTruthy();
    });
    it('setUserEmailPassword is called', () => {
      expect(setUserEmailPassword({})).toBeTruthy();
    });
  });
});
