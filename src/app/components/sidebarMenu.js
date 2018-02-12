import React from 'react';
import { Link } from 'react-router';
import { connect } from 'react-redux';

export class SidebarMenu extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      selected: 1
    };
  }
  setSelected(val) {
    this.setState({ selected: val });
  }

  render() {
    const { isAuthenticated } = this.props.auth;

    return (
      <div>
        {isAuthenticated && (
          <section className="sidebar">
            <a href="#">
              <h1 className="logo">
                <span>Agenta</span>
              </h1>
            </a>
            <ul className="list-unstyled">
              <li>
                <a href="#">VOICE OF THE CUSTOMER</a>
              </li>
              <li>
                <Link to="campaigns" onClick={this.setSelected.bind(this, 1)} className={this.state.selected == 1 ? 'active' : ''}>
                  CAMPAIGNS
                </Link>
              </li>
              <li>
                <Link to="surveys" onClick={this.setSelected.bind(this, 2)} className={this.state.selected == 2 ? 'active' : ''}>
                  SURVEYS
                </Link>
              </li>
              <li>
                <Link to="#" onClick={this.setSelected.bind(this, 3)} className={this.state.selected == 3 ? 'active' : ''}>
                  AUDIENCE
                </Link>
              </li>
              <li>
                <Link to="#" onClick={this.setSelected.bind(this, 4)} className={this.state.selected == 4 ? 'active' : ''}>
                  QUESTIONS
                </Link>
              </li>
              <li>
                <Link to="#" onClick={this.setSelected.bind(this, 5)} className={this.state.selected == 5 ? 'active' : ''}>
                  REPORTING
                </Link>
              </li>
              <li>
                <Link to="blacklist" onClick={this.setSelected.bind(this, 6)} className={this.state.selected == 6 ? 'active' : ''}>
                  DO NOT CALL LIST
                </Link>
              </li>
            </ul>
          </section>
        )}
      </div>
    );
  }
}

SidebarMenu.propTypes = {
  auth: React.PropTypes.object.isRequired
};

function mapStateToProps(state) {
  return {
    auth: state.auth
  };
}

export default connect(mapStateToProps, {})(SidebarMenu);
