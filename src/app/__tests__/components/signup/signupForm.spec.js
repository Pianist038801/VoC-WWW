import React from 'react';
import { shallow, configure, render, mount } from 'enzyme';
import Adapter from 'enzyme-adapter-react-15';
import { Provider } from 'react-redux';
import rootReducer from '../../../rootReducer';
import thunk from 'redux-thunk';
import { Router, browserHistory } from 'react-router';
import { createStore, applyMiddleware, compose } from 'redux';
import { SignupForm } from '../../../components/signup/SignupForm';
import SignupFormComponent from '../../../components/signup/SignupForm';
import TextFieldGroup from '../../../components/common/TextFieldGroup';
import { expect } from 'chai';
import sinon from 'sinon';

configure({ adapter: new Adapter() });
const store = createStore(rootReducer, compose(applyMiddleware(thunk), window.devToolsExtension ? window.devToolsExtension() : f => f));

test('Sign up Form being tested', () => {});

describe('Test Suite 2 to test Signup Page', () => {
  let wrapper;
  let component;

  beforeEach(() => {
    wrapper = shallow(<SignupForm userSignupRequest={() => {}} addFlashMessage={() => {}} isUserExists={() => {}} />);

    component = mount(
      <Provider store={store}>
        <SignupFormComponent userSignupRequest={() => {}} addFlashMessage={() => {}} isUserExists={() => {}} />
      </Provider>
    );
  });

  it('Renders Correctly', () => {
    expect(wrapper.length).equals(1);
  });
  it('renders four <TextFieldGroup/> components', () => {
    expect(wrapper.find(TextFieldGroup)).to.have.length(4);
  });

  it('contains an `.signt` class', () => {
    expect(wrapper.find('.sign')).to.have.length(1);
  });

  it('has a button', () => {
    expect(component.find('button')).to.exist;
  });

  it('1st TextFieldGroup field has identifier', () => {
    expect(wrapper.find(TextFieldGroup).get(0).props.field).to.equal('username');
  });

  it('1st TextFieldGroup label has label', () => {
    expect(wrapper.find(TextFieldGroup).get(0).props.label).to.equal('Username');
  });

  it('1st TextFieldGroup value has value', () => {
    expect(wrapper.find(TextFieldGroup).get(0).props.value).to.equal('');
  });

  it('1st TextFieldGroup type has type', () => {
    expect(wrapper.find(TextFieldGroup).get(0).props.type).to.equal('text');
  });

  it('setState Changes', () => {
    wrapper.setState({ username: 'user' });
    expect(wrapper.find(TextFieldGroup).get(0).props.value).to.equal('user');
  });

  it('simulate onChange', () => {
    const onChange = sinon.spy();
    wrapper
      .find(TextFieldGroup)
      .first()
      .simulate('change', { preventDefault: () => {}, target: { value: 'user', name: 'username' } });
    expect(wrapper.find(TextFieldGroup).get(0).props.value).to.equal('user');
  });
});
