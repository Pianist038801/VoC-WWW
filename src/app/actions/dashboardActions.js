import axios from 'axios';
import { GET_CAMPAIGNS_LIST,GET_AUDIENCE_LIST } from './types';

export function setCampaignsList(campaigns) {
  return {
    type: GET_CAMPAIGNS_LIST,
    campaigns
  }
}

export function getCampaignsList() {
  return dispatch => {
    return axios.get('jsons/campaigns.json');
  }
}

export function setAudienceList(audience) {
  return {
    type: GET_AUDIENCE_LIST,
    audience
  }
}

export function getAudienceList() {
  return dispatch => {
    return axios.get('jsons/audience.json');
  }
}

export function setsurveyDashboardList(audience) {
  return {
    type: GET_SURVEY_DASHBOARD_LIST,
    audience
  }
}

export function getsurveyDashboardList() {
  return dispatch => {
    return axios.get('jsons/surveyDashboard.json');
  }
}