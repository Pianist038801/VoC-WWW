import React from 'react';
import { shallow, configure, render, mount } from 'enzyme';
import Adapter from 'enzyme-adapter-react-15';
import { Provider } from 'react-redux';
import rootReducer from '../../../rootReducer';
import thunk from 'redux-thunk';
import { Router, browserHistory } from 'react-router';
import { createStore, applyMiddleware, compose } from 'redux';
import { NavigationBar } from '../../../components/NavigationBar';
import NavigationBarComponent from '../../../components/NavigationBar';
import { Link } from 'react-router';
import { expect } from 'chai';
import sinon from 'sinon';

configure({ adapter: new Adapter() });
let store = createStore(rootReducer, compose(applyMiddleware(thunk), window.devToolsExtension ? window.devToolsExtension() : f => f));

test('Sidebar being tested', () => {});

describe('Test Suite 5 to test Navbar component', () => {
  let wrapper;
  let component;
  let render;

  beforeEach(() => {
    wrapper = shallow(
      <Provider store={store}>
        <NavigationBarComponent
          auth={{
            isAuthenticated: true
          }}
        />
      </Provider>
    );
    component = mount(
      <Provider store={store}>
        <NavigationBarComponent store={store} />
      </Provider>
    );
  });

  it('Renders Correctly', () => {
    expect(wrapper.length).equals(1);
  });

  it('Contains class navbar', () => {
    expect(wrapper.find('navbar')).to.exist;
  });
  it('Contains class list-group-item', () => {
    expect(wrapper.find('list-group-item')).to.exist;
  });
  it('Contains text SignUp', () => {
    expect(wrapper.find('SignUp')).to.exist;
  });
  it('Contains navbar option Login', () => {
    expect(wrapper.find('Login')).to.exist;
  });
  it('Contains navbar option Logout', () => {
    expect(wrapper.find('Logout')).to.exist;
  });
});
