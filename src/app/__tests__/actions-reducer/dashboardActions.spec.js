import reducer from '../../reducers/dashboardReducer';
import {
  getAudienceList,
  getCampaignById,
  getCampaignsList,
  getsurveyDashboardList,
  insertCampaign,
  setAudienceList,
  setCampaignById,
  setCampaignsList,
  setsurveyDashboardList,
  updateCampaignById
} from '../../actions/dashboardActions';
import { SET_CAMPAIGNS_LIST, SET_AUDIENCE_LIST, SET_SURVEY_DASHBOARD_LIST, SET_CAMPAIGN_BY_ID } from '../../actions/types';
import expect from 'expect';
let user = {};
describe('dashboardReducer', () => {
  it('should return the initial state', () => {
    expect(reducer(undefined, {})).toEqual({
      audienceFetched: false,
      audienceFetching: false,
      audienceList: {},
      campaignById: {},
      campaignByIdFetched: false,
      campaignByIdFetchingd: false,
      campaignFetched: false,
      campaignFetching: false,
      campaignList: {},
      errAudience: false,
      errCampaign: false,
      errCampaignById: false,
      errSurvey: false,
      surveyFetched: false,
      surveyFetching: false,
      surveyList: {}
    });
  });

  it('should handle SET_CAMPAIGNS_LIST', () => {
    const action = {
      type: SET_CAMPAIGNS_LIST,
      user
    };

    // it's empty on purpose because it's just starting to fetch posts
    expect(reducer({}, action)).toEqual({ campaignFetched: true, campaignFetching: false, campaignList: undefined, errCampaign: false });
  });

  it('should handle SET_AUDIENCE_LIST', () => {
    const action = {
      type: SET_AUDIENCE_LIST
      // important to pass correct payload, that's what the tests are for ;)
    };
    expect(
      reducer(
        {
          emailUsername: '',
          isAuthenticated: false,
          password: '',
          user: {}
        },
        action
      )
    ).toEqual({
      audienceFetched: true,
      audienceFetching: false,
      audienceList: undefined,
      emailUsername: '',
      errAudience: false,
      isAuthenticated: false,
      password: '',
      user: {}
    });
  });

  it('should handle SET_SURVEY_DASHBOARD_LIST', () => {
    const action = {
      type: SET_SURVEY_DASHBOARD_LIST,
      user
    };
    expect(reducer({}, action)).toEqual({ errSurvey: false, surveyFetched: true, surveyFetching: false, surveyList: undefined });
  });

  it('should handle SET_CAMPAIGN_BY_ID', () => {
    const action = {
      type: SET_CAMPAIGN_BY_ID,
      user
    };
    expect(reducer({}, action)).toEqual({ campaignById: undefined, campaignByIdFetched: true, campaignByIdFetchingd: false, errCampaignById: false });
  });

  describe('Actions are invoked', () => {
    it('getAudienceList is called', () => {
      expect(getAudienceList({})).toBeTruthy();
    });
    it('getCampaignById is called', () => {
      expect(getCampaignById({})).toBeTruthy();
    });
    it('getCampaignsList is called', () => {
      expect(getCampaignsList({})).toBeTruthy();
    });
    it('getsurveyDashboardList is called', () => {
      expect(getsurveyDashboardList({})).toBeTruthy();
    });
    it('insertCampaign is called', () => {
      expect(insertCampaign({})).toBeTruthy();
    });
    it('setAudienceList is called', () => {
      expect(setAudienceList({})).toBeTruthy();
    });
    it('setCampaignById is called', () => {
      expect(setCampaignById({})).toBeTruthy();
    });
    it('setCampaignsList is called', () => {
      expect(setCampaignsList({})).toBeTruthy();
    });
    it('setsurveyDashboardList is called', () => {
      expect(setsurveyDashboardList({})).toBeTruthy();
    });
    it('updateCampaignById is called', () => {
      expect(updateCampaignById({})).toBeTruthy();
    });
  });
});
