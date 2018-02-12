import React from 'react';
import { shallow, configure, render, mount } from 'enzyme';
import Adapter from 'enzyme-adapter-react-15';
import { Provider } from 'react-redux';
import rootReducer from '../../../rootReducer';
import thunk from 'redux-thunk';
import { Router, browserHistory } from 'react-router';
import { createStore, applyMiddleware, compose } from 'redux';
import { SidebarMenu } from '../../../components/SidebarMenu';
import SidebarMenuComponent from '../../../components/SidebarMenu';
import { Link } from 'react-router';
import { expect } from 'chai';
import sinon from 'sinon';

configure({ adapter: new Adapter() });
let store = createStore(rootReducer, compose(applyMiddleware(thunk), window.devToolsExtension ? window.devToolsExtension() : f => f));

test('Sidebar being tested', () => {});

describe('Test Suite 3 to test sidebar component', () => {
  let wrapper;
  let component;
  let render;

  beforeEach(() => {
    wrapper = shallow(
      <SidebarMenu
        auth={{
          isAuthenticated: true
        }}
      />
    );
    component = mount(
      <Provider store={store}>
        <SidebarMenuComponent store={store} />
      </Provider>
    );
  });

  it('Renders Correctly', () => {
    expect(wrapper.length).equals(1);
  });

  it('Contains class sidebar', () => {
    expect(wrapper.find('sidebar')).to.exist;
  });
  it('Contains class logo', () => {
    expect(wrapper.find('logo')).to.exist;
  });
  it('Contains class list-unstyled', () => {
    expect(wrapper.find('list-unstyled')).to.exist;
  });
  it('Contains menu option VOICE OF THE CUSTOMER', () => {
    expect(wrapper.find('VOICE OF THE CUSTOMER')).to.exist;
  });
  it('Contains menu option CAMPAIGNS', () => {
    expect(wrapper.find('CAMPAIGNS')).to.exist;
  });
  it('Contains menu option SURVEYS', () => {
    expect(wrapper.find('SURVEYS')).to.exist;
  });
  it('Contains menu option AUDIENCE ', () => {
    expect(wrapper.find('AUDIENCE')).to.exist;
  });
  it('Contains menu option QUESTIONS', () => {
    expect(wrapper.find('QUESTIONS')).to.exist;
  });
  it('Contains menu option REPORTING', () => {
    expect(wrapper.find('REPORTING')).to.exist;
  });
  it('Contains menu option DO NOT CALL LIST', () => {
    expect(wrapper.find('DO NOT CALL LIST')).to.exist;
  });
  it('Contains Li togs ', () => {
    expect(wrapper.find('li')).to.exist;
  });
  it('Contains anchor tags ', () => {
    expect(wrapper.find('a')).to.exist;
  });
  it('Contains total 7 Li togs ', () => {
    expect(wrapper.find('li')).to.have.length(7);
  });
  it('Contains total 2 anchor tags ', () => {
    expect(wrapper.find('a')).to.have.length(2);
  });
});
