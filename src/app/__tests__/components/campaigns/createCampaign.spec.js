import React from 'react';
import { shallow, configure, render, mount } from 'enzyme';
import Adapter from 'enzyme-adapter-react-15';
import { Provider } from 'react-redux';
import rootReducer from '../../../rootReducer';
import thunk from 'redux-thunk';
import { Router, browserHistory } from 'react-router';
import { createStore, applyMiddleware, compose } from 'redux';
import { CreateCampaign } from '../../../components/campaign/CreateCampaign';
import CreateCampaignComponent from '../../../components/campaign/CreateCampaign';
import { Link } from 'react-router';
import { expect } from 'chai';
import 'react-datepicker/dist/react-datepicker.css';
import sinon from 'sinon';

configure({ adapter: new Adapter() });
const store = createStore(rootReducer, compose(applyMiddleware(thunk), window.devToolsExtension ? window.devToolsExtension() : f => f));

test('Sidebar being tested', () => {});

describe('Test Suite 4.2 to test create campaign', () => {
  let wrapper;
  let component;
  let render;

  beforeEach(() => {
    wrapper = shallow(
      <Provider store={store}>
        <CreateCampaignComponent store={store} />
      </Provider>,
      {
        context: { router: {} },
        childContextTypes: { router: React.PropTypes.object }
      }
    );

    component = shallow(
      <Provider store={store}>
        <CreateCampaignComponent store={store} />
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
  it('contains a wrapper campaigns', () => {
    expect(wrapper.find('wrapper campaigns')).to.exist;
  });
  it('contains a cont new-campaign', () => {
    expect(wrapper.find('cont new-campaign')).to.exist;
  });
  it('contains a btn class', () => {
    expect(wrapper.find('btn')).to.exist;
  });
  it('contains an i class', () => {
    expect(wrapper.find('i')).to.exist;
  });
  it('contains text NEW CAMPAIGN', () => {
    expect(wrapper.find('NEW CAMPAIGN')).to.exist;
  });
  it('contains text CAMPAIGN NAME', () => {
    expect(wrapper.find('CAMPAIGN NAME')).to.exist;
  });
  it('contains text Text validation', () => {
    expect(wrapper.find('Text validation')).to.exist;
  });
  it('contains text CAMPAIGN SUMMARY', () => {
    expect(wrapper.find('CAMPAIGN SUMMARY')).to.exist;
  });
  it('contains text Audience', () => {
    expect(wrapper.find('Audience')).to.exist;
  });
  it('contains text Add Audience', () => {
    expect(wrapper.find('Add Audience')).to.exist;
  });
  it('contains text Survey', () => {
    expect(wrapper.find('Survey')).to.exist;
  });
  it('contains text Please Select a Survey', () => {
    expect(wrapper.find('Please Select a Survey')).to.exist;
  });
  it('contains text Creat New Survey', () => {
    expect(wrapper.find('Creat New Survey')).to.exist;
  });
  it('contains text Schedule', () => {
    expect(wrapper.find('Schedule')).to.exist;
  });

  it('contains text Configuration', () => {
    expect(wrapper.find('Configuration')).to.exist;
  });
  it('contains text Caller ID', () => {
    expect(wrapper.find('Caller ID')).to.exist;
  });
  it('contains text Call back number', () => {
    expect(wrapper.find('Call back number')).to.exist;
  });
  it('contains text Customer Identifiern', () => {
    expect(wrapper.find('Customer Identifier')).to.exist;
  });
  it('contains text Frequency Per Customer', () => {
    expect(wrapper.find('Frequency Per Customer')).to.exist;
  });
  it('contains text Every', () => {
    expect(wrapper.find('Every')).to.exist;
  });
  it('contains text call', () => {
    expect(wrapper.find('call')).to.exist;
  });
  it('contains text Survey Accepted', () => {
    expect(wrapper.find('Survey Accepted')).to.exist;
  });
  it('contains text Completed', () => {
    expect(wrapper.find('Completed')).to.exist;
  });
  it('contains text Survey Rejected', () => {
    expect(wrapper.find('Survey RejectedDays')).to.exist;
  });
  it('contains text Delayed Callback', () => {
    expect(wrapper.find('Delayed Callback')).to.exist;
  });
  it('contains text Attempt', () => {
    expect(wrapper.find('Attempt')).to.exist;
  });
  it('contains text min', () => {
    expect(wrapper.find('min')).to.exist;
  });

  it('contains text Last Attempt', () => {
    expect(wrapper.find('Last Attempt')).to.exist;
  });
  it('contains text Alerts', () => {
    expect(wrapper.find('Alerts')).to.exist;
  });
  it('contains text Specific word alerts', () => {
    expect(wrapper.find('Specific word alerts')).to.exist;
  });
  it('contains text Notify', () => {
    expect(wrapper.find('Notify')).to.exist;
  });
  it('contains text Low Score Alert Threshold', () => {
    expect(wrapper.find('Low Score Alert Threshold')).to.exist;
  });
  it('contains text CREATE CAMPAIGN', () => {
    expect(wrapper.find('CREATE CAMPAIGN')).to.exist;
  });
  it('contains a button', () => {
    expect(component.find('button')).to.exist;
  });
  it('contain select', () => {
    expect(component.find('select')).to.exist;
  });
  it('contains clearfix class', () => {
    expect(component.find('clearfix')).to.exist;
  });
});
