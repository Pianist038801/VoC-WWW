import React, { Component } from 'react';
import { connect } from 'react-redux';
import { browserHistory } from 'react-router'

class SurveyPage extends Component {

  constructor(props) {
    super(props);
    this.state = {}
  }

  componentDidMount() {
  }

  gotoDetail = (surveyID) => { 
    browserHistory.push('current-survey')
    this.props.dispatch({type: 'SET_DATA', data: {surveyID: surveyID} })
  }

  render() {
    let surveys = [] 
    for (let i = 0; i < this.props.global.surveys.length; i+=2)      
    {
      let rowItems = []

      for (let j = 0; j < 2 && i + j < this.props.global.surveys.length; j++) {
        let survey = this.props.global.surveys[i + j]
        let campaigns = survey.Campaigns.map((campaign, index) => <li key={index}>{campaign}</li>)

        rowItems.push( 
          <div className="col-md-6" key={j} onClick={()=>this.gotoDetail(survey.surveyID)} >
            <div className="cont">
              <p className="fw-500 mb-1">{survey.Name}</p>
              <p className="mb-0 lh-4">{survey.Author} - {survey.Created}</p>
              <p className="mb-4">{survey.Description}</p>
              <p className="fw-500 mb-1">CAMPAIGNS</p>
              <ul className="list-unstyled mb-0">
                {campaigns}
              </ul>
            </div>
          </div> 
        )
      }

      surveys.push(
        <div className="row" key={i}>
          {rowItems}
        </div>
      )
    }  
    if (surveys.length == 0)
    {
      surveys.push(
        <p>You have not create any surveys.  Click on “New Survey” to get started”
        </p>
      )
    }  
    return (
      <section className="left-section">
        <div className="navicon">
          <i className="fa fa-bars"></i>
        </div>
        <div className="wrapper create-survey">
          <div className="row mb-3">
            <div className="col-4 pt-3">
              <h4 className="mb-0">Surveys</h4>
            </div>
            <div className="col-8">
              <div className="float-right">
                <span className="btn-group">
                  <button type="button" className="btn active"><i className="fa fa-th-large"></i></button>
                  <button type="button" className="btn"><i className="fa fa-bars"></i></button>
                </span>
                <button type="button" className="btn bg-lightblue btn-create-survey">
                   <i className="fa fa-plus-circle"></i><span>CREATE SURVEY</span>
                </button>
              </div>
              <div className="clearfix"></div>
            </div>
          </div>

          {surveys}
 
        </div>
      </section>
    );
  }
}

function mapStateToProps(state) {
  console.log('State',state)
  const global = state.global
  console.log('global', global)
  return { global: global };
}

function mapDispatchToProps(dispatch) { 
  
  return { dispatch };
}

export default connect(mapStateToProps, mapDispatchToProps)(
  SurveyPage
);