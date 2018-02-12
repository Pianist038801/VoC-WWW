import { SET_CAMPAIGNS_LIST, SET_AUDIENCE_LIST, SET_SURVEY_DASHBOARD_LIST, SET_CAMPAIGN_BY_ID } from '../actions/types';
import isEmpty from 'lodash/isEmpty';

const initialState = {
  campaignFetched: false,
  campaignFetching: false,
  errCampaign: false,
  campaignList: {},

  campaignByIdFetched: false,
  campaignByIdFetchingd: false,
  errCampaignById: false,
  campaignById: {},

  audienceFetched: false,
  audienceFetching: false,
  errAudience: false,
  audienceList: {},

  surveyFetched: false,
  surveyFetching: false,
  errSurvey: false,
  surveyList: {}
};

export default (state = initialState, action = {}) => {
  switch (action.type) {
    case SET_CAMPAIGNS_LIST:
      return {
        ...state,
        campaignFetched: true,
        campaignFetching: false,
        errCampaign: false,
        campaignList: action.campaigns
      };
    case SET_AUDIENCE_LIST:
      return {
        ...state,
        audienceFetched: true,
        audienceFetching: false,
        errAudience: false,
        audienceList: action.audience
      };
    case SET_SURVEY_DASHBOARD_LIST:
      return {
        ...state,
        surveyFetched: true,
        surveyFetching: false,
        errSurvey: false,
        surveyList: action.survey
      };

    case SET_CAMPAIGN_BY_ID:
      return {
        ...state,
        campaignByIdFetched: true,
        campaignByIdFetchingd: false,
        errCampaignById: false,
        campaignById: action.campaigns
      };

    default:
      return state;
  }
};
