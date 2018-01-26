import React from 'react'
import renderer from 'react-test-renderer'

import SurveyPage from './surveyPage'
import SURVEYS from '../../../assets/jsons/surveyDashboard.json'
import SURVEYDETAILS from '../../../assets/jsons/SurveyDetail.json'
import { shallow } from 'enzyme'

describe('<SurveyPage />', () => {
  const commonProps = {
    global:
      {
        serveys: []
      }
  }
  const props = {...commonProps,
    global:
      {
        serveys: SURVEYS.SurveyDashboard
      },
    dispatch: jest.fn()
  }

  describe('when props.surveys is undefined', () => {
    it('renders correctly', () => {
      const tree = renderer.create(
        <SurveyPage {...commonProps} />
      ).toJSON()

      expect(tree).toMatchSnapshot()
    })
  })
  
  describe('when props.surveys is defined', () => {
    it('renders correctly', () => {
      const tree = renderer.create(
        <SurveyPage {...props} />
      ).toJSON()

      expect(tree).toMatchSnapshot()
    })
  })
   
  describe('gotoDetail calls props.dispatch correctly', () => {
    const wrapper = swallow(<SurveyPage {...props} />)
    wrapper.instance().gotoDetail()
    expect(props.dispatch).toHaveBeenCalled() 
  })
   
})
