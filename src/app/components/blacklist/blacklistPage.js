import React, { Component } from 'react';
import { connect } from 'react-redux';

class BlacklistPage extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  componentDidMount() {}

  render() {
    return (
      <section className="left-section">
        <div className="navicon">
          <i className="fa fa-bars" />
        </div>
        <div className="wrapper blacklist">
          <div className="row mb-2">
            <div className="col-4 pt-3">
              <h4>Do Not Call</h4>
            </div>
            <div className="col-8 pt-2">
              <div className="float-right">
                <button type="button" className="btn bg-lightblue btn-edit">
                  <i className="fa fa-plus-circle" />
                  <span>EDIT</span>
                </button>
              </div>
              <div className="clearfix" />
            </div>
          </div>

          <div className="cont">
            <div className="d-flex">
              <div className="bg-lightgray numbers">42 Numbers</div>
              <div className="bg-lightgray">Last Edited 10/17/17</div>
            </div>
            <div className="list-num w-100">
              <div className="row">
                <div className="col-5 mb-3 mb-sm-0 col-sm-3">
                  <ul className="list-unstyled mb-0">
                    <li>888-555-1234</li>
                    <li>888-555-1234</li>
                    <li>888-555-1234</li>
                    <li>888-555-1234</li>
                    <li>888-555-1234</li>
                    <li>888-555-1234</li>
                    <li>888-555-1234</li>
                    <li>888-555-1234</li>
                    <li>888-555-1234</li>
                    <li>888-555-1234</li>
                    <li>888-555-1234</li>
                    <li>888-555-1234</li>
                    <li>888-555-1234</li>
                    <li>888-555-1234</li>
                  </ul>
                </div>
                <div className="col-5 mb-3 mb-sm-0 col-sm-3">
                  <ul className="list-unstyled mb-0">
                    <li>888-555-1234</li>
                    <li>888-555-1234</li>
                    <li>888-555-1234</li>
                    <li>888-555-1234</li>
                    <li>888-555-1234</li>
                    <li>888-555-1234</li>
                    <li>888-555-1234</li>
                    <li>888-555-1234</li>
                    <li>888-555-1234</li>
                    <li>888-555-1234</li>
                    <li>888-555-1234</li>
                    <li>888-555-1234</li>
                    <li>888-555-1234</li>
                    <li>888-555-1234</li>
                  </ul>
                </div>
                <div className="col-5 mb-3 mb-sm-0 col-sm-3">
                  <ul className="list-unstyled mb-0">
                    <li>888-555-1234</li>
                    <li>888-555-1234</li>
                    <li>888-555-1234</li>
                    <li>888-555-1234</li>
                    <li>888-555-1234</li>
                    <li>888-555-1234</li>
                    <li>888-555-1234</li>
                    <li>888-555-1234</li>
                    <li>888-555-1234</li>
                    <li>888-555-1234</li>
                    <li>888-555-1234</li>
                    <li>888-555-1234</li>
                    <li>888-555-1234</li>
                    <li>888-555-1234</li>
                  </ul>
                </div>
                <div className="col-5 mb-3 mb-sm-0 col-sm-3">
                  <ul className="list-unstyled mb-0">
                    <li>888-555-1234</li>
                    <li>888-555-1234</li>
                    <li>888-555-1234</li>
                    <li>888-555-1234</li>
                    <li>888-555-1234</li>
                    <li>888-555-1234</li>
                    <li>888-555-1234</li>
                    <li>888-555-1234</li>
                    <li>888-555-1234</li>
                    <li>888-555-1234</li>
                    <li>888-555-1234</li>
                    <li>888-555-1234</li>
                    <li>888-555-1234</li>
                    <li>888-555-1234</li>
                  </ul>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    );
  }
}

export default connect(null, {})(BlacklistPage);
