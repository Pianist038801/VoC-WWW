import React from 'react';
import { Route, IndexRoute } from 'react-router';

import App from './components/App';
import Greetings from './components/Greetings';
import CampaignsList from './components/campaign/CampaignList';
import CreateCampaign from './components/campaign/CreateCampaign';
import CurrentCampaign from './components/campaign/CurrentCampaign';
import SurveyPage from './components/survey/surveyPage';
import CurrentSurveyPage from './components/survey/currentSurveyPage';
import BlacklistPage from './components/blacklist/blacklistPage';
import SignupPage from './components/signup/SignupPage';
import LoginPage from './components/login/LoginPage';

import requireAuth from './utils/requireAuth';

export default (
  <Route path="/" component={App}>
    <IndexRoute component={Greetings} />
    <Route path="campaigns" component={requireAuth(CampaignsList)} />
    <Route path="create-campaign" component={requireAuth(CreateCampaign)} />
    <Route path="current-campaign" component={requireAuth(CurrentCampaign)} />
    <Route path="surveys" component={requireAuth(SurveyPage)} />
    <Route path="current-survey" component={requireAuth(CurrentSurveyPage)} />
    <Route path="blacklist" component={requireAuth(BlacklistPage)} />
    <Route path="signup" component={SignupPage} />
    <Route path="login" component={LoginPage} />
  </Route>
);
