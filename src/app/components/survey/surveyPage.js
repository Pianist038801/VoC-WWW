import React, { Component } from 'react';
import { connect } from 'react-redux';

class SurveyPage extends Component {

  constructor(props) {
    super(props);
    this.state = {}
  }

  componentDidMount() {
  }

  render() {
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

          <div className="row">
            <div className="col-md-6">
              <div className="cont">
                <p className="fw-500 mb-1">NEW CUSTOMERS</p>
                <p className="mb-0 lh-4">John Smith - 10/13/17</p>
                <p>8 Questions</p>
                <p className="mb-4">In sed purus rhoncus, porta ex sit amet, interdum nisl. Phasellus vel suscipit  orci. Quisque in molestie metus. Interdum et malesuada fames ac ante ipsum  primis in faucibus. Ut finibus bibendum est, id porta tellus.</p>
                <p className="fw-500 mb-1">CAMPAIGNS</p>
                <ul className="list-unstyled mb-0">
                  <li>2017 New Pharmacy Customers</li>
                  <li>West Coast Customers</li>
                  <li>Online Order Survey</li>
                </ul>
              </div>
            </div>
            <div className="col-md-6">
              <div className="cont">
                <p className="fw-500 mb-1">NEW CUSTOMERS</p>
                <p className="mb-0 lh-4">John Smith - 10/13/17</p>
                <p>8 Questions</p>
                <p className="mb-4">In sed purus rhoncus, porta ex sit amet, interdum nisl. Phasellus vel suscipit  orci. Quisque in molestie metus. Interdum et malesuada fames ac ante ipsum  primis in faucibus. Ut finibus bibendum est, id porta tellus.</p>
                <p className="fw-500 mb-1">CAMPAIGNS</p>
                <ul className="list-unstyled mb-0">
                  <li>2017 New Pharmacy Customers</li>
                  <li>West Coast Customers</li>
                  <li>Online Order Survey</li>
                </ul>
              </div>
            </div>
          </div>

          <div className="row">
            <div className="col-md-6">
              <div className="cont">
                <p className="fw-500 mb-1">NEW CUSTOMERS</p>
                <p className="mb-0 lh-4">John Smith - 10/13/17</p>
                <p>8 Questions</p>
                <p className="mb-4">In sed purus rhoncus, porta ex sit amet, interdum nisl. Phasellus vel suscipit  orci. Quisque in molestie metus. Interdum et malesuada fames ac ante ipsum  primis in faucibus. Ut finibus bibendum est, id porta tellus.</p>
                <p className="fw-500 mb-1">CAMPAIGNS</p>
                <ul className="list-unstyled mb-0">
                  <li>2017 New Pharmacy Customers</li>
                  <li>West Coast Customers</li>
                  <li>Online Order Survey</li>
                </ul>
              </div>
            </div>
            <div className="col-md-6">
              <div className="cont">
                <p className="fw-500 mb-1">NEW CUSTOMERS</p>
                <p className="mb-0 lh-4">John Smith - 10/13/17</p>
                <p>8 Questions</p>
                <p className="mb-4">In sed purus rhoncus, porta ex sit amet, interdum nisl. Phasellus vel suscipit  orci. Quisque in molestie metus. Interdum et malesuada fames ac ante ipsum  primis in faucibus. Ut finibus bibendum est, id porta tellus.</p>
                <p className="fw-500 mb-1">CAMPAIGNS</p>
                <ul className="list-unstyled mb-0">
                  <li>2017 New Pharmacy Customers</li>
                  <li>West Coast Customers</li>
                  <li>Online Order Survey</li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </section>
    );
  }
}

export default connect(null, {})(
  SurveyPage
);
