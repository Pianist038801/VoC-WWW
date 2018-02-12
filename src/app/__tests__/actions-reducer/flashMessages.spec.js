import reducer from '../../reducers/flashMessages';
import { addFlashMessage, deleteFlashMessage } from '../../actions/flashMessages';
import { ADD_FLASH_MESSAGE, DELETE_FLASH_MESSAGE } from '../../actions/types';
import expect from 'expect';
let user = {};
let message = {};
describe('auth reducer', () => {
  it('should return the initial state', () => {
    expect(reducer(undefined, {})).toEqual([]);
  });

  it('should handle ADD_FLASH_MESSAGE', () => {
    const action = {
      type: ADD_FLASH_MESSAGE,
      message: {
        type: 'test-type',
        text: 'test-text'
      }
    };
    // it's empty on purpose because it's just starting to fetch posts
    let res = reducer({}, action);
    expect(res).toEqual([{ id: res[0].id, text: 'test-text', type: 'test-type' }]);
  });

  it('should handle DELETE_FLASH_MESSAGE', () => {
    const action = {
      type: DELETE_FLASH_MESSAGE
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

  describe('Actions are invoked', () => {
    it('addFlashMessage is called', () => {
      expect(addFlashMessage({})).toBeTruthy();
    });
    it('deleteFlashMessage is called', () => {
      expect(deleteFlashMessage({})).toBeTruthy();
    });
  });
});
