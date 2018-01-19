import React, { Component } from 'react';
import { connect } from 'react-redux';

class CurrentCampaignAlert extends Component {

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
                <img className="img-fluid" src="images/chart.png" alt="Chart">
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
                      <li><a href="#">SCHEDULE</a></li>
                      <li><a href="#">SETTINGS</a></li>
                      <li><a className="active" href="#">ALERTS</a></li>
                    </ul>
                  </div>
                  <div className="right-section">
                    <div className="campaign-alerts mt-2">
                      <span className="text-lightblue">Campaign Alerts</span>
                      <div className="cont-lightgray mt-1 mb-2">
                        <div className="bg-lightblue">Question 1</div>
                        <div className="bg-lightblue">Value above</div>
                        <div className="bg-lightblue">03</div>
                        <div className="bg-lightblue">Email 03</div>
                      </div>
                      <button className="btn bg-lightblue btn-add d-block" type="button">
                        <i className="fa fa-plus"></i>
                      </button>
                    </div>
                    <div className="alerts-elements">
                      <span className="text-lightblue mb-1">Specific word alerts</span>
                      <textarea className="form-control" name="" rows="6" placeholder="Donec, commodo, nisi, eget, cursus, arcu, augue, integer, luctus, finibus, neque, mattis"></textarea>
                      <div className="mb-1"><span className="text-lightblue fw-500 mr-2">Notify</span><input type="email" className="form-control form-lightblue d-inline" value="john@email.com"></div>
                      <div className="ml-4 pl-2 mb-1"><span className="text-lightblue fw-500 mr-2">&nbsp;</span><input type="email" className="form-control form-lightblue d-inline" value="john@email.com"></div>
                      <div className="ml-4 pl-3">
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
  CurrentCampaignAlert
);
