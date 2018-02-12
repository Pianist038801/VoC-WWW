import React from 'react';
import { shallow, configure, render, mount } from 'enzyme';
import Adapter from 'enzyme-adapter-react-15';
import { Provider } from 'react-redux';
import rootReducer from '../../../rootReducer';
import thunk from 'redux-thunk';
import { Router, browserHistory } from 'react-router';
import { createStore, applyMiddleware, compose } from 'redux';
import { CurrentCampaign } from '../../../components/campaign/CurrentCampaign';
import CurrentCampaignComponent from '../../../components/campaign/CurrentCampaign';
import { Link } from 'react-router';
import { expect } from 'chai';
import sinon from 'sinon';

configure({ adapter: new Adapter() });
const store = createStore(rootReducer, compose(applyMiddleware(thunk), window.devToolsExtension ? window.devToolsExtension() : f => f));

test('Sidebar being tested', () => {});

describe('Test Suite 4.3 to test current campaign', () => {
  let wrapper;
  let component;
  let render;

  beforeEach(() => {
    wrapper = shallow(
      <Provider store={store}>
        <CurrentCampaignComponent store={store} />
      </Provider>,
      {
        context: { router: {} },
        childContextTypes: { router: React.PropTypes.object }
      }
    );
    //console.log(wrapper.html());

    component = mount(
      <Provider store={store}>
        <CurrentCampaignComponent store={store} />
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
  it('contains a wrapper current-campaign', () => {
    expect(wrapper.find('wrapper current-campaign')).to.exist;
  });
  it('contains a row', () => {
    expect(wrapper.find('row')).to.exist;
  });
  it('contains a col-xl-5', () => {
    expect(wrapper.find('col-xl-5')).to.exist;
  });
  it('contains an i class', () => {
    expect(wrapper.find('i')).to.exist;
  });
  it('contains text Campaign', () => {
    expect(wrapper.find('Campaign')).to.exist;
  });
  it('contains img', () => {
    expect(wrapper.find('img')).to.exist;
  });
  it('contains table', () => {
    expect(wrapper.find('table')).to.exist;
  });
  it('contains row', () => {
    expect(wrapper.find('tr')).to.exist;
  });
  it('contains table data', () => {
    expect(wrapper.find('td')).to.exist;
  });
  it('contains table class d-block', () => {
    expect(wrapper.find('d-block')).to.exist;
  });
  it('contains text Start', () => {
    expect(wrapper.find('Start')).to.exist;
  });
  it('contains text End', () => {
    expect(wrapper.find('End')).to.exist;
  });
  it('contains text Created', () => {
    expect(wrapper.find('Created')).to.exist;
  });
  it('contains text Date', () => {
    expect(wrapper.find('Date')).to.exist;
  });
  it('contains text Last Modified', () => {
    expect(wrapper.find('Last Modified')).to.exist;
  });
  it('contains text Survey', () => {
    expect(wrapper.find('Survey')).to.exist;
  });
  it('contains text Audiences', () => {
    expect(wrapper.find('Audiences')).to.exist;
  });
  // it('contains text 8:00AM', () => {
  //   expect(wrapper.find('8:00AM')).to.exist;
  // });
  // it('contains text 7:00PM', () => {
  //   expect(wrapper.find('7:00PM')).to.exist;
  // });
  it('contains text Configuration', () => {
    expect(wrapper.find('Configuration')).to.exist;
  });
  it('contains text SCHEDULE', () => {
    expect(wrapper.find('SCHEDULE')).to.exist;
  });
  it('contains text SETTINGS', () => {
    expect(wrapper.find('SETTINGS')).to.exist;
  });
  it('contains text ALERTS', () => {
    expect(wrapper.find('ALERTS')).to.exist;
  });
  it('contains text Exclude Dates', () => {
    expect(wrapper.find('Exclude Dates')).to.exist;
  });
  it('contains a button', () => {
    expect(component.find('button')).to.exist;
  });
  it('contains checkbox', () => {
    expect(component.find('checkbox')).to.exist;
  });

  it('contains clearfix class', () => {
    expect(component.find('clearfix')).to.exist;
  });
  it('contains Links', () => {
    expect(component.find('a')).to.exist;
  });
});
