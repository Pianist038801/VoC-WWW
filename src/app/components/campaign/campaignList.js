import React, { Component } from 'react';
import { Link } from 'react-router';
import { connect } from 'react-redux';
import { getCampaignsList } from '../../actions/dashboardActions';

class CampaignsList extends Component {
  constructor(props) {
    super(props);
    this.state = {
      campaigns: [],
      toggle: 1
    };
  }

  componentDidMount() {
    this.props.getCampaignsList().then(res => {
      this.setState({ campaigns: res.data });
      //this.setState({ campaigns: [] });
    });
  }

  handleToggle() {
    if (this.state.toggle == 1) {
      this.setState({ toggle: 2 });
    } else {
      this.setState({ toggle: 1 });
    }
  }

  render() {
    console.log(this.state.campaigns);
    return (
      <section className="left-section">
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

          {this.state.campaigns.length > 0 ? (
            <div className="row">
              {this.state.campaigns &&
                this.state.toggle == 1 &&
                this.state.campaigns.map((row, index) => {
                  return (
                    <div className={this.state.toggle == 1 ? 'col-md-6 pr-xl-4' : ''} key={index}>
                      <Link to="/current-campaign">
                        <h4>{row.Name}</h4>
                        <div className="cont">
                          <div className="bg-lightblue float-left">
                            {row.StartDate} - {row.EndDate}
                          </div>
                          <div className="bg-lightblue float-right">ACTIVE</div>
                          <div className="clearfix" />
                          <p className="created">
                            <span className="mr-3">Created</span> {row.Created} - {row.Author.name}
                          </p>
                          <p>
                            <span className="mr-2">Modified</span> April 24, 2017 - James Speaker
                          </p>
                          <img className="img-fluid" src="images/chart.png" alt="Chart" />
                          <p className="mt-4">
                            <span>Audience 001, Audience 002</span>
                            <span className="float-right">{row.Survey.Name}</span>
                          </p>
                          <p className="mb-0">{row.Description}</p>
                        </div>
                      </Link>
                    </div>
                  );
                })}
            </div>
          ) : (
            <div>There are no campaigns created.Click on the new campaign to get started </div>
          )}
        </div>
      </section>
    );
  }
}

CampaignsList.propTypes = {
  getCampaignsList: React.PropTypes.func.isRequired
};

export default connect(null, { getCampaignsList })(CampaignsList);
