import { isUserExists, userSignupRequest } from '../../actions/signupActions';
import expect from 'expect';
let user = {};
describe('Signup Actions', () => {
  it('isUserExists is called', () => {
    expect(isUserExists({})).toBeTruthy();
  });
  it('userSignupRequest is called', () => {
    expect(userSignupRequest({})).toBeTruthy();
  });
});
