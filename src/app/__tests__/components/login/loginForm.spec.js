import React from 'react';
import { shallow, configure, render, mount } from 'enzyme';
import Adapter from 'enzyme-adapter-react-15';
import { Provider } from 'react-redux';
import rootReducer from '../../../rootReducer';
import thunk from 'redux-thunk';
import { Router, browserHistory } from 'react-router';
import { createStore, applyMiddleware, compose } from 'redux';
import { LoginForm } from '../../../components/login/LoginForm';
import LoginFormComponent from '../../../components/login/LoginForm';
import TextFieldGroup from '../../../components/common/TextFieldGroup';
import { expect } from 'chai';
import sinon from 'sinon';

configure({ adapter: new Adapter() });
const store = createStore(rootReducer, compose(applyMiddleware(thunk), window.devToolsExtension ? window.devToolsExtension() : f => f));

test('Login Form being tested', () => {});

describe('Test Suite 1 to test Login Page', () => {
  let wrapper;
  let component;

  beforeEach(() => {
    wrapper = shallow(<LoginForm login={() => {}} />, {
      context: { router: {} },
      childContextTypes: { router: React.PropTypes.object }
    });

    component = mount(
      <Provider store={store}>
        <LoginFormComponent login={() => {}} />
      </Provider>,
      {
        context: { router: {} },
        childContextTypes: { router: React.PropTypes.object }
      }
    );
  });

  it('Renders Correctly', () => {
    expect(wrapper.length).equals(1);
  });

  it('Contains Login', () => {
    expect(wrapper.contains('Login')).to.equal(true);
  });
  it('renders two <TextFieldGroup/> components', () => {
    expect(wrapper.find(TextFieldGroup)).to.have.length(2);
  });

  it('contains an `.login_cont` class', () => {
    expect(wrapper.find('.login_cont')).to.have.length(1);
  });

  it('has a button', () => {
    expect(component.find('button')).to.exist;
  });

  it('1st TextFieldGroup field has identifier', () => {
    expect(wrapper.find(TextFieldGroup).get(0).props.field).to.equal('identifier');
  });

  it('1st TextFieldGroup label has label', () => {
    expect(wrapper.find(TextFieldGroup).get(0).props.label).to.equal('Username / Email');
  });

  it('1st TextFieldGroup value has value', () => {
    expect(wrapper.find(TextFieldGroup).get(0).props.value).to.equal('');
  });

  it('1st TextFieldGroup type has type', () => {
    expect(wrapper.find(TextFieldGroup).get(0).props.type).to.equal('text');
  });

  it('setState Changes', () => {
    wrapper.setState({ identifier: 'user' });
    expect(wrapper.find(TextFieldGroup).get(0).props.value).to.equal('user');
  });

  it('simulate onChange', () => {
    const onChange = sinon.spy();
    wrapper
      .find(TextFieldGroup)
      .first()
      .simulate('change', { preventDefault: () => {}, target: { value: 'user', name: 'identifier' } });
    expect(wrapper.find(TextFieldGroup).get(0).props.value).to.equal('user');
  });
});
