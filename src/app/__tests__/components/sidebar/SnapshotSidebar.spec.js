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
import 'react-datepicker/dist/react-datepicker.css';
import sinon from 'sinon';
import renderer from 'react-test-renderer';
import Loader from 'react-loader';
import toJson from 'enzyme-to-json';

configure({ adapter: new Adapter() });
const store = createStore(rootReducer, compose(applyMiddleware(thunk), window.devToolsExtension ? window.devToolsExtension() : f => f));

it('matches with the last snapshot', () => {
  let wrapper = shallow(
    <SidebarMenu
      auth={{
        isAuthenticated: true
      }}
    />
  );
  expect(toJson(wrapper)).toMatchSnapshot();
});
