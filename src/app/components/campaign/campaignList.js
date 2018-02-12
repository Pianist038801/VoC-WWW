import React, { Component } from 'react';
import { Link } from 'react-router';
import { connect } from 'react-redux';
import { getCampaignsList, getCampaignById } from '../../actions/dashboardActions';
import Loader from 'react-loader';
export class CampaignsList extends Component {
  constructor(props) {
    super(props);
    this.state = {
      toggle: 1
    };
    //call api
    try {
      this.props.getCampaignsList();
    } catch (err) {}
  }
  handleToggle() {
    if (this.state.toggle == 1) {
      this.setState({ toggle: 2 });
    } else {
      this.setState({ toggle: 1 });
    }
  }
  render() {
    return (
      <div className="left-section">
        <div className="navicon" onClick={this.handleToggle.bind(this, 1)}>
          <i className="fa fa-bars" />
        </div>
        <div className="wrapper dashboard">
          <div className="float-right mb-3">
            <span className="btn-group">
              <button type="button" onClick={this.handleToggle.bind(this, 1)} className={this.state.toggle == 1 ? 'btn active' : 'btn'}>
                <i className="fa fa-th-large" />
              </button>
              <button type="button" onClick={this.handleToggle.bind(this, 2)} className={this.state.toggle == 2 ? 'btn active' : 'btn'}>
                <i className="fa fa-bars" />
              </button>
            </span>
            <Link to="create-campaign" className="btn bg-lightblue btn-new-campaign">
              <i className="fa fa-plus-circle" /> NEW CAMPAIGN
            </Link>
          </div>

          <div className="clearfix" />
          <Loader loaded={this.props.campaignList.data && this.props.campaignList.data.length > 0 ? true : false}>
            {this.props.campaignList.data && this.props.campaignList.data.length > 0 ? (
              <div className="row">
                {this.props.campaignList.data &&
                  this.state.toggle == 1 &&
                  this.props.campaignList.data.map((val, index) => {
                    return (
                      <div className={this.state.toggle == 1 ? 'col-md-6 pr-xl-4' : ''} key={index}>
                        <Link to={'/create-campaign/?id=' + this.props.campaignList.data[index].id}>
                          <h4>{val.name}</h4>
                          <div className="cont">
                            <div className="bg-lightblue float-left">
                              {val.startDate} - {val.endDate}
                            </div>
                            <div className="bg-lightblue float-right">ACTIVE</div>
                            <div className="clearfix" />
                            <p className="created">
                              <span className="mr-3">Created</span> {val.created}
                            </p>
                            <p>
                              <span className="mr-2">Modified</span> April 24, 2017 - James Speaker
                            </p>
                            <img className="img-fluid speaker" src={window.location.origin + '/images/speaker.png'} alt="Chart" />
                            <p className="mt-4">
                              <span>Audience 001, Audience 002</span>
                              <span className="float-right">{val.surveyName}</span>
                            </p>
                            <p className="mb-0">{val.description}</p>
                          </div>
                        </Link>
                      </div>
                    );
                  })}
              </div>
            ) : (
              <div>There are no campaigns created.Click on the new campaign to get started </div>
            )}
          </Loader>
        </div>
      </div>
    );
  }
}
CampaignsList.propTypes = {
  getCampaignsList: React.PropTypes.func.isRequired
};

function mapStateToProps(state) {
  return {
    campaignList: state.dashboardReducer.campaignList
  };
}
export default connect(mapStateToProps, { getCampaignsList, getCampaignById })(CampaignsList);
