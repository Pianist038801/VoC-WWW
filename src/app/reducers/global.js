import { SET_CURRENT_USER } from '../actions/types';
import isEmpty from 'lodash/isEmpty';
import SURVEYS from '../../assets/jsons/surveyDashboard.json'
import SURVEYDETAILS from '../../assets/jsons/SurveyDetail.json'
const initialState = {
  surveys: SURVEYS.SurveyDashboard,
  detail: SURVEYDETAILS.SurveyDetail[0]
};

export default (state=initialState, action={}) => {
  switch(action.type) {
    case SET_CURRENT_USER:
      return { ...state,
        isAuthenticated: !isEmpty(action.user),
        user: action.user,
      };
    case 'SET_DATA':
      return {
        ...state,
        data: {...state.data, ...action.data}
      }  
    default: return state;
  }
}