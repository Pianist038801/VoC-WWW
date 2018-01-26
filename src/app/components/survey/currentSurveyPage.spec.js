import React from 'react'
import renderer from 'react-test-renderer'

import CurrentSurveyPage from './currentSurveyPage'
import SURVEYS from '../../../assets/jsons/surveyDashboard.json'
import SURVEYDETAILS from '../../../assets/jsons/SurveyDetail.json'
import { shallow } from 'enzyme'

describe('<CurrentSurveyPage />', () => {
  const commonProps = {
    global:
      {
        detail: null
      }
  }
  const props = {...commonProps,
    global:
      {
        detail: SURVEYDETAILS.SurveyDetail[0]
      },
    dispatch: jest.fn()
  }

  describe('when props.detail is undefined', () => {
    it('renders correctly', () => {
      const tree = renderer.create(
        <CurrentSurveyPage {...commonProps} />
      ).toJSON()

      expect(tree).toMatchSnapshot()
    })
  })
  
  describe('when props.detail is defined', () => {
    it('renders correctly', () => {
      const tree = renderer.create(
        <CurrentSurveyPage {...props} />
      ).toJSON()

      expect(tree).toMatchSnapshot()
    })
  })
   
})
