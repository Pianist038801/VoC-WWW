import React, { Component } from 'react';

import { Link } from 'react-router';
import { connect } from 'react-redux';
import { getAudienceList, getsurveyDashboardList } from '../../actions/dashboardActions';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import moment from 'moment';

class CreateCampaign extends Component {
  constructor(props) {
    super(props);
    this.state = {
      audienceList: null,
      audienceKey: null,
      audienceGroupLength: null,
      selectedGroup: [],
      error: false,
      surveyDashboardList: null,
      surveySelected: null,
      startDate: moment(),
      endDate: moment()
    };

    this.props.getAudienceList().then(res => {
      this.setState({
        audienceList: res.data,
        audienceKey: Object.keys(res.data.Audience),
        audienceGroupLength: Object.keys(res.data.Audience).length,
        selectedGroup: [res.data.Audience['Audience Group 1'][0]]
      });
      console.log(this.state.audienceGroupLength);
      //this.setState({ campaigns: [] });
    });
    //getsurveyDashboardList
    this.props.getsurveyDashboardList().then(res => {
      this.setState({ surveyDashboardList: res.data });
      //this.setState({ audienceGroupLength: Object.keys(res.data.Audience).length});
      console.log(this.state.surveyDashboardList);
      //this.setState({ campaigns: [] });
    });
  }

  handleStartDateChange(date) {
    console.log(date.format('MM/DD/YYYY'));
    if (date.diff(moment(), 'days') < 0) {
      this.setState({ startDate: moment() });
    } else {
      this.setState({ startDate: date });
    }
  }
  handleEndDateChange(date) {
    console.log(date.format('MM/DD/YYYY'));
    if (date.diff(this.state.startDate, 'days') < 0) {
      this.setState({ endDate: this.state.startDate });
    } else {
      this.setState({ endDate: date });
    }
  }
  _handleSurveySelect(e) {
    this.setState({ surveySelected: e.target.value });
    console.log(this.state.surveySelected);
  }
  _handleChangeSelect(order, e) {
    let selectedGroup = this.state.selectedGroup;
    selectedGroup[order] = e.target.value;
    // if(e.target.value == "-1"){
    // 	selectedGroup.splice(order,1)
    // }
    this.setState({ selectedGroup: selectedGroup });
    let flag = false;
    for (let i = 0; i < selectedGroup.length; i++) {
      if (selectedGroup[i] != '-1') {
        this.setState({ error: false });
        flag = true;
        break;
      }
    }
    if (flag == false) {
      this.setState({ error: true });
    }
    console.log(this.state.error);
    console.log(this.state.selectedGroup);
  }
  _addAudience() {
    this.state.audienceKey.push({});
    this.setState({ audienceKey: this.state.audienceKey });
    console.log(this.state.audienceKey);
  }
  render() {
    return (
      <section className="left-section">
        <div className="navicon">
          <i className="fa fa-bars" />
        </div>
        <div className="wrapper campaigns">
          <form>
            <h4>New Campaign</h4>
            <div className="cont new-campaign">
              <div className="form-group campaign-name">
                <label>CAMPAIGN NAME</label>
                <textarea type="text" className="form-control" placeholder="Enter Campaign Name" />
                <small className="form-text text-danger text-hide">Text validation</small>
              </div>

              <div className="form-group">
                <label>CAMPAIGN SUMMARY</label>
                <textarea type="text" className="form-control" placeholder="Enter Summary" />
                <small className="form-text text-danger text-hide">Text validation</small>
              </div>
            </div>

            <h4>Audience</h4>
            <div className="cont audience">
              {this.state.error ? <p>Please Select atleaset one of the Option</p> : ''}

              {this.state.audienceList &&
                this.state.audienceKey.map((keys, index) => (
                  <div className={'custom-select-option mb-4'} key={index}>
                    <select className="form-control" onChange={this._handleChangeSelect.bind(this, index)}>
                      <option className="placeholder" selected>
                        Select audience
                      </option>
                      <option key={-1} value="-1">
                        Select audience
                      </option>
                      {this.state.audienceList.Audience[keys] &&
                        this.state.audienceList.Audience[keys].map(function(val, index) {
                          return (
                            <option key={index} value={val} selected={keys == 'Audience Group 1' && index == 0 ? true : false}>
                              {val}
                            </option>
                          );
                        })}
                    </select>
                  </div>
                ))}

              <br />
              <button className="btn bg-lightblue" type="button" onClick={this._addAudience.bind(this)}>
                <i className="fa fa-plus-circle" />
                <span>Add Audience</span>
              </button>
            </div>

            <h4>Survey</h4>
            <div className="cont audience">
              <div className="custom-select-option">
                <select className="form-control" onChange={this._handleSurveySelect.bind(this)}>
                  <option className="placeholder" selected>
                    Select survey
                  </option>
                  <option key={-1} value="-1">
                    Select survey
                  </option>
                  {this.state.surveyDashboardList &&
                    this.state.surveyDashboardList.SurveyDashboard.map(function(val, index) {
                      return (
                        <option key={index} value={val.Name}>
                          {val.Name}
                        </option>
                      );
                    })}
                </select>
              </div>
              <br />
              <Link to="surveys">
                <button className="btn bg-lightblue" type="button">
                  <i className="fa fa-plus-circle" />
                  <span>Creat New Survey</span>
                </button>
              </Link>
            </div>

            <h4>Schedule</h4>
            <div className="cont schedule">
              <div className="form-group mb-4 pb-3">
                <label>
                  <span className="fw-500">CAMPAIGN START AND END DATE</span>
                </label>
                <div>
                  <div />
                  <span>
                    <DatePicker
                      className="form-control text-center start-date d-inline mr-4"
                      selected={this.state.startDate}
                      onChange={this.handleStartDateChange.bind(this)}
                    />

                    <DatePicker
                      className="form-control text-center end-date d-inline"
                      selected={this.state.endDate}
                      onChange={this.handleEndDateChange.bind(this)}
                    />
                  </span>
                </div>
              </div>
              <div className="schedule-elements">
                <div className="d-flex mb-2">
                  <div className="day sr-1 mr-4">S</div>
                  <div className="fw-500 start-time-1" />
                  <div className="slider-range slider-range-1 mx-3 my-2" />
                  <div className="fw-500 end-time-1" />
                </div>
                <div className="d-flex mb-2">
                  <div className="day sr-2 mr-4">M</div>
                  <div className="fw-500 start-time-2" />
                  <div className="slider-range slider-range-2 mx-3 mt-2" />
                  <div className="fw-500 end-time-2" />
                </div>
                <div className="d-flex mb-2">
                  <div className="day sr-3 mr-4">T</div>
                  <div className="fw-500 start-time-3" />
                  <div className="slider-range slider-range-3 mx-3 mt-2" />
                  <div className="fw-500 end-time-3" />
                </div>
                <div className="d-flex mb-2">
                  <div className="day sr-4 mr-4">W</div>
                  <div className="fw-500 start-time-4" />
                  <div className="slider-range slider-range-4 mx-3 mt-2" />
                  <div className="fw-500 end-time-4" />
                </div>
                <div className="d-flex mb-2">
                  <div className="day sr-5 mr-4">T</div>
                  <div className="fw-500 start-time-5" />
                  <div className="slider-range slider-range-5 mx-3 mt-2" />
                  <div className="fw-500 end-time-5" />
                </div>
                <div className="d-flex mb-2">
                  <div className="day sr-6 mr-4">F</div>
                  <div className="fw-500 start-time-6" />
                  <div className="slider-range slider-range-6 mx-3 mt-2" />
                  <div className="fw-500 end-time-6" />
                </div>
                <div className="d-flex">
                  <div className="day sr-7 mr-4">S</div>
                  <div className="fw-500 start-time-7" />
                  <div className="slider-range slider-range-7 mx-3 mt-2" />
                  <div className="fw-500 end-time-7" />
                </div>

                <div className="custom-checkbox exclude-dates">
                  <input type="checkbox" id="checkbox01" checked />
                  <label htmlFor="checkbox01">
                    <span className="text-lightblue">Exclude Dates</span>
                  </label>
                </div>
                <div className="ml-5 pl-1">
                  <input type="text" className="form-control form-lightblue d-inline fw-500 thanksgiving w-100 mr-2" value="Thanksgiving" />
                  <input type="text" value="10/23/17" className="form-control form-lightblue d-inline thanksgiving-date text-center fw-500 w-100" />
                </div>
                <div className="d-flex ml-3 mt-3 mb-2 pl-1">
                  <div className="custom-checkbox cs-1">
                    <input type="checkbox" id="cs-1" />
                    <label htmlFor="cs-1">&nbsp;</label>
                  </div>
                  <div className="fw-500 start-time-8" />
                  <div className="slider-range slider-range-8 mx-3 mt-2" />
                  <div className="fw-500 end-time-8" />
                </div>
                <div className="ml-5 pl-1">
                  <input type="text" className="form-control form-lightblue d-inline fw-500 thanksgiving w-100 mr-2" value="Christmas" />
                  <input type="text" value="10/25/17" className="form-control form-lightblue d-inline thanksgiving-date text-center fw-500 w-100" />
                </div>
                <div className="d-flex ml-3 mt-3 mb-4 pl-1">
                  <div className="custom-checkbox cs-2">
                    <input type="checkbox" id="cs-2" />
                    <label htmlFor="cs-2">&nbsp;</label>
                  </div>
                  <div className="fw-500 start-time-9" />
                  <div className="slider-range slider-range-9 mx-3 mt-2" />
                  <div className="fw-500 end-time-9" />
                </div>
                <div className="ml-3">
                  &nbsp;<button className="btn bg-lightblue btn-add" type="button">
                    <i className="fa fa-plus" />
                  </button>
                </div>
              </div>
            </div>

            <h4>Configuration</h4>
            <div className="cont configuration">
              <div className="row mb-4">
                <div className="col-6">
                  <div className="text-lightblue">Caller ID</div>
                </div>
                <div className="col-6 pl-1">
                  <div className="custom-select-option primary">
                    <select className="form-control">
                      <option selected>Blocked</option>
                      <option>Lorem</option>
                      <option>Ipsum</option>
                      <option>Dolor</option>
                    </select>
                  </div>
                </div>
              </div>

              <div className="row mb-4">
                <div className="col-6">
                  <div className="text-lightblue">Call back number</div>
                </div>
                <div className="col-6 pl-1">
                  <div className="custom-select-option primary">
                    <select className="form-control">
                      <option selected>Home_Number</option>
                      <option>Lorem</option>
                      <option>Ipsum</option>
                      <option>Dolor</option>
                    </select>
                  </div>
                </div>
              </div>

              <div className="row mb-4">
                <div className="col-6">
                  <div className="text-lightblue">Customer Identifier</div>
                </div>
                <div className="col-6 pl-1">
                  <div className="custom-select-option primary">
                    <select className="form-control">
                      <option selected>Account Number</option>
                      <option>Lorem</option>
                      <option>Ipsum</option>
                      <option>Dolor</option>
                    </select>
                  </div>
                </div>
              </div>

              <div className="row mb-2">
                <div className="col-5 col-sm-6">
                  <div className="text-lightblue">Frequency Per Customer</div>
                </div>
                <div className="col-7 col-sm-6 pl-1">
                  <span className="text-lightblue pl-5">Every</span>
                  <span className="custom-select-option w-50px primary every-call mx-1">
                    <select className="form-control">
                      <option selected>02</option>
                      <option>03</option>
                      <option>04</option>
                      <option>05</option>
                    </select>
                  </span>
                  <span className="text-lightblue">call</span>
                </div>
              </div>

              <div className="float-right mb-1">
                <span className="text-lightblue">Survey Accepted &amp; Completed: Days</span>
                <span className="custom-select-option w-50px primary mx-1">
                  <select className="form-control">
                    <option selected>02</option>
                    <option>03</option>
                    <option>04</option>
                    <option>05</option>
                  </select>
                </span>
              </div>

              <div className="float-right mb-1">
                <span className="text-lightblue">Survey Accepted &amp; Completed: Days</span>
                <span className="custom-select-option w-50px primary mx-1">
                  <select className="form-control">
                    <option>02</option>
                    <option selected>03</option>
                    <option>04</option>
                    <option>05</option>
                  </select>
                </span>
              </div>
              <div className="clearfix" />

              <div className="float-right mb-2">
                <span className="text-lightblue pr-4 mr-5">Survey Rejected : Days</span>&nbsp;&nbsp;
                <span className="custom-select-option w-50px primary mx-1">
                  <select className="form-control">
                    <option selected>10</option>
                    <option>03</option>
                    <option>04</option>
                    <option>05</option>
                  </select>
                </span>
              </div>
              <div className="clearfix" />

              <div className="row">
                <div className="col-5 pr-0">
                  <div className="custom-checkbox">
                    <input type="checkbox" id="checkbox02" checked />
                    <label htmlFor="checkbox02">
                      <span className="text-lightblue">Delayed Callback</span>
                    </label>
                    <span className="help-circled ml-1">
                      <i className="fa fa-question-circle" />
                    </span>
                  </div>
                </div>
                <div className="col-7 py-1">
                  <div className="mb-1">
                    <span className="fw-500 ml-1">1st Attempt</span> <input type="number" className="form-control form-lightblue mx-1 d-inline" value="05" />{' '}
                    <span className="fw-500">min</span>
                  </div>
                  <div className="mb-1">
                    <span className="fw-500 ml-1">2nd Attempt</span> <input type="number" className="form-control form-lightblue mr-1 d-inline" value="15" />{' '}
                    <span className="fw-500">min</span>
                  </div>
                  <div className="mb-1">
                    <span className="fw-500 ml-1 mr-2">Last Attempt</span>
                    <span className="custom-select-option primary">
                      <select className="form-control d-inline w-auto">
                        <option selected>Voicemail</option>
                        <option>Lorem</option>
                        <option>Ipsum</option>
                        <option>Dolor</option>
                      </select>
                    </span>
                  </div>
                  <button className="btn bg-lightblue btn-add" type="button">
                    <i className="fa fafa fa-plus" />
                  </button>
                </div>
              </div>
            </div>

            <h4>Alerts</h4>
            <div className="cont alerts">
              <div className="wrapper">
                <div className="custom-checkbox">
                  <input type="checkbox" id="checkbox03" checked />
                  <label htmlFor="checkbox03" className="mb-1">
                    <span className="text-lightblue">Specific word alerts</span>
                  </label>
                </div>
                <textarea
                  className="form-control"
                  name=""
                  rows="6"
                  placeholder="Donec, commodo, nisi, eget, cursus, arcu, augue, integer, luctus, finibus, neque, mattis"
                />
                <div className="ml-4 pl-2 mb-1">
                  <span className="text-lightblue fw-500 mr-2">Notify</span>
                  <input type="email" className="form-control form-lightblue d-inline" value="john@email.com" />
                </div>
                <div className="ml-5 pl-3 mb-1">
                  <span className="text-lightblue fw-500 mr-2">&nbsp;</span>
                  <input type="email" className="form-control form-lightblue d-inline" value="john@email.com" />
                </div>
                <div className="ml-5 pl-4">
                  &nbsp;<button className="btn bg-lightblue btn-add" type="button">
                    <i className="fa fa-plus" />
                  </button>
                </div>
                <div className="custom-checkbox low-score-alert">
                  <input type="checkbox" id="checkbox04" checked />
                  <label htmlFor="checkbox04" className="mb-1">
                    <span className="text-lightblue">Low Score Alert Threshold</span>
                  </label>
                </div>
                <div className="ml-4 pl-2 mb-1">
                  <span className="text-lightblue fw-500 mr-2">Notify</span>
                  <input type="email" className="form-control form-lightblue d-inline" value="john@email.com" />
                </div>
                <div className="ml-5 pl-3 mb-1">
                  <span className="text-lightblue fw-500 mr-2">&nbsp;</span>
                  <input type="email" className="form-control form-lightblue d-inline" value="john@email.com" />
                </div>
                <div className="ml-5 pl-4">
                  &nbsp;<button className="btn bg-lightblue btn-add" type="button">
                    <i className="fa fa-plus" />
                  </button>
                </div>
              </div>
            </div>

            <button className="btn bg-lightblue btn-create-campaign" type="button">
              <i className="fa fa-plus-circle" />
              <span>CREATE CAMPAIGN</span>
            </button>
          </form>
        </div>
      </section>
    );
  }
}

export default connect(null, { getAudienceList, getsurveyDashboardList })(CreateCampaign);
