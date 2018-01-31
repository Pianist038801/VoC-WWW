import { SET_CURRENT_USER } from '../actions/types';
import isEmpty from 'lodash/isEmpty';
import SURVEYS from '../../assets/jsons/surveyDashboard.json'
import SURVEYDETAILS from '../../assets/jsons/SurveyDetail.json'
const initialState2 = {
  surveys: SURVEYS.SurveyDashboard,
  detail: SURVEYDETAILS.SurveyDetail[0]
};
const initialState = {
  surveys: SURVEYS.SurveyDashboard,
  detail: SURVEYS.SurveyDashboard[0]
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
    case 'TOGGLE_QUESTION':
      let detail = state.detail
      
      if (detail.Questions[action.questionIndex].Input[action.tagIndex].enabled == true)
        detail.Questions[action.questionIndex].Input[action.tagIndex].enabled = false
      else
        detail.Questions[action.questionIndex].Input[action.tagIndex].enabled = true  
      
      return {
        ...state,
        detail: detail
        } 
    default: return state;
  }
}