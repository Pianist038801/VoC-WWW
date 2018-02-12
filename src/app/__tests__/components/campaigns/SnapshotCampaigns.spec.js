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
import { CampaignList } from '../../../components/campaign/CampaignList';
import CampaignListComponent from '../../../components/campaign/CampaignList';
import { CurrentCampaign } from '../../../components/campaign/CurrentCampaign';
import CurrentCampaignComponent from '../../../components/campaign/CurrentCampaign';
import { Link } from 'react-router';
import 'react-datepicker/dist/react-datepicker.css';
import sinon from 'sinon';
import renderer from 'react-test-renderer';
import Loader from 'react-loader';
import toJson from 'enzyme-to-json';

configure({ adapter: new Adapter() });
const store = createStore(rootReducer, compose(applyMiddleware(thunk), window.devToolsExtension ? window.devToolsExtension() : f => f));
it('matches with the last snapshot', () => {
  const tree = renderer
    .create(
      <Provider store={store}>
        <CreateCampaignComponent store={store} location={{ query: { id: 0 } }} />
      </Provider>
    )
    .toJSON();
  expect(tree).toMatchSnapshot();
});
it('matches with the last snapshot', () => {
  let wrapper = shallow(
    <Provider store={store}>
      <CampaignListComponent store={store} />
    </Provider>
  );
  expect(toJson(wrapper)).toMatchSnapshot();
});
it('matches with the last snapshot', () => {
  const tree = renderer
    .create(
      <Provider store={store}>
        <CurrentCampaignComponent store={store} />
      </Provider>,
      {
        context: { router: {} },
        childContextTypes: { router: React.PropTypes.object }
      }
    )
    .toJSON();
  expect(tree).toMatchSnapshot();
});
