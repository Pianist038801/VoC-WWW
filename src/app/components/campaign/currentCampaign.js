import React, { Component } from 'react';
import { Link } from "react-router";
import { connect } from "react-redux";

class CurrentCampaign extends Component {

  constructor(props) {
    super(props);
    this.state = {
      campaigns: []
    }
  }

  componentDidMount() {
  }

  render() {
    return (
      <section className="left-section">
        <div className="navicon">
          <i className="fa fa-bars"></i>
        </div>
        <div className="wrapper current-campaign">
          <div className="row">
            <div className="col-xl-5">
              <h4 className="pb-1">Campaign 01</h4>
              <div className="cont campaign01">
                <img className="img-fluid" src="images/chart.png" alt="Chart"/>
                <p className="mt-4 mb-3">In sed purus rhoncus, porta ex sit amet, interdum nisl. Phasellus vel suscipit orci. Quisque in molestie metus.  Interdum et malesuada fames ac ante ipsum primis in  faucibus. Ut finibus bibendum est, id porta tellus.</p>
                <table className="d-block">
                  <tr>
                    <th>Start</th>
                    <td>10/15/17</td>
                  </tr>
                  <tr>
                    <th>End</th>
                    <td  className="pb-3">10/15/17</td>
                  </tr>
                  <tr>
                    <th>Created</th>
                    <td>Steve Robbins</td>
                  </tr>
                  <tr>
                    <th>Date</th>
                    <td className="pb-3">10/15/17</td>
                  </tr>
                  <tr>
                    <th>Last Modified</th>
                    <td>Joe French</td>
                  </tr>
                  <tr>
                    <th>Date</th>
                    <td className="pb-3">11/18/17</td>
                  </tr>
                  <tr>
                    <th>Survey</th>
                    <td className="pb-3">New Phone Customers</td>
                  </tr>
                  <tr>
                    <th>Audiences</th>
                    <td>Segment 011, Segment 023, Segment 832, Segment 810</td>
                  </tr>
                </table>
              </div>
            </div>
            <div className="col-xl-7">
              <h4 className="pb-1">Configuration</h4>
              <div className="cont configuration schedule">
                <div className="leftbar">
                  <ul className="list-unstyled">
                    <li><a className="active" href="#">SCHEDULE</a></li>
                    <li><a href="#">SETTINGS</a></li>
                    <li><a href="#">ALERTS</a></li>
                  </ul>
                </div>
                <div className="right-section">
                  <div className="form-group">
                    <span className="fw-500 text-lightblue mr-4">Start Date</span><input type="text" className="form-control input-date text-center form-lightblue d-inline" value="10/15/17"/>
                  </div>
                  <div className="form-group">
                    <span className="fw-500 text-lightblue mr-4 pr-2">End Date</span><input type="text" className="form-control input-date text-center form-lightblue d-inline" value="10/15/17"/>
                  </div>
                  <div className="schedule-elements">
                    <div className="d-flex mb-2">
                      <div className="day sr-1 mr-4">S</div>
                      <div className="fw-500 time-slot start-time-1"></div>
                      <div className="slider-range slider-range-1 mx-3 my-2"></div>
                      <div className="fw-500 time-slot end-time-1"></div>
                    </div>
                    <div className="d-flex mb-2">
                      <div className="day sr-2 mr-4">M</div>
                      <div className="fw-500 time-slot start-time-2"></div>
                      <div className="slider-range slider-range-2 mx-3 mt-2"></div>
                      <div className="fw-500 time-slot end-time-2"></div>
                    </div>
                    <div className="d-flex mb-2">
                      <div className="day sr-3 mr-4">T</div>
                      <div className="fw-500 time-slot start-time-3"></div>
                      <div className="slider-range slider-range-3 mx-3 mt-2"></div>
                      <div className="fw-500 time-slot end-time-3"></div>
                    </div>
                    <div className="d-flex mb-2">
                      <div className="day sr-4 mr-4">W</div>
                      <div className="fw-500 time-slot start-time-4"></div>
                      <div className="slider-range slider-range-4 mx-3 mt-2"></div>
                      <div className="fw-500 time-slot end-time-4"></div>
                    </div>
                    <div className="d-flex mb-2">
                      <div className="day sr-5 mr-4">T</div>
                      <div className="fw-500 time-slot start-time-5"></div>
                      <div className="slider-range slider-range-5 mx-3 mt-2"></div>
                      <div className="fw-500 time-slot end-time-5"></div>
                    </div>
                    <div className="d-flex mb-2">
                      <div className="day sr-6 mr-4">F</div>
                      <div className="fw-500 time-slot start-time-6"></div>
                      <div className="slider-range slider-range-6 mx-3 mt-2"></div>
                      <div className="fw-500 time-slot end-time-6"></div>
                    </div>
                    <div className="d-flex">
                      <div className="day sr-7 mr-4">S</div>
                      <div className="fw-500 time-slot start-time-7"></div>
                      <div className="slider-range slider-range-7 mx-3 mt-2"></div>
                      <div className="fw-500 time-slot end-time-7"></div>
                    </div>

                    <div className="custom-checkbox exclude-dates">
                      <input type="checkbox" id="checkbox01" checked />
                      <label htmlFor="checkbox01"><span className="text-lightblue">Exclude Dates</span></label>
                    </div>
                    <div className="ml-5 pl-1">
                      <input type="text" className="form-control form-lightblue d-inline fw-500 thanksgiving w-100 mr-2 mb-0 mb-lg-1" value="Thanksgiving"/>
                      <input type="text" value="10/23/17" className="form-control form-lightblue d-inline thanksgiving-date text-center fw-500 w-100"/>
                    </div>
                    <div className="d-flex ml-3 mt-3 mb-2 pl-1">
                      <div className="custom-checkbox cs-1">
                        <input type="checkbox" id="cs-1" />
                        <label htmlFor="cs-1">&nbsp;</label>
                      </div>
                      <div className="fw-500 time-slot start-time-8"></div>
                      <div className="slider-range slider-range-8 mx-3 mt-2"></div>
                      <div className="fw-500 time-slot end-time-8"></div>
                    </div>
                    <div className="ml-5 pl-1">
                      <input type="text" className="form-control form-lightblue d-inline fw-500 thanksgiving w-100 mr-2 mb-0 mb-lg-1" value="Christmas"/>
                      <input type="text" value="10/25/17" className="form-control form-lightblue d-inline thanksgiving-date text-center fw-500 w-100"/>
                    </div>
                    <div className="d-flex ml-3 mt-3 mb-4 pl-1">
                      <div className="custom-checkbox cs-2">
                        <input type="checkbox" id="cs-2" />
                        <label htmlFor="cs-2">&nbsp;</label>
                      </div>
                      <div className="fw-500 time-slot start-time-9"></div>
                      <div className="slider-range slider-range-9 mx-3 mt-2"></div>
                      <div className="fw-500 time-slot end-time-9"></div>
                    </div>
                    <div className="ml-3">
                    &nbsp;<button className="btn bg-lightblue btn-add" type="button">
                        <i className="fa fa-plus"></i>
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    );
  }
}

export default connect(null, {})(
  CurrentCampaign
);
