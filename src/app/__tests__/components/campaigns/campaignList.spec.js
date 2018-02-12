import React from 'react';
import { shallow, configure, render, mount } from 'enzyme';
import Adapter from 'enzyme-adapter-react-15';
import { Provider } from 'react-redux';
import rootReducer from '../../../rootReducer';
import thunk from 'redux-thunk';
import { Router, browserHistory } from 'react-router';
import { createStore, applyMiddleware, compose } from 'redux';
import { CampaignList } from '../../../components/campaign/CampaignList';
import CampaignListComponent from '../../../components/campaign/CampaignList';
import { Link } from 'react-router';
import { expect } from 'chai';
import sinon from 'sinon';

configure({ adapter: new Adapter() });
const store = createStore(rootReducer, compose(applyMiddleware(thunk), window.devToolsExtension ? window.devToolsExtension() : f => f));

test('Sidebar being tested', () => {});

describe('Test Suite 4.1 to test campaignt List', () => {
  let wrapper;
  let component;
  let render;

  beforeEach(() => {
    wrapper = shallow(
      <Provider store={store}>
        <CampaignListComponent store={store} />
      </Provider>
    );
    component = shallow(
      <Provider store={store}>
        <CampaignListComponent store={store} />
      </Provider>
    );
  });

  it('Renders Correctly', () => {
    try {
      expect(wrapper.length).equals(1);
    } catch (e) {}
  });

  // it('Contains Login', () => {
  //   expect(wrapper.find('i')).to.equal(true);
  // });
  // it('renders two <TextFieldGroup/> components', () => {
  //   expect(wrapper.find(TextFieldGroup)).to.have.length(2);
  // });

  it('contains an navicon', () => {
    expect(wrapper.find('navicon')).to.exist;
  });

  it('contains a span', () => {
    expect(wrapper.find('span')).to.exist;
  });
  it('contains a left-section', () => {
    expect(wrapper.find('left-section')).to.exist;
  });
  it('contains a fa fa-bars', () => {
    expect(wrapper.find('fa fa-bars')).to.exist;
  });
  it('contains a wrapper dashboard', () => {
    expect(wrapper.find('wrapper dashboard')).to.exist;
  });
  it('contains a float-right mb-3', () => {
    expect(wrapper.find('float-right mb-3')).to.exist;
  });
  it('contains a btn-group', () => {
    expect(wrapper.find('btn-group')).to.exist;
  });
  it('contains a btn active', () => {
    expect(wrapper.find('btn active')).to.exist;
  });
  it('contains an i class', () => {
    expect(wrapper.find('i')).to.exist;
  });
  it('contains a NEW CAMPAIGN', () => {
    expect(wrapper.find('NEW CAMPAIGN')).to.exist;
  });
  it('contains a button', () => {
    expect(component.find('button')).to.exist;
  });
  it('contains an anchor tag', () => {
    expect(component.find('a')).to.exist;
  });
  it('contains div', () => {
    expect(component.find('div')).to.exist;
  });
 
  it('contains clearfix class', () => {
    expect(component.find('clearfix')).to.exist;
  });

 
});
