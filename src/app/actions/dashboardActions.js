import axios from 'axios';
import { SET_CAMPAIGNS_LIST, SET_AUDIENCE_LIST, SET_SURVEY_DASHBOARD_LIST, SET_CAMPAIGN_BY_ID } from './types';
import { getCurrentUser } from './authActions';
export function setCampaignsList(campaigns) {
  return {
    type: SET_CAMPAIGNS_LIST,
    campaigns
  };
}
//https://api.myjson.com/bins/drofh
//'http://office.healthcareintegrations.com:86/campaign',
export function getCampaignsList() {
  return dispatch => {
    return axios({
      method: 'GET',
      url: 'https://mirth-service.staging.agentacloud.com:8882/campaign',
      auth: {
        username: 'username',
        password: 'password'
      }
    })
      .then(function(result) {
        //alert(result);
        console.log(result);
        dispatch(setCampaignsList(result));
      })
      .catch(function(error) {
        //alert(error);
      });
  };
}
export function setCampaignById(campaigns) {
  return {
    type: SET_CAMPAIGN_BY_ID,
    campaigns
  };
}
export function getCampaignById(id) {
  return dispatch => {
    console.log('called');
    //axios.defaults.headers.post['Content-Type'] = 'text/x-www-form-urlencoded';
    return axios({
      method: 'GET',
      url: 'https://mirth-service.staging.agentacloud.com:8882/campaign/id/' + id,
      //url: 'http://office.healthcareintegrations.com:86/campaign/id/' + id,
      //url: 'https://api.myjson.com/bins/6kgn1',
      //url: 'https://api.myjson.com/bins/181yfh',
      //url: 'https://api.myjson.com/bins/1e7enh',
      //url:'https://api.myjson.com/bins/1c9hr5'
      //good:https://api.myjson.com/bins/16eezl
      auth: {
        username: 'username',
        password: 'password'
      }
    })
      .then(function(result) {
        //alert(result);
        console.log(result);
        dispatch(setCampaignById(result));
      })
      .catch(function(error) {
        //alert(error);
      });
  };
}
export function updateCampaignById(id, dataObject) {
  console.log('called update');
  return axios({
    method: 'POST',
    url: 'https://mirth-service.staging.agentacloud.com:8883/campaign/id/' + id,
    //url: 'https://api.myjson.com/bins/6kgn1',
    //url: 'https://api.myjson.com/bins/181yfh',
    //url: 'https://api.myjson.com/bins/1e7enh',
    auth: {
      username: 'username',
      password: 'password'
    },
    data: dataObject
  })
    .then(function(result) {
      //alert(result);
      console.log(result);
    })
    .catch(function(error) {
      console.log(error);
    });
}
export function insertCampaign(dataObject) {
  console.log('called insert');
  return axios({
    method: 'POST',
    url: 'https://mirth-service.staging.agentacloud.com:8883/campaign',
    //url: 'https://api.myjson.com/bins/6kgn1',
    //url: 'https://api.myjson.com/bins/181yfh',
    //url: 'https://api.myjson.com/bins/1e7enh',
    auth: {
      username: 'username',
      password: 'password'
    },
    data: dataObject
  })
    .then(function(result) {
      //alert(result);
      console.log(result);
    })
    .catch(function(error) {
      console.log(error);
    });
}
export function setAudienceList(audience) {
  return {
    type: SET_AUDIENCE_LIST,
    audience
  };
}
export function getAudienceList() {
  return dispatch => {
    return axios
      .get(window.location.origin + '/jsons/audience.json')
      .then(function(result) {
        dispatch(setAudienceList(result));
      })
      .catch(function(error) {
        //console.log(error);
      });
  };
}
export function setsurveyDashboardList(survey) {
  return {
    type: SET_SURVEY_DASHBOARD_LIST,
    survey
  };
}
export function getsurveyDashboardList() {
  return dispatch => {
    return axios
      .get(window.location.origin + '/jsons/surveyDashboard.json')
      .then(function(result) {
        dispatch(setsurveyDashboardList(result));
      })
      .catch(function(error) {
        //console.log(error);
      });
  };
}
