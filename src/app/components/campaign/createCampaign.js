import React, { Component } from 'react';
import { Link } from 'react-router';
import { connect } from 'react-redux';
import { getAudienceList, getsurveyDashboardList, getCampaignById, updateCampaignById, insertCampaign } from '../../actions/dashboardActions';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import moment from 'moment';
import Slider, { Range } from 'rc-slider';
import 'rc-slider/assets/index.css';
import { getCurrentUser } from '../../actions/authActions';
import { Modal, Button } from 'react-bootstrap';
import { error } from 'util';
import Loader from 'react-loader';
const style = { width: 3000, maposrgin: 1 };
const styleExtendedDates = { width: 2000, margin: 1 };
const numStyle = { width: 40 };
let insertObj = {
  name: 'test campaign shubh99',
  author: 'b01f8d59-ed28-4eea-9310-e7c7c47e17ff',
  orgId: 'c56fa81c-d579-448d-82e8-6da2e5fbec7a',
  surveyId: 'db0e6723-8c1d-4c24-8434-7aadfcad9bc8',
  endDate: '2018-01-23',
  startDate: '2017-01-01',
  audience_groupId: '9fe18fd8-23a0-459b-821a-b6744e29583f',
  auditId: null,
  description: 'default',
  created: '2017-01-01T13:35:59.422821-06:00',
  audience_groupName: 'RNA',
  surveyName: 'survey 1',
  Settings: [
    {
      type: 'SETTING',
      name: 'DELAY',
      enabled: true,
      Values: [{ value: 'Hangup', seq: 0 }, { value: '5', seq: 1 }, { value: '15', seq: 2 }]
    },
    {
      type: 'SETTING',
      name: 'CONTACTID',
      enabled: true,
      Values: [{ value: 'ANI', seq: 1 }, { value: 'Alt Contact', seq: 2 }]
    },
    {
      type: 'SETTING',
      name: 'CXIDNT',
      enabled: true,
      Values: [{ value: 'ANI', seq: 1 }, { value: 'AccountNumber', seq: 2 }]
    },
    {
      type: 'SETTING',
      name: 'CALLID',
      enabled: true,
      Values: [{ value: 'Blocked', seq: 1 }, { value: '888-222-3333', seq: 2 }]
    },
    {
      type: 'SETTING',
      name: 'CALLFREQ',
      enabled: true,
      Values: [{ value: '2', seq: 2 }, { value: '3', seq: 3 }, { value: '10', seq: 4 }, { value: '3', seq: 1 }]
    }
  ],
  Schedules: [
    {
      type: 'SCHED',
      day: 'Wednesday',
      startTime: '08:00:00',
      endTime: '18:00:00',
      enabled: true
    },
    {
      type: 'SCHED',
      day: 'Saturday',
      startTime: '08:00:00',
      endTime: '18:00:00',
      enabled: true
    },
    {
      type: 'EXCLUDE',
      day: '2018/12/25',
      startTime: null,
      endTime: null,
      enabled: true
    },
    {
      type: 'EXCLUDE',
      day: '2018/11/22',
      startTime: '11:00:00',
      endTime: '15:00:00',
      enabled: true
    },
    {
      type: 'SCHED',
      day: 'Tuesday',
      startTime: '08:00:00',
      endTime: '18:00:00',
      enabled: true
    },
    {
      type: 'SCHED',
      day: 'Thursday',
      startTime: '08:00:00',
      endTime: '23:59:00',
      enabled: true
    },
    {
      type: 'SCHED',
      day: 'Friday',
      startTime: '08:00:00',
      endTime: '20:00:00',
      enabled: true
    },
    {
      type: 'SCHED',
      day: 'Sunday',
      startTime: '00:00:00',
      endTime: '23:59:00',
      enabled: true
    },
    {
      type: 'SCHED',
      day: 'Monday',
      startTime: '00:00:00',
      endTime: '03:38:00',
      enabled: true
    }
  ],
  Notifications: [
    {
      Rules: [
        {
          questionId: '5d50f87b-53b8-49d9-b1f0-b5aca92c708d',
          Targets: [
            { target: 'no@test.com', notification_RuleId: '62c446ab-9f58-4165-8cac-336b5e74242f' },
            { target: 'no2@test.com', notification_RuleId: '62c446ab-9f58-4165-8cac-336b5e74242f' }
          ],
          Variables: [{ value: '3', notification_RuleId: '62c446ab-9f58-4165-8cac-336b5e74242f' }],
          Operators: [{ value: '<', notification_RuleId: '62c446ab-9f58-4165-8cac-336b5e74242f' }],
          Questions: null
        }
      ]
    },
    {
      Rules: [
        {
          questionId: 'dcc7c484-355f-4de8-9549-b80b4b88ae15',
          Targets: [{ target: 'who@no.com', notification_RuleId: '9f2a8806-a22d-47a5-9c41-48f7e4f0d6c1' }],
          Variables: [{ value: '2', notification_RuleId: '9f2a8806-a22d-47a5-9c41-48f7e4f0d6c1' }],
          Operators: [{ value: '<', notification_RuleId: '9f2a8806-a22d-47a5-9c41-48f7e4f0d6c1' }],
          Questions: null
        }
      ]
    },
    {
      Rules: [
        {
          notificationId: '852afb18-7759-4b96-aa5a-22855715a326',
          questionId: 'fd8b32ac-eaef-479c-931b-96dcc1b143e1',
          Targets: [{ target: 'yes@no.com', notification_RuleId: 'd07ed7fc-aa61-4538-8ccd-dbce2c626fcb' }],
          Variables: [{ value: '2', notification_RuleId: 'd07ed7fc-aa61-4538-8ccd-dbce2c626fcb' }],
          Operators: [{ value: '<', notification_RuleId: 'd07ed7fc-aa61-4538-8ccd-dbce2c626fcb' }],
          Questions: null
        }
      ]
    },
    {
      Rules: [
        {
          notificationId: 'e4db382c-ad45-4638-8a3b-a520c9321a5a',
          questionId: 'a5af50a7-b0a5-4c55-9d0b-ecba4f155d40',
          Targets: [{ target: 'jon.b@no.com', notification_RuleId: 'ee7dccfe-87cd-46c9-8987-b8aa237421c0' }],
          Variables: [{ value: '2', notification_RuleId: 'ee7dccfe-87cd-46c9-8987-b8aa237421c0' }],
          Operators: [{ value: '<', notification_RuleId: 'ee7dccfe-87cd-46c9-8987-b8aa237421c0' }],
          Questions: null
        }
      ]
    }
  ]
};
export class CreateCampaign extends Component {
  constructor(props) {
    super(props);
    console.log(this.props);
    //this.updateCampaignById = updateCampaignById();

    this.state = {
      audienceList: null,
      audienceKey: null,
      audienceGroupLength: null,
      selectedGroup: [],
      error: false,
      surveyDashboardList: null,
      surveySelected: null,
      surveySelectedIndex: -1,
      startDate: moment(),
      endDate: moment(),
      week: ['Su', 'Mo', 'Tu', 'We', 'Th', 'Fr', 'Sa'],
      excludeDatesCheckbox: true,
      excludeDatesStatusArray: [true, true],
      dynamicExcludedDates: [1, 2],
      dynamicNotifyEmail: [1, 2],
      wordAlertCheckbox: true,
      dynamicNotifyEmailThreshold: [1, 2],
      wordAlertCheckboxThreshold: true,
      threshold: 1,
      thresholdErr: false,
      surveyAcceptedCompleted: 1,
      surveyAcceptedIncomplete: 1,
      surveyRejected: 1,
      frequencyCalls: 1,
      mapFrequency: [],
      mapSurvey: [],
      mapAttempt: [],
      delayedCallBackCheckbox: true,
      dynamicAttempt: [1, 2],
      excludedDateList: [moment(new Date('10/23/2017')), moment(new Date('10/25/2017'))],
      excludedDateText: ['Thanksgiving', 'Christmas'],
      wordAlertText: '',
      notifySpecificWordEmailList: [],
      notifyThresholdWordEmailList: [],
      weekTimeList: [
        ['8:00AM', '7:00PM'],
        ['8:00AM', '7:00PM'],
        ['8:00AM', '7:00PM'],
        ['8:00AM', '7:00PM'],
        ['8:00AM', '7:00PM'],
        ['8:00AM', '7:00PM'],
        ['8:00AM', '7:00PM']
      ],
      weekTimeListJson: [
        ['08:00', '19:00'],
        ['08:00', '19:00'],
        ['08:00', '19:00'],
        ['08:00', '19:00'],
        ['08:00', '19:00'],
        ['08:00', '19:00'],
        ['08:00', '19:00']
      ],
      excludeDayTimeList: [['8:00AM', '7:00PM'], ['8:00AM', '7:00PM']],
      excludeDayTimeListJson: [['08:00', '19:00'], ['08:00', '19:00']],
      mapCallerId: ['Blocked', '222', '333'],
      mapCallbackNum: ['ANI', 'Alternate Number'],
      //mapCustomerIdentifier: ['Account Number', 'ANI'],
      callerId: 'Blocked',
      callbackNum: 'ANI',
      //customerIdentifier: 'Account Number',
      attemptList: [1, 1],
      lastAttempt: 'Voicemail',
      campaignName: '',
      campaignsummary: '',
      excludeDateErr: false,
      surveyErr: true,
      modalVisibility: false,
      shouldCampaignNameDisabled: false,
      hasLoaded: false
    };
    try {
      this.props
        .getAudienceList()
        .then(res => {
          //document.getElementById('aud0').appendChild = this.props.audienceList.Audience['Audience Group 1'][0]
          this.setState({
            audienceList: this.props.audienceList,
            audienceKey: Object.keys(this.props.audienceList.Audience),
            audienceGroupLength: Object.keys(this.props.audienceList.Audience).length
          });
          this.setState({
            selectedGroup: [this.props.audienceList.Audience['Audience Group 1'][0]]
          });
          let selectedGroup = this.state.selectedGroup;
          selectedGroup[0] = this.props.audienceList.Audience['Audience Group 1'][0];
          this.setState({ selectedGroup: selectedGroup });
        })
        .catch(function(e) {});
    } catch (e) {}
    try {
      this.props
        .getsurveyDashboardList()
        .then(res => {
          this.setState({ surveyDashboardList: this.props.surveyList });
        })
        .catch(function(e) {});
    } catch (e) {}
    if (this.props.location.query.id) {
      this.props.getCampaignById(this.props.location.query.id).then(res => {
        console.log('recieved 1');
        this.setState({ hasLoaded: true });
        this.setState({
          audienceList: this.props.audienceList,
          audienceKey: [this.props.campaignById.audience_groupName],
          audienceGroupLength: 1
        });
        let selectedGroup = this.state.selectedGroup;
        if (selectedGroup[0]) {
          selectedGroup[0] =
            this.props.campaignById.audience_groupName && this.props.audienceList.Audience[this.props.campaignById.audience_groupName][0]
              ? this.props.audienceList.Audience[this.props.campaignById.audience_groupName][0]
              : selectedGroup[0];
          this.setState({ selectedGroup: selectedGroup });
        }
        this.setState({ surveyName: this.props.campaignById.surveyName });
        this.setState({ campaignName: this.props.campaignById.name });
        this.setState({ campaignsummary: String(this.props.campaignById.description) });
        this.setState({ endDate: moment(this.props.campaignById.endDate) });
        this.setState({ startDate: moment(this.props.campaignById.startDate) });
        this.setState({ shouldCampaignNameDisabled: true });
        this.setState({ week: [] });
        this.setState({ excludeDatesStatusArray: [] });
        this.setState({ excludeDatesCheckbox: false });
        if (this.props.campaignById.Notifications&&this.props.campaignById.Notifications  != null &&
          this.props.campaignById.Notifications [0] &&
          this.props.campaignById.Notifications [0].Rules[0] &&
          this.props.campaignById.Notifications [0].Rules[0].Variables[0] &&
          this.props.campaignById.Notifications [0].Rules[0].Variables[0].value&&
          this.props.campaignById.Notifications [0].Rules[0].Targets &&
          this.props.campaignById.Notifications [0].Rules[0].Targets[1] &&
          this.props.campaignById.Notifications [0].Rules[0].Targets[0].target     
          
        ){
        if (this.props.campaignById.Notifications && this.props.campaignById.Notifications[0].Rules[0].Variables[0].value)
          this.setState({ threshold: this.props.campaignById.Notifications[0].Rules[0].Variables[0].value });
        if (this.props.campaignById.Notifications[0].Rules[0].Targets[0].target && this.props.campaignById.Notifications[0].Rules[0].Targets[1].target)
          this.setState({
            notifyThresholdWordEmailList: [
              this.props.campaignById.Notifications[0].Rules[0].Targets[0].target,
              this.props.campaignById.Notifications[0].Rules[0].Targets[1].target
            ]
          });
        }
        //this.setState({ weekTimeList: [] });
        //this.setState({ weekTimeListJson: [] });
        let week = [];
        let weekTimeList = this.state.weekTimeList;
        let weekTimeListJson = this.state.weekTimeListJson;
        let excludeDatesStatusArray = this.state.excludeDatesStatusArray;
        let excludeDayTimeListJson = this.state.excludeDayTimeListJson;
        let excludeDayTimeList = this.state.excludeDayTimeList;
        this.setState({ excludedDateList: [] });
        this.setState({ excludedDateText: [] });
        let excludedDateList = [];
        console.log('jh');
        console.log(this.props.campaignById);
        let count_exclude = 0;
        this.props.campaignById.Schedules &&
          this.props.campaignById.Schedules.map(function(val, index) {
            console.log(val);
            if (val.type == 'EXCLUDE') {
              this.setState({ excludeDatesCheckbox: true });
              if (val.enabled) {
                excludeDatesStatusArray.push(true);
                excludedDateList.push(moment(new Date(val.day)));

                this.setState({ excludeDatesStatusArray: excludeDatesStatusArray });
                this.setState({ excludedDateList: excludedDateList });
                this.setState({ excludedDateText: [] });
                if (val.startTime && val.endTime) {
                  excludeDayTimeListJson[count_exclude] = [
                    val.startTime.split(':')[0] + ':' + val.startTime.split(':')[1],
                    val.endTime.split(':')[0] + ':' + val.endTime.split(':')[1]
                  ];
                  excludeDayTimeList[count_exclude] = this._setSliderData(excludeDayTimeListJson[count_exclude]);
                  this.setState({ excludeDayTimeList: excludeDayTimeList });
                  this.setState({ excludeDayTimeListJson: excludeDayTimeListJson });
                }
                ++count_exclude;
              }
            }
            if (val.type == 'SCHED') {
              if (val.day == 'Sunday') {
                if (val.enabled) {
                  week[0] = 'Su';
                  weekTimeListJson[0] = [
                    val.startTime.split(':')[0] + ':' + val.startTime.split(':')[1],
                    val.endTime.split(':')[0] + ':' + val.endTime.split(':')[1]
                  ];
                  weekTimeList[0] = this._setSliderData(weekTimeListJson[0]);
                  this.setState({ week: week });
                  this.setState({ weekTimeList: weekTimeList });
                  this.setState({ weekTimeListJson: weekTimeListJson });
                }
              }
              if (val.day == 'Monday') {
                if (val.enabled) {
                  week[1] = 'Mo';
                  weekTimeListJson[1] = [
                    val.startTime.split(':')[0] + ':' + val.startTime.split(':')[1],
                    val.endTime.split(':')[0] + ':' + val.endTime.split(':')[1]
                  ];
                  weekTimeList[1] = this._setSliderData(weekTimeListJson[1]);
                  this.setState({ week: week });
                  this.setState({ weekTimeList: weekTimeList });
                  this.setState({ weekTimeListJson: weekTimeListJson });
                }
              }
              if (val.day == 'Tuesday') {
                if (val.enabled) {
                  week[2] = 'Tu';
                  weekTimeListJson[2] = [
                    val.startTime.split(':')[0] + ':' + val.startTime.split(':')[1],
                    val.endTime.split(':')[0] + ':' + val.endTime.split(':')[1]
                  ];
                  weekTimeList[2] = this._setSliderData(weekTimeListJson[2]);
                  this.setState({ week: week });
                  this.setState({ weekTimeList: weekTimeList });
                  this.setState({ weekTimeListJson: weekTimeListJson });
                }
              }
              if (val.day == 'Wednesday') {
                if (val.enabled) {
                  week[3] = 'We';
                  weekTimeListJson[3] = [
                    val.startTime.split(':')[0] + ':' + val.startTime.split(':')[1],
                    val.endTime.split(':')[0] + ':' + val.endTime.split(':')[1]
                  ];
                  weekTimeList[3] = this._setSliderData(weekTimeListJson[3]);
                  this.setState({ week: week });
                  this.setState({ weekTimeList: weekTimeList });
                  this.setState({ weekTimeListJson: weekTimeListJson });
                }
              }
              if (val.day == 'Thursday') {
                if (val.enabled) {
                  week[4] = 'Th';
                  weekTimeListJson[4] = [
                    val.startTime.split(':')[0] + ':' + val.startTime.split(':')[1],
                    val.endTime.split(':')[0] + ':' + val.endTime.split(':')[1]
                  ];
                  weekTimeList[4] = this._setSliderData(weekTimeListJson[4]);
                  this.setState({ week: week });
                  this.setState({ weekTimeList: weekTimeList });
                  this.setState({ weekTimeListJson: weekTimeListJson });
                }
              }
              if (val.day == 'Friday') {
                if (val.enabled) {
                  week[5] = 'Fr';
                  weekTimeListJson[5] = [
                    val.startTime.split(':')[0] + ':' + val.startTime.split(':')[1],
                    val.endTime.split(':')[0] + ':' + val.endTime.split(':')[1]
                  ];
                  weekTimeList[5] = this._setSliderData(weekTimeListJson[5]);
                  this.setState({ week: week });
                  this.setState({ weekTimeList: weekTimeList });
                  this.setState({ weekTimeListJson: weekTimeListJson });
                }
              }
              if (val.day == 'Saturday') {
                if (val.enabled) {
                  week[6] = 'Sa';
                  weekTimeListJson[6] = [
                    val.startTime.split(':')[0] + ':' + val.startTime.split(':')[1],
                    val.endTime.split(':')[0] + ':' + val.endTime.split(':')[1]
                  ];
                  weekTimeList[6] = this._setSliderData(weekTimeListJson[6]);
                  this.setState({ week: week });
                  this.setState({ weekTimeList: weekTimeList });
                  this.setState({ weekTimeListJson: weekTimeListJson });
                }
              }
            }
          }, this);

        this.props.campaignById.Settings &&
          this.props.campaignById.Settings.map(function(val, index) {
            if (val.name == 'DELAY') {
              this.setState({ delayedCallBackCheckbox: val.enabled });
              // let attempts = val.values.shift();
              // let arr = [];
              // val.values.map(function(val, index) {
              //   arr.push(val[index].values);
              // });
              console.log(val.Values[0].value);
              this.setState({ attemptList: [val.Values[1].value ? val.Values[1].value : 0, val.Values[2].value ? val.Values[2].value : 0] });
              this.setState({ lastAttempt: val.Values[0].value });
            }
            if (val.name == 'DELAY') {
              console.log(val.name);
              //this.setState({val.values[0].value });
            }
            if (val.name == 'CALLID') {
              console.log(val.name);
              this.setState({ callerId: val.Values[0].value });
              let callerId = [];
              val.Values &&
                val.Values.map(function(val) {
                  callerId.push(val.value);
                });
              this.setState({ mapCallerId: callerId });
            }
            if (val.name == 'CONTACTID') {
              console.log(val.name);
              let callBack = [];
              val.Values &&
                val.Values.map(function(val) {
                  callBack.push(val.value);
                });
              this.setState({ callbackNum: val.value });
              this.setState({ mapCallbackNum: callBack });
            }
            if (val.name == 'CALLFREQ') {
              console.log(val.name);
              let callFreq = [];
              val.Values &&
                val.Values.map(function(val) {
                  callFreq.push(val.value);
                });
              this.setState({ frequencyCalls: callFreq[0] });
              this.setState({ surveyAcceptedCompleted: callFreq[1] });
              this.setState({ surveyAcceptedIncomplete: callFreq[2] });
              this.setState({ surveyRejected: callFreq[3] });
            }
          }, this);
      });
    }
  }
  componentWillMount() {
    let mapFrequency = this.state.mapFrequency;
    let mapSurvey = this.state.mapSurvey;
    let mapAttempt = this.state.mapAttempt;
    for (let i = 1; i <= 180; i++) {
      if (i <= 60) {
        mapFrequency.push(i);
        mapSurvey.push(i);
        mapAttempt.push(i);
      } else if (i <= 100 && i > 60) {
        mapSurvey.push(i);
        mapFrequency.push(i);
      } else {
        mapSurvey.push(i);
      }
    }
    this.setState({ mapFrequency: mapFrequency });
    this.setState({ mapSurvey: mapSurvey });
    this.setState({ mapAttempt: mapAttempt });
  }
  handleStartDateChange(date) {
    if (date.diff(moment(), 'days') < 0) {
      this.setState({ startDate: moment() });
    } else {
      this.setState({ startDate: date });
    }
  }
  handleEndDateChange(date) {
    if (date.diff(this.state.startDate, 'days') < 0) {
      this.setState({ endDate: this.state.startDate });
    } else {
      this.setState({ endDate: date });
    }
  }
  _delExcludeDayTimeList(index, e) {
    let excludedDateList = this.state.excludedDateList;
    let excludedDateText = this.state.excludedDateText;
    let excludeDatesStatusArray = this.state.excludeDatesStatusArray;
    let dynamicExcludedDates = this.state.dynamicExcludedDates;
    excludedDateList.splice(index, 1);
    excludedDateText.splice(index, 1);
    excludeDatesStatusArray.splice(index, 1);
    dynamicExcludedDates.splice(index, 1);
    this.setState({
      excludedDateList: excludedDateList,
      excludedDateText: excludedDateText,
      excludeDatesStatusArray: excludeDatesStatusArray,
      dynamicExcludedDates: dynamicExcludedDates
    });
  }
  _handleSurveySelect(e) {
    let surveyDashboardList = this.state.surveyDashboardList.SurveyDashboard[Number(e.target.value)];
    this.setState({ surveySelected: surveyDashboardList });
    this.setState({ surveySelectedIndex: Number(e.target.value) });
    if (surveyDashboardList) {
      this.setState({ surveyErr: false });
    } else {
      this.setState({ surveyErr: true });
    }
  }
  _delAudienceKey(index, e) {
    let audienceList = this.state.audienceList;
    let audienceKey = this.state.audienceKey;
    //let audienceGroupLength: null,
    let selectedGroup = this.state.selectedGroup;
    audienceKey ? audienceKey.splice(index, 1) : '';
    //audienceList ? audienceList.splice(index, 1) : '';
    selectedGroup ? selectedGroup.splice(index, 1) : '';
    this.setState({
      audienceList: audienceList,
      audienceKey: audienceKey,
      selectedGroup: selectedGroup
    });
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
      if (selectedGroup[i] != '0') {
        this.setState({ error: false });
        flag = true;
        break;
      }
    }
    if (flag == false) {
      this.setState({ error: true });
    }
  }
  _addAudience() {
    this.state.audienceKey.push({});
    this.setState({ audienceKey: this.state.audienceKey });
  }
  _setWeek(val) {
    let week = this.state.week;
    if (week.indexOf(val) >= 0) {
      week.splice(week.indexOf(val), 1);
    } else {
      week.push(val);
    }
    this.setState({ week: week });
  }
  _setExcludeDateCheckbox() {
    debugger;
    let status = this.state.excludeDatesCheckbox;
    this.setState({ excludeDatesCheckbox: !status });
    let excludeDatesStatusArray = this.state.excludeDatesStatusArray;
    for (let i = 0; i < excludeDatesStatusArray.length; i++) {
      excludeDatesStatusArray[i] = false;
    }
    this.setState({ excludeDatesStatusArray: excludeDatesStatusArray });
    this._validateExcludedDates();
  }
  _setExcludeDatesStatusArray(val) {
    debugger;
    if (this.state.excludeDatesCheckbox == false) {
      return true;
    }
    let excludeDatesStatusArray = this.state.excludeDatesStatusArray;
    excludeDatesStatusArray[val] = !excludeDatesStatusArray[val];
    this.setState({ excludeDatesStatusArray: excludeDatesStatusArray });
    this._validateExcludedDates();
  }
  _createNewExcludeDay() {
    let excludeDatesStatusArray = this.state.excludeDatesStatusArray;
    excludeDatesStatusArray[excludeDatesStatusArray.length] = true;
    this.setState({ excludeDatesStatusArray: excludeDatesStatusArray });
    let orig = this.state.dynamicExcludedDates;
    orig.push(this.state.dynamicExcludedDates.length + 1);
    this.setState({ dynamicExcludedDates: orig });
    let excludedDateList = this.state.excludedDateList;
    excludedDateList.push(moment());
    this.setState({ excludedDateList: excludedDateList });
    let excludedDateText = this.state.excludedDateText;
    excludedDateText.push('');
    this.setState({ excludedDateText: excludedDateText });
    let excludeDayTimeList = this.state.excludeDayTimeList;
    let excludeDayTimeListJson = this.state.excludeDayTimeListJson;
    excludeDayTimeList[excludeDayTimeList.length] = ['8:00AM', '7:00PM'];
    excludeDayTimeListJson[excludeDayTimeListJson.length] = ['08:00', '19:00'];
    this.setState({ excludeDayTimeListJson: excludeDayTimeListJson });
    this.setState({ excludeDayTimeList: excludeDayTimeList });
    this._validateExcludedDates();
  }
  _validateSurveySelect() {
    if (this.state.surveySelected) {
      this.setState({ surveyErr: false });
      return false;
    } else {
      this.setState({ surveyErr: true });
      return true;
    }
  }
  _validateExcludedDates() {
    debugger;
    let excludedDateList = this.state.excludedDateList;
    let excludedDateText = this.state.excludedDateText;
    this.setState({ excludeDateErr: false });
    for (let i = 0; i < excludedDateList.length; i++) {
      if (excludedDateText[i] == '' && this.state.excludeDatesStatusArray[i] == true) {
        this.setState({ excludeDateErr: true });
        return true;
        break;
      }
    }
    return false;
  }
  _setSliderData(dateArray) {
    let value = [
      Number(Number(dateArray[0].split(':')[0]) + '.' + Math.ceil(Number(dateArray[0].split(':')[1]))) * 2,
      Number(Number(dateArray[1].split(':')[0]) + '.' + Math.ceil(Number(dateArray[1].split(':')[1]))) * 2
    ];
    console.log(value);
    let startTime = value[0] / 2;
    let endTime = value[1] / 2;
    let endTimeJson;
    let startTimeJson;
    if (startTime.toString().length >= 3) {
      let hours = Math.floor(startTime);
      let minutes = 30;
      let ampm = hours >= 12 ? 'PM' : 'AM';
      hours = hours % 12;
      hours = hours ? hours : 12; // the hour '0' should be '12'
      minutes = minutes < 10 ? '0' + minutes : minutes;
      startTimeJson =
        String(Math.floor(startTime)).length == 1 ? '0' + String(Math.floor(startTime)) + ':' + minutes : String(Math.floor(startTime)) + ':' + minutes;
      startTime = hours + ':' + minutes + ampm;
    } else {
      let hours = Math.floor(startTime);
      let minutes = 0;
      let ampm = hours >= 12 ? 'PM' : 'AM';
      hours = hours % 12;
      hours = hours ? hours : 12; // the hour '0' should be '12'
      minutes = minutes < 10 ? '0' + minutes : minutes;
      startTimeJson =
        String(Math.floor(startTime)).length == 1 ? '0' + String(Math.floor(startTime)) + ':' + minutes : String(Math.floor(startTime)) + ':' + minutes;
      startTime = hours + ':' + minutes + ampm;
    }
    if (endTime.toString().length >= 3) {
      let hours = Math.floor(endTime);
      let minutes = 30;
      let ampm = hours >= 12 ? 'PM' : 'AM';
      hours = hours % 12;
      hours = hours ? hours : 12; // the hour '0' should be '12'
      minutes = minutes < 10 ? '0' + minutes : minutes;
      endTimeJson = String(Math.floor(endTime)).length == 1 ? '0' + String(Math.floor(endTime)) + ':' + minutes : String(Math.floor(endTime)) + ':' + minutes;
      endTime = hours + ':' + minutes + ampm;
    } else {
      let hours = Math.floor(endTime);
      let minutes = 0;
      let ampm = hours >= 12 ? 'PM' : 'AM';
      hours = hours % 12;
      hours = hours ? hours : 12; // the hour '0' should be '12'
      minutes = minutes < 10 ? '0' + minutes : minutes;
      endTimeJson = String(Math.floor(endTime)).length == 1 ? '0' + String(Math.floor(endTime)) + ':' + minutes : String(Math.floor(endTime)) + ':' + minutes;
      endTime = hours + ':' + minutes + ampm;
    }
    return [startTime, endTime];
  }
  _logSlider(index, value) {
    let weekTimeList = this.state.weekTimeList;
    let weekTimeListJson = this.state.weekTimeListJson;
    let startTime = value[0] / 2;
    let endTime = value[1] / 2;
    let endTimeJson;
    let startTimeJson;
    if (startTime.toString().length >= 3) {
      let hours = Math.floor(startTime);
      let minutes = 30;
      let ampm = hours >= 12 ? 'PM' : 'AM';
      hours = hours % 12;
      hours = hours ? hours : 12; // the hour '0' should be '12'
      minutes = minutes < 10 ? '0' + minutes : minutes;
      startTimeJson =
        String(Math.floor(startTime)).length == 1 ? '0' + String(Math.floor(startTime)) + ':' + minutes : String(Math.floor(startTime)) + ':' + minutes;
      startTime = hours + ':' + minutes + ampm;
    } else {
      let hours = Math.floor(startTime);
      let minutes = 0;
      let ampm = hours >= 12 ? 'PM' : 'AM';
      hours = hours % 12;
      hours = hours ? hours : 12; // the hour '0' should be '12'
      minutes = minutes < 10 ? '0' + minutes : minutes;
      startTimeJson =
        String(Math.floor(startTime)).length == 1 ? '0' + String(Math.floor(startTime)) + ':' + minutes : String(Math.floor(startTime)) + ':' + minutes;
      startTime = hours + ':' + minutes + ampm;
    }
    if (endTime.toString().length >= 3) {
      let hours = Math.floor(endTime);
      let minutes = 30;
      let ampm = hours >= 12 ? 'PM' : 'AM';
      hours = hours % 12;
      hours = hours ? hours : 12; // the hour '0' should be '12'
      minutes = minutes < 10 ? '0' + minutes : minutes;
      endTimeJson = String(Math.floor(endTime)).length == 1 ? '0' + String(Math.floor(endTime)) + ':' + minutes : String(Math.floor(endTime)) + ':' + minutes;
      endTime = hours + ':' + minutes + ampm;
    } else {
      let hours = Math.floor(endTime);
      let minutes = 0;
      let ampm = hours >= 12 ? 'PM' : 'AM';
      hours = hours % 12;
      hours = hours ? hours : 12; // the hour '0' should be '12'
      minutes = minutes < 10 ? '0' + minutes : minutes;
      endTimeJson = String(Math.floor(endTime)).length == 1 ? '0' + String(Math.floor(endTime)) + ':' + minutes : String(Math.floor(endTime)) + ':' + minutes;
      endTime = hours + ':' + minutes + ampm;
    }
    weekTimeList[index] = [startTime, endTime];
    weekTimeListJson[index] = [startTimeJson, endTimeJson];
    //
    this.setState({ weekTimeListJson: weekTimeListJson });
    this.setState({ weekTimeList: weekTimeList });
  }
  _logSliderExcluded(index, value) {
    let excludeDayTimeList = this.state.excludeDayTimeList;
    let excludeDayTimeListJson = this.state.excludeDayTimeListJson;
    let startTime = value[0] / 2;
    let endTime = value[1] / 2;
    let endTimeJson;
    let startTimeJson;
    if (startTime.toString().length >= 3) {
      let hours = Math.floor(startTime);
      let minutes = 30;
      let ampm = hours >= 12 ? 'PM' : 'AM';
      hours = hours % 12;
      hours = hours ? hours : 12; // the hour '0' should be '12'
      minutes = minutes < 10 ? '0' + minutes : minutes;
      startTimeJson =
        String(Math.floor(startTime)).length == 1 ? '0' + String(Math.floor(startTime)) + ':' + minutes : String(Math.floor(startTime)) + ':' + minutes;
      startTime = hours + ':' + minutes + ampm;
    } else {
      let hours = Math.floor(startTime);
      let minutes = 0;
      let ampm = hours >= 12 ? 'PM' : 'AM';
      hours = hours % 12;
      hours = hours ? hours : 12; // the hour '0' should be '12'
      minutes = minutes < 10 ? '0' + minutes : minutes;
      startTimeJson =
        String(Math.floor(startTime)).length == 1 ? '0' + String(Math.floor(startTime)) + ':' + minutes : String(Math.floor(startTime)) + ':' + minutes;
      startTime = hours + ':' + minutes + ampm;
    }
    if (endTime.toString().length >= 3) {
      let hours = Math.floor(endTime);
      let minutes = 30;
      let ampm = hours >= 12 ? 'PM' : 'AM';
      hours = hours % 12;
      hours = hours ? hours : 12; // the hour '0' should be '12'
      minutes = minutes < 10 ? '0' + minutes : minutes;
      endTimeJson = String(Math.floor(endTime)).length == 1 ? '0' + String(Math.floor(endTime)) + ':' + minutes : String(Math.floor(endTime)) + ':' + minutes;
      endTime = hours + ':' + minutes + ampm;
    } else {
      let hours = Math.floor(endTime);
      let minutes = 0;
      let ampm = hours >= 12 ? 'PM' : 'AM';
      hours = hours % 12;
      hours = hours ? hours : 12; // the hour '0' should be '12'
      minutes = minutes < 10 ? '0' + minutes : minutes;
      endTimeJson = String(Math.floor(endTime)).length == 1 ? '0' + String(Math.floor(endTime)) + ':' + minutes : String(Math.floor(endTime)) + ':' + minutes;
      endTime = hours + ':' + minutes + ampm;
    }
    excludeDayTimeList[index] = [startTime, endTime];
    excludeDayTimeListJson[index] = [startTimeJson, endTimeJson];
    //
    this.setState({ excludeDayTimeListJson: excludeDayTimeListJson });
    this.setState({ excludeDayTimeList: excludeDayTimeList });
  }
  _setWordAlert() {
    let status = this.state.wordAlertCheckbox;
    this.setState({ wordAlertCheckbox: !status });
  }
  _createNotifyEmail() {
    let dynamicNotifyEmail = this.state.dynamicNotifyEmail;
    dynamicNotifyEmail.push(dynamicNotifyEmail.length + 1);
    this.setState({ dynamicNotifyEmail: dynamicNotifyEmail });
  }
  _createNotifyEmailThreshold() {
    let dynamicNotifyEmailThreshold = this.state.dynamicNotifyEmailThreshold;
    dynamicNotifyEmailThreshold.push(dynamicNotifyEmailThreshold.length + 1);
    this.setState({ dynamicNotifyEmailThreshold: dynamicNotifyEmailThreshold });
  }
  _setWordAlertThreshold() {
    let status = this.state.wordAlertCheckboxThreshold;
    this.setState({ wordAlertCheckboxThreshold: !status });
  }
  _removeNotifyEmail(index) {
    let dynamicNotifyEmail = this.state.dynamicNotifyEmail;
    dynamicNotifyEmail.splice(index, 1);
    this.setState({ dynamicNotifyEmail: dynamicNotifyEmail });
    let notifySpecificWordEmailList = this.state.notifySpecificWordEmailList;
    notifySpecificWordEmailList.splice(index, 1);
    this.setState({ notifySpecificWordEmailList: notifySpecificWordEmailList });
  }
  _removeNotifyEmailThreshold(index) {
    let dynamicNotifyEmailThreshold = this.state.dynamicNotifyEmailThreshold;
    dynamicNotifyEmailThreshold.splice(index, 1);
    this.setState({ dynamicNotifyEmailThreshold: dynamicNotifyEmailThreshold });
    let notifyThresholdWordEmailList = this.state.notifyThresholdWordEmailList;
    notifyThresholdWordEmailList.splice(index, 1);
    this.setState({
      notifyThresholdWordEmailList: notifyThresholdWordEmailList
    });
  }
  _setThresholdNumber(e) {
    if (String(e.target.value).length > 1) {
      this.setState({ threshold: '' });
      return true;
    }
    if (!Number(e.target.value)) {
      this.setState({ threshold: '' });
      return true;
    }
    if (Number(e.target.value) < 1 || Number(e.target.value) > 5) {
      return true;
    }
    this.setState({ threshold: e.target.value });
  }
  _setSurveyAcceptedCompleted(e) {
    if (e.target.value < 1 || e.target.value > 180) {
      return true;
    }
    this.setState({ surveyAcceptedCompleted: e.target.value });
  }
  _setSurveyAcceptedIncompleted(e) {
    if (e.target.value < 1 || e.target.value > 180) {
      return true;
    }
    this.setState({ surveyAcceptedIncomplete: e.target.value });
  }
  _setSurveyRejected(e) {
    if (e.target.value < 1 || e.target.value > 180) {
      return true;
    }
    this.setState({ surveyRejected: e.target.value });
  }
  _setFrequencyCalls(e) {
    if (e.target.value < 1 || e.target.value > 100) {
      return true;
    }
    this.setState({ frequencyCalls: e.target.value });
  }
  _setDelayedCallBackCheckbox() {
    let delayedCallBackCheckbox = !this.state.delayedCallBackCheckbox;
    this.setState({ delayedCallBackCheckbox: delayedCallBackCheckbox });
  }
  _setDynamicAttempt() {
    let dynamicAttempt = this.state.dynamicAttempt;
    dynamicAttempt.push(dynamicAttempt.length + 1);
    this.setState({ dynamicAttempt: dynamicAttempt });
  }
  _removeDynamicAttempt(index) {
    let dynamicAttempt = this.state.dynamicAttempt;
    dynamicAttempt.splice(index, 1);
    this.setState({ dynamicAttempt: dynamicAttempt });
    let attemptList = this.state.attemptList;
    attemptList.splice(index, 1);
    this.setState({ attemptList: attemptList });
  }
  _handleExcludedDateChange(index, date) {
    let excludedDateList = this.state.excludedDateList;
    excludedDateList[index] = date;
    this.setState({ excludedDateList: excludedDateList });
    this._validateExcludedDates();
  }
  _setExcludedDateText(index, e) {
    let excludedDateText = this.state.excludedDateText;
    excludedDateText[index] = e.target.value;
    this.setState({ excludedDateText: excludedDateText });
    this._validateExcludedDates();
  }
  _setWordAlertText(e) {
    //let wordAlertText = this.state.wordAlertText;
    let wordAlertText = e.target.value;
    this.setState({ wordAlertText: wordAlertText });
  }
  _setNotifySpecificWordEmailList(index, e) {
    let notifySpecificWordEmailList = this.state.notifySpecificWordEmailList;
    notifySpecificWordEmailList[index] = e.target.value;
    this.setState({ notifySpecificWordEmailList: notifySpecificWordEmailList });
  }
  _setNotifyThresholdWordEmailList(index, e) {
    let notifyThresholdWordEmailList = this.state.notifyThresholdWordEmailList;
    notifyThresholdWordEmailList[index] = e.target.value;
    this.setState({
      notifyThresholdWordEmailList: notifyThresholdWordEmailList
    });
  }
  _setCallerId(e) {
    this.setState({ callerId: e.target.value });
  }
  _setCallbackNum(e) {
    this.setState({ callbackNum: e.target.value });
  }
  // _setCustomerIdentifier(e) {
  //   this.setState({ customerIdentifier: e.target.value });
  // }
  _setAttemptList(index, e) {
    let attemptList = this.state.attemptList;
    attemptList[index] = e.target.value;
    this.setState({ attemptList: attemptList });
  }
  _setLastAttempt(e) {
    let lastAttempt = e.target.value;
    this.setState({ lastAttempt: lastAttempt });
  }
  _setCampaignName(e) {
    this.setState({ campaignName: e.target.value });
  }
  _setCampaignSummary(e) {
    this.setState({ campaignsummary: e.target.value });
  }
  _setJsonStruc() {
    let hasError = this._validateSurveySelect();
    if (hasError) {
      return true;
    }
    let excludeObj = {};
    debugger;
    for (let i = 0; i < this.state.excludeDatesStatusArray.length; i++) {
      if (this.state.excludeDatesStatusArray[i] && this.state.excludeDatesStatusArray[i] != '') {
        excludeObj[this.state.excludedDateText[i]] = [this.state.excludedDateList[i].format('MM/DD/YYYY')];
      }
    }
    let weekTimeListJson = this.state.weekTimeListJson;
    let obj = {
      Name: this.state.campaignName,
      Summary: this.state.campaignsummary,
      author: [this.props.user, 'email'],
      Created: moment().format('MM/DD/YYYY'),
      Modified: '',
      StartDate: this.state.startDate.format('MM/DD/YYYY'),
      EndDate: this.state.endDate.format('MM/DD/YYYY'),
      Description: 'This is meta-data stuff',
      Survey: {
        Name: this.state.surveySelected.Name,
        ID: this.state.surveySelected.SurveyID
      },
      Audience: this.state.selectedGroup,
      Schedule: {
        Sunday: {
          Enabled: this.state.week.indexOf('Su') >= 0 ? true : false,
          Start: weekTimeListJson[0][0],
          End: weekTimeListJson[0][1]
        },
        Monday: {
          Enabled: this.state.week.indexOf('Mo') >= 0 ? true : false,
          Start: weekTimeListJson[1][0],
          End: weekTimeListJson[1][1]
        },
        Tuesday: {
          Enabled: this.state.week.indexOf('Tu') >= 0 ? true : false,
          Start: weekTimeListJson[2][0],
          End: weekTimeListJson[2][1]
        },
        Wednesday: {
          Enabled: this.state.week.indexOf('We') >= 0 ? true : false,
          Start: weekTimeListJson[3][0],
          End: weekTimeListJson[3][1]
        },
        Thursday: {
          Enabled: this.state.week.indexOf('Th') >= 0 ? true : false,
          Start: weekTimeListJson[4][0],
          End: weekTimeListJson[4][1]
        },
        Friday: {
          Enabled: this.state.week.indexOf('Fr') >= 0 ? true : false,
          Start: weekTimeListJson[5][0],
          End: weekTimeListJson[5][1]
        },
        Saturday: {
          Enabled: this.state.week.indexOf('Sa') >= 0 ? true : false,
          Start: weekTimeListJson[6][0],
          End: weekTimeListJson[6][1]
        }
      },
      Exclude: excludeObj,
      Settings: {
        CallerID: this.state.callerId,
        ContactNumber: this.state.callbackNum,
        OfferFrequency: this.state.frequencyCalls,
        CustomerIdentifier: this.state.customerIdentifier
      },
      DelayedCallback: {
        Enabled: this.state.delayedCallBackCheckbox,
        Attempts: this.state.attemptList,
        Actions: this.state.lastAttempt
      }
    };
  }
  _setModalVisibility() {
    let status = this.state.modalVisibility;
    this.setState({ modalVisibility: !status });
  }
  _saveForm(str = 'U') {
    debugger;
    let status = this.state.modalVisibility;
    let obj;
    // if (this.state.error || this.state.surveyErr || this._validateAtleastOneExcludeDateChecked() || this.state.excludeDateErr || (this.state.wordAlertCheckbox && this._validateSpecificWord()) || (this.state.wordAlertCheckbox && this._validateSpecificWordEmail()) || this._validateLowScoreThresh() || (this.state.wordAlertCheckboxThreshold && this._validateLowScoreThreshEmail())) {
    //   this.setState({ modalMsg: 'Please Fix the Errors.Your Form has not been saved !' });
    // }
    // else {
    //this.setState({ modalMsg: 'Your Form has been Saved Successfully !' });
    //}
    //else
    //this.setState({ modalVisibility: !status });
    if (str == 'U') {
      obj = Object.assign({}, this.props.campaignById);
    } else {
      obj = insertObj;
    }
    //delete obj.id;
    obj.name = this.state.campaignName;
    obj.description = this.state.campaignsummary;
    obj.endDate = this.state.endDate.format('MM/DD/YYYY');
    obj.startDate = this.state.startDate.format('MM/DD/YYYY');
    // Notifications: [
    //   {

    //     Rules: [
    //       {

    //         notificationId: 'f6d1cb6c-5bb8-40f6-af84-3a19e86471d9',
    //         questionId: '5d50f87b-53b8-49d9-b1f0-b5aca92c708d',
    //         Targets: [
    //           { target: 'no@test.com', notification_RuleId: '62c446ab-9f58-4165-8cac-336b5e74242f' },
    //           { target: 'no2@test.com', notification_RuleId: '62c446ab-9f58-4165-8cac-336b5e74242f' }
    //         ],
    //         Variables: [{  value: '3', notification_RuleId: '62c446ab-9f58-4165-8cac-336b5e74242f' }],
    if (obj.Notifications&&obj.Notifications != null &&
      obj.Notifications[0] &&
      obj.Notifications[0].Rules[0] &&
      obj.Notifications[0].Rules[0].Variables&&
      obj.Notifications[0].Rules[0].Variables[0] &&
      obj.Notifications[0].Rules[0].Variables[0].value&&
      obj.Notifications[0].Rules[0].Targets &&
      obj.Notifications[0].Rules[0].Targets[1] &&
      obj.Notifications[0].Rules[0].Targets[0].target     
      
    ) {
      obj.Notifications[0].Rules[0].Variables[0].value = this.state.threshold;
      let emailThresh = this.state.notifyThresholdWordEmailList;
      obj.Notifications[0].Rules[0].Targets[0].target = emailThresh[0];
      obj.Notifications[0].Rules[0].Targets[1].target = emailThresh[1];
    } else {
      obj.Notifications = insertObj.Notifications;
      obj.Notifications[0].Rules[0].Variables[0].value = this.state.threshold;
      let emailThresh = this.state.notifyThresholdWordEmailList;
      obj.Notifications[0].Rules[0].Targets[0].target = emailThresh[0];
      obj.Notifications[0].Rules[0].Targets[1].target = emailThresh[1];
    }

    if (obj.Settings == null) {
      obj.Settings = insertObj.Settings;
    }
    if (obj.Settings)
      obj.Settings.map(function(val, index) {
        if (val.name == 'DELAY') {
          val.enabled = this.state.delayedCallBackCheckbox;
          if (val.Values) {
            val.Values[1].value = this.state.attemptList[0] ? this.state.attemptList[0] : 0;
            val.Values[2].value = this.state.attemptList[1] ? this.state.attemptList[1] : 0;
            val.Values[0].value = this.state.lastAttempt;
          }
        }

        if (val.name == 'CALLID') {
          console.log(val.name);
          val.Values[0].value = this.state.callerId;
        }
        if (val.name == 'CONTACTID') {
          val.value = this.state.callbackNum;
        }
        if (val.name == 'CALLFREQ') {
          let callFreq = [];
          if (val.Values) {
            val.Values[0].value = this.state.frequencyCalls;
            val.Values[1].value = this.state.surveyAcceptedCompleted;
            val.Values[2].value = this.state.surveyAcceptedIncomplete;
            val.Values[3].value = this.state.surveyRejected;
          }
        }
      }, this);
    let week = [];
    let weekTimeList = this.state.weekTimeList;
    let weekTimeListJson = this.state.weekTimeListJson;
    let count_exclude = 0;
    let excludeDateArr = [];
    let passthroughExclude = true;
    if (obj.Schedules == null) {
      obj.Schedules = insertObj.Settings;
    }
    obj.Schedules &&
      obj.Schedules.map(function(val, index) {
        if (val.day == 'Sunday') {
          val.enabled = this.state.week.indexOf('Su') >= 0 ? true : false;
          val.startTime = this.state.weekTimeListJson[0][0];
          val.endTime = this.state.weekTimeListJson[0][1];
        }
        if (val.day == 'Monday') {
          val.enabled = this.state.week.indexOf('Mo') >= 0 ? true : false;
          val.startTime = this.state.weekTimeListJson[1][0];
          val.endTime = this.state.weekTimeListJson[1][1];
        }
        if (val.day == 'Tuesday') {
          val.enabled = this.state.week.indexOf('Tu') >= 0 ? true : false;
          val.startTime = this.state.weekTimeListJson[2][0];
          val.endTime = this.state.weekTimeListJson[2][1];
        }
        if (val.day == 'Wednesday') {
          val.enabled = this.state.week.indexOf('We') >= 0 ? true : false;
          val.startTime = this.state.weekTimeListJson[3][0];
          val.endTime = this.state.weekTimeListJson[3][1];
        }
        if (val.day == 'Thursday') {
          val.enabled = this.state.week.indexOf('Th') >= 0 ? true : false;
          val.startTime = this.state.weekTimeListJson[4][0];
          val.endTime = this.state.weekTimeListJson[4][1];
        }
        if (val.day == 'Friday') {
          val.enabled = this.state.week.indexOf('Fr') >= 0 ? true : false;
          val.startTime = this.state.weekTimeListJson[5][0];
          val.endTime = this.state.weekTimeListJson[5][1];
        }
        if (val.day == 'Saturday') {
          val.enabled = this.state.week.indexOf('Sa') >= 0 ? true : false;
          val.startTime = this.state.weekTimeListJson[6][0];
          val.endTime = this.state.weekTimeListJson[6][1];
        }
        if (val.type == 'EXCLUDE' && passthroughExclude) {
          val.enabled = true;
          val.day = this.state.excludedDateList[count_exclude].format('MM/DD/YYYY');
          val.startTime = this.state.excludeDayTimeListJson[count_exclude][0];
          val.endTime = this.state.excludeDayTimeListJson[count_exclude][1];
          ++count_exclude;
          if (this.state.excludeDayTimeListJson.length > 2) {
            this.state.excludedDateList.map(function(val, index) {
              if (index > 1) {
                let tempObj = {};
                tempObj.campaignId = this.props.location.query.id;
                tempObj.type = 'EXCLUDE';
                tempObj.enabled = this.state.excludeDatesStatusArray[index];
                tempObj.day = this.state.excludedDateList[index].format('MM/DD/YYYY');
                tempObj.startTime = this.state.excludeDayTimeListJson[index][0];
                tempObj.endTime = this.state.excludeDayTimeListJson[index][1];
                excludeDateArr.push(tempObj);
              }
            }, this);
            passthroughExclude = false;
          }
        }
      }, this);
    excludeDateArr.map(function(val, index) {
      obj.Schedules.push(val);
    });

    //let id = this.props.location.query.id;
    //updateCampaignById(id, obj);
    this.setState({ modalVisibility: !status });
    this.setState({ modalMsg: 'Your Form is being saved . Please Wait!' });
    if (str == 'I') {
      delete obj.id;
      insertCampaign(obj)
        .then(
          function(res) {
            if (res.error == true) {
              this.setState({ modalMsg: 'Some Error Occured.Please contact Support!' });
            } else {
              this.setState({ modalMsg: 'Your Form has been Saved Successfully !' });
            }
          }.bind(this)
        )

        .catch(
          function(res) {
            if (res.error == true) {
              this.setState({ modalMsg: 'Some Error Occured.Please contact Support!' });
            } else {
              this.setState({ modalMsg: 'Your Form has been Saved Successfully !' });
            }
          }.bind(this)
        );
    } else {
      let id = this.props.location.query.id;
      obj.id = id;
      updateCampaignById(id, obj)
        .then(
          function(res) {
            if (res.error == true) {
              this.setState({ modalMsg: 'Some Error Occured.Please contact Support!' });
            } else {
              this.setState({ modalMsg: 'Your Form has been Saved Successfully !' });
            }
          }.bind(this)
        )

        .catch(
          function(res) {
            if (res.error == true) {
              this.setState({ modalMsg: 'Some Error Occured.Please contact Support!' });
            } else {
              this.setState({ modalMsg: 'Your Form has been Saved Successfully !' });
            }
          }.bind(this)
        );
    }

    //this.setState({ modalMsg: 'Your Form has been Saved Successfully !' });
  }
  _validateAtleastOneExcludeDateChecked() {
    if (this.state.excludeDatesCheckbox == false) {
      return false;
    }
    for (let i = 0; i < this.state.excludeDatesStatusArray.length; i++) {
      if (this.state.excludeDatesStatusArray[i] == true) {
        return false;
      }
    }
    return true;
  }
  _validateLowScoreThresh() {
    if (this.state.wordAlertCheckboxThreshold) {
      if (!Number(this.state.threshold)) {
        return true;
      }
    }
    return false;
  }
  _validateLowScoreThreshEmail() {
    if (this.state.wordAlertCheckboxThreshold == false) {
      return false;
    }
    let re = /\S+@\S+\.\S+/;
    if (this.state.wordAlertCheckboxThreshold) {
      for (let i = 0; i < this.state.notifyThresholdWordEmailList.length; i++) {
        if (re.test(this.state.notifyThresholdWordEmailList[i]) == true) return false;
      }
    }
    return true;
  }
  _validateSpecificWord() {
    if (this.state.wordAlertCheckbox) {
      if (this.state.wordAlertText.trim().length >= 1) {
        return false;
      }
    }
    return true;
  }
  _validateSpecificWordEmail() {
    if (this.state.wordAlertCheckbox == false) {
      return false;
    }
    let re = /\S+@\S+\.\S+/;
    if (this.state.wordAlertCheckbox) {
      for (let i = 0; i < this.state.notifySpecificWordEmailList.length; i++) {
        if (re.test(this.state.notifySpecificWordEmailList[i]) == true) return false;
      }
    }
    return true;
  }
  render() {
    return (
      <Loader loaded={this.props.location.query.id ? (this.state.hasLoaded ? true : false) : true}>
        <section className="left-section">
          {this.state.modalVisibility ? (
            <div className="static-modal">
              <Modal.Dialog>
                <Modal.Header>
                  <Modal.Title>Save Status</Modal.Title>
                </Modal.Header>

                <Modal.Body>{this.state.modalMsg}</Modal.Body>

                <Modal.Footer>
                  <Button bsStyle="primary" onClick={this._setModalVisibility.bind(this)}>
                    Ok
                  </Button>
                </Modal.Footer>
              </Modal.Dialog>
            </div>
          ) : (
            ''
          )}
          <div className="navicon">
            <i className="fa fa-bars" />
          </div>
          <div className="wrapper campaigns">
            <form>
              <h4>New Campaign</h4>
              <div className="cont new-campaign">
                <button
                  onClick={this._saveForm.bind(this, 'U')}
                  className="btn bg-lightblue btn-create-campaign"
                  type="button"
                  style={{ float: 'right', backgroundColor: '#56e82e', visibility: this.props.location.query.id ? 'visible' : 'hidden' }}>
                  <span>Save</span>
                </button>
                <div className="form-group campaign-name">
                  <label>CAMPAIGN NAME</label>
                  <textarea
                    type="text"
                    className="form-control"
                    placeholder="Enter Campaign Name"
                    value={this.state.campaignName}
                    onChange={this._setCampaignName.bind(this)}
                    disabled={this.state.shouldCampaignNameDisabled}
                  />
                  <small className="form-text text-danger text-hide">Text validation</small>
                </div>

                <div className="form-group">
                  <label>CAMPAIGN SUMMARY</label>
                  <textarea
                    type="text"
                    className="form-control"
                    placeholder="Enter Summary"
                    value={this.state.campaignsummary}
                    onChange={this._setCampaignSummary.bind(this)}
                  />
                  <small className="form-text text-danger text-hide">Text validation</small>
                </div>
              </div>

              <h4>Audience</h4>
              <div className="cont audience">
                {this.state.error ? <p>Please Select atleast one of the Option</p> : ''}

                {this.state.audienceList &&
                  this.state.audienceKey.map((keys, index) => (
                    <div className={'custom-select-option-aud mb-4'} key={index}>
                      <select
                        id={'aud' + index}
                        value={this.state.selectedGroup[index] ? this.state.selectedGroup[index] : ''}
                        className="form-control"
                        onChange={this._handleChangeSelect.bind(this, index)}>
                        <option key={'-1'} value="0" defaultValue>
                          Select audience
                        </option>
                        {this.state.audienceList.Audience[keys] &&
                          this.state.audienceList.Audience[keys].map(function(val, index) {
                            return (
                              <option key={index} value={val} defaultValue={keys == 'Audience Group 1' && index == 0 ? true : false}>
                                {val}
                              </option>
                            );
                          })}
                      </select>
                      &nbsp;&nbsp;
                      {index != 0 ? (
                        <span className="fa fa-trash-o fa-aud" aria-hidden="true" onClick={this._delAudienceKey.bind(this, index)} />
                      ) : (
                        <span className="fa fa-trash-o fa-aud" aria-hidden="true" style={{ visibility: 'hidden' }} />
                      )}
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
                {this.props.location.query.id && this.props.campaignById ? (
                  <div>
                    <div className="custom-select-option">
                      <input className="form-control" value={this.state.surveyName} />
                    </div>
                    <br />
                  </div>
                ) : (
                  <div>
                    {this.state.surveyErr ? <p>Please Select a Survey</p> : ''}
                    <div className="custom-select-option">
                      <select
                        className="form-control"
                        value={this.state.surveySelectedIndex != '-1' ? this.state.surveyDashboardList[this.state.surveySelectedIndex] : 'Select survey'}
                        onChange={this._handleSurveySelect.bind(this)}>
                        <option key={'-1'} value="-1">
                          Select survey
                        </option>
                        {this.state.surveyDashboardList &&
                          this.state.surveyDashboardList.SurveyDashboard.map(function(val, index) {
                            return (
                              <option key={index + 1} value={index}>
                                {val.Name}
                              </option>
                            );
                          })}
                      </select>
                    </div>
                    <br />
                  </div>
                )}
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
                    <div className="row">
                      <table>
                        <tbody>
                          <tr>
                            <td>
                              <DatePicker
                                className="form-control text-center start-date d-inline mr-4"
                                selected={this.state.startDate}
                                onChange={this.handleStartDateChange.bind(this)}
                              />
                            </td>
                            <td>
                              <DatePicker
                                className="form-control text-center end-date d-inline"
                                selected={this.state.endDate}
                                onChange={this.handleEndDateChange.bind(this)}
                              />
                            </td>
                          </tr>
                        </tbody>
                      </table>
                    </div>
                  </div>
                </div>
                <div className="schedule-elements">
                  <div className="d-flex mb-2">
                    <div className={this.state.week.indexOf('Su') < 0 ? 'day sr-1 mr-4' : 'day active sr-1 mr-4'} onClick={this._setWeek.bind(this, 'Su')}>
                      S
                    </div>
                    <div className="fw-500 start-time-1" />
                    <div className="fw-500 end-time-1" />
                    {this.state.weekTimeList[0][0]}
                    <div style={style}>
                      <Range
                        min={0}
                        max={48}
                        step={1}
                        defaultValue={[16, 38]}
                        value={[
                          Number(
                            Number(this.state.weekTimeListJson[0][0].split(':')[0]) + '.' + Math.ceil(Number(this.state.weekTimeListJson[0][0].split(':')[1]))
                          ) * 2,
                          Number(
                            Number(this.state.weekTimeListJson[0][1].split(':')[0]) + '.' + Math.ceil(Number(this.state.weekTimeListJson[0][1].split(':')[1]))
                          ) * 2
                        ]}
                        onChange={this._logSlider.bind(this, 0)}
                        disabled={this.state.week.indexOf('Su') < 0 ? true : false}
                      />
                    </div>
                    <span>{this.state.weekTimeList[0][1]}</span>
                  </div>
                  <div className="d-flex mb-2">
                    <div className={this.state.week.indexOf('Mo') < 0 ? 'day sr-2 mr-4' : 'day active sr-2 mr-4'} onClick={this._setWeek.bind(this, 'Mo')}>
                      M
                    </div>
                    <div className="fw-500 start-time-2" />
                    <div className="fw-500 end-time-2" />
                    {this.state.weekTimeList[1][0]}
                    <div style={style}>
                      <Range
                        min={0}
                        max={48}
                        step={1}
                        defaultValue={[16, 38]}
                        value={[
                          Number(
                            Number(this.state.weekTimeListJson[1][0].split(':')[0]) + '.' + Math.ceil(Number(this.state.weekTimeListJson[1][0].split(':')[1]))
                          ) * 2,
                          Number(
                            Number(this.state.weekTimeListJson[1][1].split(':')[0]) + '.' + Math.ceil(Number(this.state.weekTimeListJson[1][1].split(':')[1]))
                          ) * 2
                        ]}
                        onChange={this._logSlider.bind(this, 1)}
                        disabled={this.state.week.indexOf('Mo') < 0 ? true : false}
                      />
                    </div>
                    {this.state.weekTimeList[1][1]}
                  </div>
                  <div className="d-flex mb-2">
                    <div className={this.state.week.indexOf('Tu') < 0 ? 'day sr-3 mr-4' : 'day active sr-3 mr-4'} onClick={this._setWeek.bind(this, 'Tu')}>
                      T
                    </div>
                    <div className="fw-500 start-time-3" />
                    <div className="fw-500 end-time-3" />
                    {this.state.weekTimeList[2][0]}
                    <div style={style}>
                      <Range
                        min={0}
                        max={48}
                        step={1}
                        defaultValue={[16, 38]}
                        value={[
                          Number(
                            Number(this.state.weekTimeListJson[2][0].split(':')[0]) + '.' + Math.ceil(Number(this.state.weekTimeListJson[2][0].split(':')[1]))
                          ) * 2,
                          Number(
                            Number(this.state.weekTimeListJson[2][1].split(':')[0]) + '.' + Math.ceil(Number(this.state.weekTimeListJson[2][1].split(':')[1]))
                          ) * 2
                        ]}
                        onChange={this._logSlider.bind(this, 2)}
                        disabled={this.state.week.indexOf('Tu') < 0 ? true : false}
                      />
                    </div>
                    {this.state.weekTimeList[2][1]}
                  </div>
                  <div className="d-flex mb-2">
                    <div className={this.state.week.indexOf('We') < 0 ? 'day sr-4 mr-4' : 'day active sr-4 mr-4'} onClick={this._setWeek.bind(this, 'We')}>
                      W
                    </div>
                    <div className="fw-500 start-time-4" />
                    <div className="fw-500 end-time-4" />
                    {this.state.weekTimeList[3][0]}
                    <div style={style}>
                      <Range
                        min={0}
                        max={48}
                        step={1}
                        defaultValue={[16, 38]}
                        value={[
                          Number(
                            Number(this.state.weekTimeListJson[3][0].split(':')[0]) + '.' + Math.ceil(Number(this.state.weekTimeListJson[3][0].split(':')[1]))
                          ) * 2,
                          Number(
                            Number(this.state.weekTimeListJson[3][1].split(':')[0]) + '.' + Math.ceil(Number(this.state.weekTimeListJson[3][1].split(':')[1]))
                          ) * 2
                        ]}
                        onChange={this._logSlider.bind(this, 3)}
                        disabled={this.state.week.indexOf('We') < 0 ? true : false}
                      />
                    </div>
                    {this.state.weekTimeList[3][1]}
                  </div>
                  <div className="d-flex mb-2">
                    <div className={this.state.week.indexOf('Th') < 0 ? 'day sr-5 mr-4' : 'day active sr-5 mr-4'} onClick={this._setWeek.bind(this, 'Th')}>
                      T
                    </div>
                    <div className="fw-500 start-time-5" />
                    <div className="fw-500 end-time-5" />
                    {this.state.weekTimeList[4][0]}
                    <div style={style}>
                      <Range
                        min={0}
                        max={48}
                        step={1}
                        defaultValue={[16, 38]}
                        value={[
                          Number(
                            Number(this.state.weekTimeListJson[4][0].split(':')[0]) + '.' + Math.ceil(Number(this.state.weekTimeListJson[4][0].split(':')[1]))
                          ) * 2,
                          Number(
                            Number(this.state.weekTimeListJson[4][1].split(':')[0]) + '.' + Math.ceil(Number(this.state.weekTimeListJson[4][1].split(':')[1]))
                          ) * 2
                        ]}
                        onChange={this._logSlider.bind(this, 4)}
                        disabled={this.state.week.indexOf('Th') < 0 ? true : false}
                      />
                    </div>
                    {this.state.weekTimeList[4][1]}
                  </div>
                  <div className="d-flex mb-2">
                    <div className={this.state.week.indexOf('Fr') < 0 ? 'day sr-6 mr-4' : 'day active sr-6 mr-4'} onClick={this._setWeek.bind(this, 'Fr')}>
                      F
                    </div>
                    <div className="fw-500 start-time-6" />
                    <div className="fw-500 end-time-6" />
                    {this.state.weekTimeList[5][0]}
                    <div style={style}>
                      <Range
                        min={0}
                        max={48}
                        step={1}
                        defaultValue={[16, 38]}
                        value={[
                          Number(
                            Number(this.state.weekTimeListJson[5][0].split(':')[0]) + '.' + Math.ceil(Number(this.state.weekTimeListJson[5][0].split(':')[1]))
                          ) * 2,
                          Number(
                            Number(this.state.weekTimeListJson[5][1].split(':')[0]) + '.' + Math.ceil(Number(this.state.weekTimeListJson[5][1].split(':')[1]))
                          ) * 2
                        ]}
                        onChange={this._logSlider.bind(this, 5)}
                        disabled={this.state.week.indexOf('Fr') < 0 ? true : false}
                      />
                    </div>
                    {this.state.weekTimeList[5][1]}
                  </div>
                  <div className="d-flex">
                    <div className={this.state.week.indexOf('Sa') < 0 ? 'day sr-7 mr-4' : 'day active sr-7 mr-4'} onClick={this._setWeek.bind(this, 'Sa')}>
                      S
                    </div>
                    <div className="fw-500 start-time-7" />
                    <div className="fw-500 end-time-7" />
                    {this.state.weekTimeList[6][0]}
                    <div style={style}>
                      <Range
                        min={0}
                        max={48}
                        step={1}
                        defaultValue={[16, 38]}
                        value={[
                          Number(
                            Number(this.state.weekTimeListJson[6][0].split(':')[0]) + '.' + Math.ceil(Number(this.state.weekTimeListJson[6][0].split(':')[1]))
                          ) * 2,
                          Number(
                            Number(this.state.weekTimeListJson[6][1].split(':')[0]) + '.' + Math.ceil(Number(this.state.weekTimeListJson[6][1].split(':')[1]))
                          ) * 2
                        ]}
                        onChange={this._logSlider.bind(this, 6)}
                        disabled={this.state.week.indexOf('Sa') < 0 ? true : false}
                      />
                    </div>
                    {this.state.weekTimeList[6][1]}
                  </div>

                  <div className="custom-checkbox exclude-dates">
                    {this._validateAtleastOneExcludeDateChecked() ? <p>Please select atleast one Excluded Date</p> : ''}
                    <input type="checkbox" onClick={this._setExcludeDateCheckbox.bind(this)} checked={this.state.excludeDatesCheckbox ? true : false} />

                    <label htmlFor="checkbox01" onClick={this._setExcludeDateCheckbox.bind(this)}>
                      <span className="text-lightblue">Exclude Dates</span>
                    </label>
                  </div>
                  {this.state.excludeDateErr ? <span className="dashboard text-error">Please fill the empty fields</span> : ''}
                  {this.state.dynamicExcludedDates.map(function(val, index) {
                    return (
                      <div>
                        <div className="ml-5 pl-1">
                          <table>
                            <tbody>
                              <tr>
                                <td>
                                  <input
                                    disabled={!this.state.excludeDatesCheckbox || !this.state.excludeDatesStatusArray[index]}
                                    type="text"
                                    className="form-control form-lightblue d-inline fw-500 thanksgiving w-100 mr-2"
                                    value={this.state.excludedDateText[index]}
                                    onChange={this._setExcludedDateText.bind(this, index)}
                                  />
                                </td>
                                <td>
                                  <DatePicker
                                    disabled={!this.state.excludeDatesCheckbox || !this.state.excludeDatesStatusArray[index]}
                                    className="form-control form-lightblue d-inline thanksgiving-date text-center fw-500 w-100"
                                    selected={this.state.excludedDateList[index]}
                                    onChange={this._handleExcludedDateChange.bind(this, index)}
                                  />
                                </td>
                              </tr>
                            </tbody>
                          </table>
                        </div>
                        <div className="d-flex ml-3 mt-3 mb-2 pl-1">
                          <div className="custom-checkbox cs-1" onClick={this._setExcludeDatesStatusArray.bind(this, index)}>
                            <input type="checkbox" checked={this.state.excludeDatesStatusArray[index] ? true : false} />
                            <label htmlFor="cs-1">&nbsp;</label>
                          </div>
                          {this.state.excludeDayTimeList[index][0]}
                          <div style={styleExtendedDates}>
                            <Range
                              min={0}
                              max={48}
                              step={1}
                              defaultValue={[16, 38]}
                              value={[
                                Number(
                                  Number(this.state.excludeDayTimeListJson[index][0].split(':')[0]) +
                                    '.' +
                                    Math.ceil(Number(this.state.excludeDayTimeListJson[index][0].split(':')[1]))
                                ) * 2,
                                Number(
                                  Number(this.state.excludeDayTimeListJson[index][1].split(':')[0]) +
                                    '.' +
                                    Math.ceil(Number(this.state.excludeDayTimeListJson[index][1].split(':')[1]))
                                ) * 2
                              ]}
                              onChange={this._logSliderExcluded.bind(this, index)}
                              disabled={this.state.excludeDatesCheckbox && this.state.excludeDatesStatusArray[index] ? false : true}
                            />
                          </div>
                          {this.state.excludeDayTimeList[index][1]}
                          &nbsp;&nbsp;
                          {index == 0 ? '' : <span className="fa fa-trash-o" aria-hidden="true" onClick={this._delExcludeDayTimeList.bind(this, index)} />}
                          <div className="fw-500 start-time-8" />
                          <div className="slider-range slider-range-8 mx-3 mt-2" />
                          <div className="fw-500 end-time-8" />
                        </div>
                      </div>
                    );
                  }, this)}

                  <div className="ml-3">
                    &nbsp;<button
                      disabled={!this.state.excludeDatesCheckbox}
                      className="btn bg-lightblue btn-add"
                      type="button"
                      onClick={this._createNewExcludeDay.bind(this)}>
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
                      <select value={this.state.callerId} className="form-control" onChange={this._setCallerId.bind(this)}>
                        {this.state.mapCallerId.map(function(val, index) {
                          if (index == 0) {
                            return (
                              <option defaultValue key={index + 1} value={val}>
                                {val}
                              </option>
                            );
                          }
                          return (
                            <option key={index + 1} value={val}>
                              {val}
                            </option>
                          );
                        })}
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
                      <select value={this.state.callbackNum} className="form-control" onChange={this._setCallbackNum.bind(this)}>
                        {this.state.mapCallbackNum.map(function(val, index) {
                          if (index == 0) {
                            return (
                              <option defaultValue key={index + 1} value={val}>
                                {val}
                              </option>
                            );
                          }
                          return (
                            <option key={index + 1} value={val}>
                              {val}
                            </option>
                          );
                        })}
                      </select>
                    </div>
                  </div>
                </div>

                {/* <div className="row mb-4">
                <div className="col-6">
                  <div className="text-lightblue">Customer Identifier</div>
                </div>
                <div className="col-6 pl-1">
                  <div className="custom-select-option primary">
                    <select className="form-control" onChange={this._setCustomerIdentifier.bind(this)}>
                      {this.state.mapCustomerIdentifier.map(function(val, index) {
                        if (index == 0) {
                          return (
                            <option defaultValue key={index + 1} value={val}>
                              {val}
                            </option>
                          );
                        }
                        return (
                          <option key={index + 1} value={val}>
                            {val}
                          </option>
                        );
                      })}
                    </select>
                  </div>
                </div>
              </div> */}

                <div className="row mb-2">
                  <div className="col-5 col-sm-6">
                    <div className="text-lightblue">Frequency Per Customer</div>
                  </div>
                  <div className="col-7 col-sm-6 pl-1">
                    <span className="text-lightblue pl-5">Every</span>
                    <span className="custom-select-option w-50px primary every-call mx-1">
                      <select value={this.state.frequencyCalls} className="form-control" onChange={this._setFrequencyCalls.bind(this)}>
                        {this.state.mapFrequency.map(function(val, index) {
                          if (index == 0) {
                            return (
                              <option key={index + 1} value={val} defaultValue>
                                {val}
                              </option>
                            );
                          }
                          return (
                            <option key={index + 1} value={val}>
                              {val}
                            </option>
                          );
                        }, this)}
                      </select>
                    </span>
                    <span className="text-lightblue">call</span>
                  </div>
                </div>

                <div className="float-right mb-1">
                  <span className="text-lightblue">Survey Accepted &amp; Completed: Days</span>
                  <span className="custom-select-option w-50px primary mx-1">
                    <select value={this.state.surveyAcceptedCompleted} className="form-control" onChange={this._setSurveyAcceptedCompleted.bind(this)}>
                      {this.state.mapSurvey.map(function(val, index) {
                        if (index == 0) {
                          return (
                            <option key={index + 1} value={val} defaultValue>
                              {val}
                            </option>
                          );
                        }
                        return (
                          <option key={index + 1} value={val}>
                            {val}
                          </option>
                        );
                      }, this)}
                    </select>
                  </span>
                </div>

                <div className="float-right mb-1">
                  <span className="text-lightblue">Survey Accepted &amp; Completed: Days</span>
                  <span className="custom-select-option w-50px primary mx-1">
                    <select value={this.state.surveyAcceptedIncomplete} className="form-control" onChange={this._setSurveyAcceptedIncompleted.bind(this)}>
                      {this.state.mapSurvey.map(function(val, index) {
                        if (index == 0) {
                          return (
                            <option key={index} value={val} defaultValue>
                              {val}
                            </option>
                          );
                        }
                        return (
                          <option key={index} value={val}>
                            {val}
                          </option>
                        );
                      }, this)}
                    </select>
                  </span>
                </div>
                <div className="clearfix" />

                <div className="float-right mb-2">
                  <span className="text-lightblue pr-4 mr-5">Survey Rejected : Days</span>&nbsp;&nbsp;
                  <span className="custom-select-option w-50px primary mx-1">
                    <select value={this.state.surveyRejected} className="form-control" onChange={this._setSurveyRejected.bind(this)}>
                      {this.state.mapSurvey.map(function(val, index) {
                        if (index == 0) {
                          return (
                            <option key={index} value={val} defaultValue>
                              {val}
                            </option>
                          );
                        }
                        return (
                          <option key={index} value={val}>
                            {val}
                          </option>
                        );
                      }, this)}
                    </select>
                  </span>
                </div>
                <div className="clearfix" />

                <div className="row">
                  <div className="col-5 pr-0">
                    <div className="custom-checkbox">
                      <input type="checkbox" checked={this.state.delayedCallBackCheckbox} />
                      <label htmlFor="checkbox02" onClick={this._setDelayedCallBackCheckbox.bind(this)}>
                        <span className="text-lightblue">Delayed Callback</span>
                      </label>
                    </div>
                  </div>
                  <div className="col-7 py-1">
                    {this.state.dynamicAttempt.map(function(val, index) {
                      return (
                        <div className="mb-1">
                          <span className="fw-500 ml-1">Attempt {index + 1}:&nbsp;&nbsp;&nbsp;</span>&nbsp;&nbsp;
                          <span className="custom-select-option w-50px primary mx-1">
                            <select
                              value={this.state.attemptList[index]}
                              disabled={!this.state.delayedCallBackCheckbox}
                              className="form-control"
                              onChange={this._setAttemptList.bind(this, index)}>
                              {this.state.mapAttempt.map(function(val, ind) {
                                if (ind == 0) {
                                  return (
                                    <option key={ind} value={val} defaultValue>
                                      {val}
                                    </option>
                                  );
                                }
                                return (
                                  <option key={ind} value={val}>
                                    {val}
                                  </option>
                                );
                              }, this)}
                            </select>
                          </span>
                          <span className="fw-500">min</span>&nbsp;&nbsp;&nbsp;
                          {index != 0 ? (
                            this.state.delayedCallBackCheckbox ? (
                              <i className="fa fa-trash-o" onClick={this._removeDynamicAttempt.bind(this, index)} aria-hidden="true" />
                            ) : (
                              <i className="fa fa-trash-o" aria-hidden="true" />
                            )
                          ) : (
                            ''
                          )}
                        </div>
                      );
                    }, this)}
                    <div className="mb-1">
                      <span className="fw-500 ml-1 mr-2">Last Attempt</span>
                      <span className="custom-select-option primary">
                        <select
                          disabled={!this.state.delayedCallBackCheckbox}
                          className="form-control d-inline w-auto"
                          onChange={this._setLastAttempt.bind(this)}
                          value={this.state.lastAttempt}>
                          <option key={'0'} defaultValue value="Voicemail">
                            Voicemail
                          </option>
                          <option key={'1'} value="Hangup">
                            Hangup
                          </option>
                        </select>
                      </span>
                    </div>
                    <button
                      disabled={!this.state.delayedCallBackCheckbox}
                      className="btn bg-lightblue btn-add"
                      type="button"
                      onClick={this._setDynamicAttempt.bind(this)}>
                      <i className="fa fafa fa-plus" />
                    </button>
                  </div>
                </div>
              </div>

              <h4>Alerts</h4>
              <div className="cont alerts">
                <div className="wrapper">
                  {this.state.wordAlertCheckbox && this._validateSpecificWord() ? <p>Please enter atleast 1 word </p> : ''}
                  <div className="custom-checkbox">
                    <input type="checkbox" checked={this.state.wordAlertCheckbox} />
                    <label htmlFor="checkbox03" className="mb-1" onClick={this._setWordAlert.bind(this)}>
                      <span className="text-lightblue">Specific word alerts</span>
                    </label>
                  </div>
                  <textarea
                    className="form-control"
                    name=""
                    rows="6"
                    placeholder="Donec, commodo, nisi, eget, cursus, arcu, augue, integer, luctus, finibus, neque, mattis"
                    disabled={!this.state.wordAlertCheckbox}
                    onChange={this._setWordAlertText.bind(this)}
                  />

                  <br />
                  <br />
                  {this.state.wordAlertCheckbox && this._validateSpecificWordEmail() ? <p>Please enter atleast 1 valid email</p> : ''}

                  {this.state.dynamicNotifyEmail.map(function(val, index) {
                    if (index == 0) {
                      return (
                        <div className="ml-4 pl-2 mb-1">
                          <span className="text-lightblue fw-500 mr-2">Notify</span>&nbsp;
                          <input
                            disabled={!this.state.wordAlertCheckbox}
                            type="email"
                            className="form-control form-lightblue d-inline"
                            placeholder="john@gmail.com"
                            value={this.state.notifySpecificWordEmailList[index]}
                            onChange={this._setNotifySpecificWordEmailList.bind(this, index)}
                          />
                        </div>
                      );
                    } else {
                      return (
                        <div className="ml-5 pl-3 mb-1">
                          <span className="text-lightblue fw-500 mr-2">&nbsp;</span>
                          <input
                            disabled={!this.state.wordAlertCheckbox}
                            type="email"
                            className="form-control form-lightblue d-inline"
                            placeholder="john@gmail.com"
                            value={this.state.notifySpecificWordEmailList[index]}
                            onChange={this._setNotifySpecificWordEmailList.bind(this, index)}
                          />
                          {this.state.wordAlertCheckbox ? (
                            <span>
                              &nbsp;<i className="fa fa-trash-o" onClick={this._removeNotifyEmail.bind(this, index)} aria-hidden="true" />
                            </span>
                          ) : (
                            <span>
                              &nbsp;<i className="fa fa-trash-o" aria-hidden="true" />
                            </span>
                          )}
                        </div>
                      );
                    }
                  }, this)}

                  <div className="ml-5 pl-4">
                    &nbsp;<button
                      disabled={!this.state.wordAlertCheckbox}
                      className="btn bg-lightblue btn-add"
                      type="button"
                      onClick={this._createNotifyEmail.bind(this)}>
                      <i className="fa fa-plus" />
                    </button>
                  </div>
                  <br />
                  <br />
                  {this._validateLowScoreThresh() ? <p>Please enter threshold between 1 - 5</p> : ''}
                  <div className="custom-checkbox low-score-alert">
                    <input type="checkbox" id="checkbox04" checked={this.state.wordAlertCheckboxThreshold} />
                    <label htmlFor="checkbox04" className="mb-1" onClick={this._setWordAlertThreshold.bind(this)}>
                      <span className="text-lightblue">Low Score Alert Threshold</span>
                    </label>
                    &nbsp; &nbsp; &nbsp; &nbsp;
                    <input
                      disabled={!this.state.wordAlertCheckboxThreshold}
                      type="number"
                      className="form-control form-lightblue d-inline"
                      onChange={this._setThresholdNumber.bind(this)}
                      style={numStyle}
                      value={this.state.threshold}
                    />
                    &nbsp; &nbsp; &nbsp; &nbsp;
                  </div>
                  <br />

                  {this.state.wordAlertCheckboxThreshold && this._validateLowScoreThreshEmail() ? <p>Please enter atleast 1 valid email</p> : ''}

                  {this.state.dynamicNotifyEmailThreshold.map(function(val, index) {
                    if (index == 0) {
                      return (
                        <div className="ml-4 pl-2 mb-1">
                          <span className="text-lightblue fw-500 mr-2">Notify</span>&nbsp;
                          <input
                            disabled={!this.state.wordAlertCheckboxThreshold}
                            type="email"
                            className="form-control form-lightblue d-inline"
                            placeholder="john@gmail.com"
                            value={this.state.notifyThresholdWordEmailList[index]}
                            onChange={this._setNotifyThresholdWordEmailList.bind(this, index)}
                          />
                        </div>
                      );
                    } else {
                      return (
                        <div className="ml-5 pl-3 mb-1">
                          <span className="text-lightblue fw-500 mr-2">&nbsp;</span>
                          <input
                            disabled={!this.state.wordAlertCheckboxThreshold}
                            type="email"
                            className="form-control form-lightblue d-inline"
                            placeholder="john@gmail.com"
                            value={this.state.notifyThresholdWordEmailList[index]}
                            onChange={this._setNotifyThresholdWordEmailList.bind(this, index)}
                          />
                          {this.state.wordAlertCheckboxThreshold ? (
                            <span>
                              &nbsp;<i className="fa fa-trash-o" onClick={this._removeNotifyEmailThreshold.bind(this, index)} aria-hidden="true" />
                            </span>
                          ) : (
                            <span>
                              &nbsp;<i className="fa fa-trash-o" aria-hidden="true" />
                            </span>
                          )}
                        </div>
                      );
                    }
                  }, this)}

                  <div className="ml-5 pl-4">
                    &nbsp;<button
                      disabled={!this.state.wordAlertCheckboxThreshold}
                      className="btn bg-lightblue btn-add"
                      type="button"
                      onClick={this._createNotifyEmailThreshold.bind(this)}>
                      <i className="fa fa-plus" />
                    </button>
                  </div>
                </div>
                <button
                  onClick={this._saveForm.bind(this, 'U')}
                  disabled={this.props.location.query.id ? false : true}
                  className="btn bg-lightblue btn-create-campaign"
                  type="button"
                  style={{ float: 'right', backgroundColor: '#56e82e', visibility: this.props.location.query.id ? 'visible' : 'hidden' }}>
                  <span>Save</span>
                </button>
              </div>

              <button
                disabled={this.props.location.query.id ? true : false}
                //onClick={this._setJsonStruc.bind(this)}
                onClick={this._saveForm.bind(this, 'I')}
                className="btn bg-lightblue btn-create-campaign"
                type="button"
                style={{ visibility: this.props.location.query.id ? 'hidden' : 'visible' }}>
                <i className="fa fa-plus-circle" style={{ visibility: this.props.location.query.id ? 'hidden' : 'visible' }} />
                <span style={{ visibility: this.props.location.query.id ? 'hidden' : 'visible' }}>CREATE CAMPAIGN</span>
              </button>
            </form>
          </div>
        </section>
      </Loader>
    );
  }
}
CreateCampaign.contextTypes = {
  router: React.PropTypes.object.isRequired
};

function mapStateToProps(state) {
  return {
    audienceList: state.dashboardReducer.audienceList.data,
    user: state.auth.user.name,
    surveyList: state.dashboardReducer.surveyList.data,
    campaignById: state.dashboardReducer.campaignById.data
  };
}
export default connect(mapStateToProps, {
  getAudienceList,
  getsurveyDashboardList,
  getCurrentUser,
  getCampaignById
})(CreateCampaign);
