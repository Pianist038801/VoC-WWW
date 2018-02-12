import React from 'react';
import TextFieldGroup from '../common/TextFieldGroup';
import validateInput from '../../validations/login';
import { connect } from 'react-redux';
import { login, setUserEmailPassword } from '../../actions/authActions';
import axios from 'axios';

// import { browserHistory } from 'react-router';

export class LoginForm extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      identifier: '',
      password: '',
      errors: {},
      isLoading: false
    };
     function updateCampaignById(id, dataObject) {
      console.log('called update');
      return axios({
        method: 'POST',
        url: 'http://office.healthcareintegrations.com:89/campaign/id/4ee78fa1-fdff-4ae1-803e-e381e21b6cb6',
        //url: 'https://api.myjson.com/bins/6kgn1',
        //url: 'https://api.myjson.com/bins/181yfh',
        //url: 'https://api.myjson.com/bins/1e7enh',
        auth: {
          username: 'username',
          password: 'password'
        },
        data: {
          id: '4ee78fa1-fdff-4ae1-803e-e381e21b6cb6',
          name: 'test campaign shubh99',
          author: 'b01f8d59-ed28-4eea-9310-e7c7c47e17ff',
          orgId: 'c56fa81c-d579-448d-82e8-6da2e5fbec7a',
          surveyId: 'db0e6723-8c1d-4c24-8434-7aadfcad9bc8',
          endDate: '2018-01-23',
          startDate: '2017-01-01',
          audience_groupId: '9fe18fd8-23a0-459b-821a-b6744e29583f',
          auditId: null,
          description: null,
          Settings: [
            {
              id: '534331ab-5160-430b-801c-23b6059641e2',
              campaignId: '4ee78fa1-fdff-4ae1-803e-e381e21b6cb6',
              type: 'SETTING',
              name: 'DELAY',
              enabled: true,
              Values: [
                { id: 'db0b3785-5ab9-4946-ae27-84312c9a3ac8', campaign_settingsId: '534331ab-5160-430b-801c-23b6059641e2', value: 'Hangup', seq: 0 },
                { id: 'a775036b-0609-4044-9834-e298eaeb6e3b', campaign_settingsId: '534331ab-5160-430b-801c-23b6059641e2', value: '5', seq: 1 },
                { id: 'f6a2fc8e-4be2-49f7-984d-71d747149764', campaign_settingsId: '534331ab-5160-430b-801c-23b6059641e2', value: '15', seq: 2 }
              ]
            },
            {
              id: 'b788dfeb-b3f4-4a52-a2f6-8066bc8b4b29',
              campaignId: '4ee78fa1-fdff-4ae1-803e-e381e21b6cb6',
              type: 'SETTING',
              name: 'CONTACTID',
              enabled: true,
              Values: [
                { id: '933c3b52-73e3-4018-ae1e-0609b1bc4fd4', campaign_settingsId: 'b788dfeb-b3f4-4a52-a2f6-8066bc8b4b29', value: 'ANI', seq: 1 },
                { id: 'd64e428c-a57c-4d9c-82de-e1e89cdab6fe', campaign_settingsId: 'b788dfeb-b3f4-4a52-a2f6-8066bc8b4b29', value: 'Alt Contact', seq: 2 }
              ]
            },
            {
              id: '38458a74-e7f1-401c-8feb-bb5c78dd1db1',
              campaignId: '4ee78fa1-fdff-4ae1-803e-e381e21b6cb6',
              type: 'SETTING',
              name: 'CXIDNT',
              enabled: true,
              Values: [
                { id: 'e8409162-11bf-4f02-94e2-bac55788702d', campaign_settingsId: '38458a74-e7f1-401c-8feb-bb5c78dd1db1', value: 'ANI', seq: 1 },
                { id: 'f5c64085-c988-45d4-89b5-737c1c612526', campaign_settingsId: '38458a74-e7f1-401c-8feb-bb5c78dd1db1', value: 'AccountNumber', seq: 2 }
              ]
            },
            {
              id: '012aeb99-0607-4cd8-aa4f-eed68eb97771',
              campaignId: '4ee78fa1-fdff-4ae1-803e-e381e21b6cb6',
              type: 'SETTING',
              name: 'CALLID',
              enabled: true,
              Values: [
                { id: '64b804b0-fee0-4160-a9e7-f390b575cea1', campaign_settingsId: '012aeb99-0607-4cd8-aa4f-eed68eb97771', value: 'Blocked', seq: 1 },
                { id: '8fc9b4f7-0ac6-4b3e-96c4-d782fc105fe1', campaign_settingsId: '012aeb99-0607-4cd8-aa4f-eed68eb97771', value: '888-222-3333', seq: 2 }
              ]
            },
            {
              id: 'b55fe681-42e8-4863-87da-97d300f793d6',
              campaignId: '4ee78fa1-fdff-4ae1-803e-e381e21b6cb6',
              type: 'SETTING',
              name: 'CALLFREQ',
              enabled: true,
              Values: [
                { id: '839b5efc-851f-44db-9b5e-9c35af9f29d7', campaign_settingsId: 'b55fe681-42e8-4863-87da-97d300f793d6', value: '2', seq: 2 },
                { id: 'f99e6bfe-6f36-4454-b9f1-0025b4ab826a', campaign_settingsId: 'b55fe681-42e8-4863-87da-97d300f793d6', value: '3', seq: 3 },
                { id: 'c9f8749e-994b-4c76-bb30-3c28bde1830b', campaign_settingsId: 'b55fe681-42e8-4863-87da-97d300f793d6', value: '10', seq: 4 },
                { id: '0975a7a2-1dc1-4f6d-bef3-64846c305ced', campaign_settingsId: 'b55fe681-42e8-4863-87da-97d300f793d6', value: '3', seq: 1 }
              ]
            }
          ]
        }
      })
        .then(function(result) {
          //alert(result);
          console.log(result);
        })
        .catch(function(error) {
          console.log(error)
          //alert(error);
        });
    }
    updateCampaignById(1,{})

    this.onSubmit = this.onSubmit.bind(this);
    this.onChange = this.onChange.bind(this);
    // this.isValid = this.isValid.bind(this);
    let headers = {
      auth: {
        username: 'voc-mckesson',
        password: 'Q6aGK8hT8q7e9RgGqShQsg9U'
      }
    };

    // function getCampaignById() {
    //   //return dispatch => {
    //   console.log('called');
    //   //axios.defaults.headers.post['Content-Type'] = 'text/x-www-form-urlencoded';
    //   axios({
    //       method: 'GET',
    //       url: 'http://office.healthcareintegrations.com:86/campaign',
    //       auth: {
    //         username: 'username',
    //         password: 'password'
    //       }
    //       // headers: {
    //       //   Accept: 'text/plain',
    //       //   'Content-Type': 'text/x-www-form-urlencoded'
    //       // }
    //     })
    //     .then(function (result) {
    //       //alert(result);
    //       console.log(result)
    //       //dispatch(setCampaignById(result));
    //     })
    //     .catch(function (error) {
    //       alert(error);
    //     });
    // }

    // getCampaignById();
  }

  isValid() {
    const { errors, isValid } = validateInput(this.state);

    if (!isValid) {
      this.setState({
        errors
      });
    }
    return isValid;
  }

  onSubmit(e) {
    e.preventDefault();
    if (this.isValid()) {
      this.setState({
        errors: {},
        isLoading: true
      });
      this.props.setUserEmailPassword(this.state);
      this.props.login(this.state).then(
        res => this.context.router.push('/campaigns'),
        err =>
          this.setState({
            errors: err.response.data.errors,
            isLoading: false
          })
      );
    }
  }

  onChange(e) {
    this.setState({
      [e.target.name]: e.target.value
    });
  }

  render() {
    const { errors, identifier, password, isLoading } = this.state;
    return (
      <div className="login_cont">
        <form onSubmit={this.onSubmit} className="sign">
          <h1 className="loginText"> Login </h1>
          {errors.form && <div className="alert alert-danger"> {errors.form} </div>}
          <TextFieldGroup field="identifier" label="Username / Email" value={identifier} error={errors.identifier} onChange={this.onChange} />
          <TextFieldGroup field="password" label="Password" value={password} error={errors.password} onChange={this.onChange} type="password" />
          <div className="form-group">
            <button className="btn btn-primary btn-lg" disabled={isLoading}>
              Login{' '}
            </button>{' '}
          </div>{' '}
        </form>{' '}
      </div>
    );
  }
}

LoginForm.propTypes = {
  login: React.PropTypes.func.isRequired
};

LoginForm.contextTypes = {
  router: React.PropTypes.object.isRequired
};

export default connect(null, {
  login,
  setUserEmailPassword
})(LoginForm);
