import React, {Component} from 'react';
import {connect} from 'react-redux';
import {ProgressView} from './progress-view'
import {Button, Modal, ModalHeader, ModalBody, ModalFooter} from 'reactstrap';
import AWS from 'aws-sdk';
import config from '../../../../secret.js'
const _detail = {
  "id": "98a89d10-013e-4efe-ba03-22af25ce53b2",
  "name": "Daiki Monday Test",
  "description": "Monday Test",
  "type": "voice",
  "orgId": "c56fa81c-d579-448d-82e8-6da2e5fbec7a",
  "created": "2018-02-05T04:48:07.407564+00:00",
  "Author": [
    {
      "id": "c3068fbf-5d45-41b2-94ad-0f368ba363fb",
      "name": "McKesson Pilot User",
      "email": "no@no.com"
    }
  ],
  "Language": null,
  "Campaigns": null,
  "Questions": [
    {
      "id": "97910a5a-7d57-4d4e-87f2-ac0a18aad596",
      "type": "closing",
      "order": 0,
      "description": "Pilot Closing",
      "languageId": "c844f028-4351-41ab-be22-a5c1741cd859",
      "mode": "both",
      "Media": null,
      "TTS": null,
      "Input": null
    }, {
      "id": "97988167-07f5-44b9-8440-28659755a5ba",
      "type": "intro",
      "order": 0,
      "description": "Pilot Intro",
      "languageId": "c844f028-4351-41ab-be22-a5c1741cd859",
      "mode": "both",
      "Media": [
        {
          "id": "e74a61a1-a9c9-4ffd-9f8b-92fc00e84b9d",
          "mediaLocation": "https://s3-us-west-2.amazonaws.com/voc-media/surveys/VOC+Intro_Master.wav"
        }
      ],
      "TTS": null,
      "Input": [
        {
          "input": "1",
          "nextquestionId": "53b7b9d9-b7c6-43d8-8d67-9fbd743ecf34"
        }, {
          "input": "2",
          "nextquestionId": "53b7b9d9-b7c6-43d8-8d67-9fbd743ecf34"
        }, {
          "input": "3",
          "nextquestionId": "53b7b9d9-b7c6-43d8-8d67-9fbd743ecf34"
        }, {
          "input": "4",
          "nextquestionId": "53b7b9d9-b7c6-43d8-8d67-9fbd743ecf34"
        }, {
          "input": "5",
          "nextquestionId": "53b7b9d9-b7c6-43d8-8d67-9fbd743ecf34"
        }
      ]
    }
  ]
}

class CurrentSurveyPage extends Component {

  constructor(props) {
    super(props);
    console.log('PROPS=', props)
    this.state = {
      selectedQuestion: 0,
      allQuestions: null,
      description: '',
      tts: '',
      modal: false,
      playPreview: false,
      detail: null,
      editStatus: false,
      id: props.global.data.surveyId,
      surveyName: props.global.data.surveyName
    }
  }

  getQuestions = () => {
    return fetch(`https://mirth-service.staging.agentacloud.com:8878/question`, {
      method: 'GET',
      headers: {
        Authorization: 'Basic dm9jLW1ja2Vzc29uOlE2YUdLOGhUOHE3ZTlSZ0dxU2hRc2c5VQ==',
        'Content-Type': 'application/json'
      }
    }).then((response) => response.json()).then((response) => {
      console.log('Response', response);
      let tts = ''
      if (response[0].TTS != null) 
        tts = response[0].TTS.script
      this.setState({allQuestions: response, tts: tts, description: response[0].description})
    }).catch((error) => {
      console.error('getQuestion api error --: ', error);
    });
  }

  componentWillMount() {
    this.showProgressView();
    this.initialize();
  }

  initialize = () => {
    this.loadDataFromServer();
    this.getQuestions();
  }

  componentDidMount() {}
  showProgressView = () => {
    this.progressView && this
      .progressView
      .show()
  }

  hideProgressView = () => {
    this.progressView && this
      .progressView
      .hide()
  }

  extractFileName = (string) => {
    return string.substring(string.lastIndexOf('/') + 1)
  }

  loadDataFromServer = () => {
    console.log('STATE ID=', this.state.id)
    return fetch(`https://mirth-service.staging.agentacloud.com:8886/survey/id/${this.state.id}`, {
      method: 'GET',
      headers: {
        Authorization: 'Basic dm9jLW1ja2Vzc29uOlE2YUdLOGhUOHE3ZTlSZ0dxU2hRc2c5VQ==',
        'Content-Type': 'application/json'
      }
    }).then((response) => response.json()).then((response) => {
      console.log('DETAIL=', response[0])
      this.setState({detail: response[0]})
    }).catch((error) => {
      console.error('survey api error --: ', error);
    });
  }

  toggle = () => {
    this.setState({
      modal: !this.state.modal
    });
  }

  uploadToS3 = (file) => {
    let _this = this
    const config = {
      params: {
        Bucket: 'voc-media'
      },
      region: 'us-west-2',
      accessKeyId: 'AKIAI3BZQUBKCCBKRYSA',
      secretAccessKey: '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'
    }
    const key = 'surveys/testaudio/' + file.name
    //const buffer = new Buffer(file.data_uri, 'base64')
    var s3 = new AWS.S3(config);
    //
    s3.upload({
      Key: key,
      Body: file,
      ContentType: file.filetype,
      ACL: 'public-read'
    }, function (err, data) {
      if (err) {
        console.log('S3_Error=', err)
      } else {
        let newFileUrl = data.Location
        let newQuestionData = _this.state.currentQuestion
        newQuestionData.description = _this.state.description
        newQuestionData.TTS = {
          script: _this.state.tts
        }
        newQuestionData.Media = {
          mediaLocation: newFileUrl
        }
        console.log('Media=')
        console.log(JSON.stringify(newQuestionData))
        _this.updateQuestion(newQuestionData)

      }
    })
  }

  updateQuestion = (question) => {
    return fetch('https://mirth-service.staging.agentacloud.com:8877/question', {
      method: 'POST',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(question)
    }).then((response) => {
      console.log('SAVE RESPONSE', response)
      //load audio
      var source = document.getElementById('source' + this.state.questionId)
      source.src = question.Media.mediaLocation
      var audio = document.getElementById(this.state.questionId);
      audio.load();
      this.initialize()
    }).catch((error) => {
      console.error('survey api error --: ', error);
    });
  }

  addQuestion = () => {
    var newQuestion = {
      "type": "1",
      "order": 1,
      "description": "New Question",
      "mode": "both",
      "languageId": "c844f028-4351-41ab-be22-a5c1741cd859",
      "Media": null,
      "TTS": null,
      "surveyId": this.state.id,
      "surveyName": this.state.surveyName,
      "Input": [
        {
          "input": "1",
          "nextquestionId": "586cc7c8-41a1-4fee-96aa-d17a6b1173b3"
        }, {
          "input": "2",
          "nextquestionId": "586cc7c8-41a1-4fee-96aa-d17a6b1173b3"
        }, {
          "input": "3",
          "nextquestionId": "586cc7c8-41a1-4fee-96aa-d17a6b1173b3"
        }, {
          "input": "4",
          "nextquestionId": "586cc7c8-41a1-4fee-96aa-d17a6b1173b3"
        }, {
          "input": "5",
          "nextquestionId": "586cc7c8-41a1-4fee-96aa-d17a6b1173b3"
        }
      ]
    }
    console.log('NEW_QUESTION=', newQuestion)

    /* var currentSurvey = Object.assign({}, this.state.detail)
    if (currentSurvey.Questions == null)
      currentSurvey.Questions = [newQuestion]
    else
      currentSurvey
        .Questions
        .push(newQuestion)
    var _survey = {
      "id": "2604ccca-a9f7-4539-8466-7e4de3ea02e3",
      "name": "TTTTTTT",
      "description": "DDDDD_DESCRIPTION",
      "type": "voice",
      "orgId": "c56fa81c-d579-448d-82e8-6da2e5fbec7a",
      "created": "2018-02-05T04:35:25.188306+00:00",
      "Author": [
        {
          "id": "c3068fbf-5d45-41b2-94ad-0f368ba363fb",
          "name": "McKesson Pilot User",
          "email": "no@no.com"
        }
      ],
      "Language": null,
      "Campaigns": null,
      "Questions": null
    }
    console.log('newReq = ', JSON.stringify(currentSurvey))
    return fetch('https://mirth-service.staging.agentacloud.com:8881/survey', {
      method: 'POST',
      body: JSON.stringify(currentSurvey)
    }).then((response) => {
      console.log('DETAIL=', response)
      this.initialize()
    }).catch((error) => {
      console.error('Add Question to Survey api error --: ', error);
    });

    */

    return fetch('https://mirth-service.staging.agentacloud.com:8877/question', {
      method: 'POST', 
      body: JSON.stringify(newQuestion)
    }).then((response) => response.json()).then(response=>{
      console.log('SAVE RESPONSE', response) // load
      // var source = document.getElementById('source' + this.state.questionId)
      // source.src = question.Media.mediaLocation
      // var audio = document.getElementById(this.state.questionId);
      // audio.load();
      this.initialize()
    }).catch((error) => {
      console.error('survey api error --:', error);
    });
  }

  loadFile = (files, id) => {
    const file = files[0];
    //var name = f.name; var sound = document.getElementById(id); upload to S3
    var reader = new FileReader();
    let _this = this;
    reader.onload = function (e) {
      _this.setState({newFile: file})
      //_this.uploadToS3(file) sound.src = this.result; sound.controls = true;
    };
    reader.readAsDataURL(file);
  }

  saveNewFile = () => {
    this.setState({modal: false})
    this.uploadToS3(this.state.newFile)
  }

  useFile = () => {
    this.setState({modal: false})
    let newQuestionData = this.state.currentQuestion
    console.log('ID=', this.state.questionId, ' QuestionData=', this.state.currentQuestion)
    newQuestionData.description = this.state.description
    newQuestionData.TTS = {
      script: this.state.tts
    }
    if (this.state.allQuestions[this.state.selectedQuestion].Media == null) 
      newQuestionData.Media = null
    else 
      newQuestionData.Media = {
        mediaLocation: this.state.allQuestions[this.state.selectedQuestion].Media.mediaLocation
      }
    console.log('UpdateRequest=', JSON.stringify(newQuestionData))
    var _survey =  {
      "type": "1",
      "order": 1,
      "description": "New Question",
      "mode": "both",
      "languageId": "c844f028-4351-41ab-be22-a5c1741cd859",
      "Media": 
        {
          "mediaLocation": "https://voc-media.s3.us-west-2.amazonaws.com/surveys/testaudio/DaikiAudio.mp3"
        }
      ,
      "TTS": 
        {
          "script": "New TTS"
        }
      ,
      "surveyId": "2604ccca-a9f7-4539-8466-7e4de3ea02e3",
      "surveyName": "TESTING",
      "Input": [
        {
          "input": "1",
          "nextquestionId": "586cc7c8-41a1-4fee-96aa-d17a6b1173b3"
        }, {
          "input": "2",
          "nextquestionId": "586cc7c8-41a1-4fee-96aa-d17a6b1173b3"
        }, {
          "input": "3",
          "nextquestionId": "586cc7c8-41a1-4fee-96aa-d17a6b1173b3"
        }, {
          "input": "4",
          "nextquestionId": "586cc7c8-41a1-4fee-96aa-d17a6b1173b3"
        }, {
          "input": "5",
          "nextquestionId": "586cc7c8-41a1-4fee-96aa-d17a6b1173b3"
        }
      ]
    } 
    //this.updateQuestion(newQuestionData)
    this.updateQuestion(_survey)
  }

  render() {
    //return null
    var questionList = []
      if (this.state.allQuestions != null) {
        console.log('AllQuestion not null')
        for (let i = 0; i < this.state.allQuestions.length; i++) {
          let media = this.state.allQuestions[i].Media
          if (this.state.selectedQuestion == i) 
            questionList.push(
              <tr className="active">
                <td>{media == null
                    ? 'No Audio'
                    : this.extractFileName(media.mediaLocation)}</td>
              </tr>
            )
          else {
            let tts = ''
            if (this.state.allQuestions[i].TTS != null) 
              tts = this.state.allQuestions[i].TTS.script
            questionList.push(
              <tr
                onClick={() => this.setState({selectedQuestion: i, description: this.state.allQuestions[i].description, tts: tts})}>
                <td>{media == null
                    ? 'No Audio'
                    : this.extractFileName(media.mediaLocation)}</td>
              </tr>
            )
          }
        }
      }

      const item = this.state.detail
        //const item = this.state.detail
        if (item == null) 
          return <ProgressView ref={e => this.progressView = e}/>
        let languageItems = [],
          questions = []
        var introItem,
          introIndex,
          closingItem,
          closingIndex

        for (let i = 0; item.Language != null && i < item.Language.length; i++) {
          if (i == 0) 
            languageItems.push(
              <button className="btn bg-lightblue btn-settings active" type="button" key={i}>
                <i className="fa fa-cog"></i>
                <span>{item.Language[0]}</span>
              </button>
            )
          else 
            languageItems.push(
              <button className="btn bg-lightblue btn-settings" type="button" key={i}>
                <i className="fa fa-cog"></i>
                <span>{item.Language[i]}</span>
              </button>
            )
        }
        for (let i = 0; item.Questions != null && i < item.Questions.length; i++) {
          const question = item.Questions[i]
          if (question.type == "intro") {
            introItem = question
            introIndex = i
            continue
          }
          if (question.type == "closing") {
            closingItem = question
            closingIndex = i
            continue
          }
          let questionTag = []
          let options = []
          if (question.Input != null) {
            for (let optNum = 0; optNum < question.Input.length; optNum++) {
              options.push(
                <option>{question.Input[optNum].input}</option>
              )
            }
            for (let j = 0; j < question.Input.length; j++) {
              const tag = question.Input[j]
              if (tag.enabled != false) 
                questionTag.push(
                  <li key={j}>
                    <span className="text-lightblue">{tag.input}</span>
                    <label className="switch">
                      <input
                        type="checkbox"
                        checked={true}
                        onChange={() => this.props.dispatch({type: 'TOGGLE_QUESTION', questionIndex: i, tagIndex: j})}/>
                      <span className="slider-round"></span>
                    </label>
                    <span className="text-lightblue">Go to</span>

                    <select
                      value={tag.Next}
                      style={{
                      marginLeft: '5px',
                      borderColor: 'transparent',
                      color: 'white',
                      backgroundColor: 'rgb(34,152,209)'
                    }}
                      id="sel1">
                      {options}
                    </select>
                  </li>
                )
              else {
                questionTag.push(
                  <li key={j}>
                    <span className="text-lightblue">{tag.input}</span>
                    <label className="switch">
                      <input
                        type="checkbox"
                        checked={false}
                        onChange={() => this.props.dispatch({type: 'TOGGLE_QUESTION', questionIndex: i, tagIndex: j})}/>
                      <span className="slider-round"></span>
                    </label>
                  </li>
                )
              }
            }
          }
          questions.push(
            <div className="questions" key={i}>
              <h4>Question{i - 1}</h4>
              <div className="cont">
                <div className="close-circle">
                  <i className="fa fa-close"></i>
                </div>

                <div className="row">
                  <div className="col-sm-6 col-md-7 pr-sm-0">
                    <p className="bg-lightgray top-p text-lightblue mb-3">{question.description}</p>
                    <h6 className="mb-1">{question.Media == null
                        ? 'NO AUDIO'
                        : 'AUDIO - DEFAULT'}</h6>
                    <p className="audio-name mb-1">{question.Media == null
                        ? 'Press Setting Button to Add Audio'
                        : this.extractFileName(question.Media[0].mediaLocation)}</p>
                    <div className="row">
                      <div className="col-sm-9">
                        <audio id={i} controls>
                          <source
                            id={'source' + i}
                            src={question.Media == null
                            ? null
                            : question.Media[0].mediaLocation}
                            type="audio/wav"/>
                          Your browser does not support the audio element.
                        </audio>
                      </div>

                      <div
                        className="col-sm-1"
                        onClick={() => {
                        this.setState({modal: true, currentQuestion: question, questionId: i})
                      }}>
                        <i
                          className="fa fa-cog"
                          style={{
                          fontSize: 25,
                          marginTop: '8px',
                          color: 'black'
                        }}></i>
                      </div>
                    </div>
                    <h6 className="mt-4">TTS</h6>
                    {question.TTS != null && <p className="bg-lightgray p-tts">{question.TTS[0].script}</p>}
                  </div>
                  <div className="col-sm-6 col-md-5">
                    <ul className="list-unstyled">
                      {questionTag}
                    </ul>
                  </div>
                </div>
              </div>
            </div>
          )
        }
        console.log('CLOSE=', closingItem)
        console.log('INTRO=', introItem)
        return (
          <section className="left-section">
            <div className="navicon">
              <i className="fa fa-bars"></i>
            </div>
            <div className="wrapper survey">
              <div className="new-voice-survey">
                <div className="row">
                  <div className="col-8">
                    <h4>{item.name}</h4>
                  </div>
                  <div className="col-4">
                    {!this.state.editStatus
                      ? <button
                          className="btn btn-save float-right"
                          style={{
                          backgroundColor: '#26a9d9'
                        }}
                          onClick={() => this.setState({editStatus: true})}type="button" >
                          <i className="fa fa-cog"></i>
                          <span>&nbsp; EDIT</span>
                        </button>
                      : <button
                        className="btn btn-save float-right"
                        type="button"
                        onClick={() => this.setState({editStatus: false})}>
                        <span>SAVE</span>
                      </button>
}
                  </div>
                </div>
                <div className="clearfix"></div>
                <div className="cont">
                  <a className="text-lightblue" href="#">VOICE</a>
                  <p>
                    <span className="mr-2">Edited</span>
                    <span className="mr-2">{new Date(item.created)
                        .toISOString()
                        .slice(0, 10)}</span>
                    <span className="mr-3">{item.Author[0].name}</span>
                    <a className="show-history" href="#">Show History</a>
                  </p>
                  <p className="bg-lightgray">{item.description}</p>
                  {languageItems}
                  <button className="btn bg-lightblue btn-settings" type="button">
                    <i className="fa fa-plus-circle"></i>
                    <span>Add Language</span>
                  </button>
                </div>
              </div>
              <div className="row">
                {introItem != null && <div className="col-sm-6">
                  <div className="intro-outro">
                    <h4>{introItem.description}</h4>
                    <div className="cont">
                      <h6 className="mb-1">{introItem.Media == null
                          ? 'NO AUDIO'
                          : 'AUDIO - DEFAULT'}</h6>
                      <p className="audio-name mb-1">{introItem.Media == null
                          ? 'Press Setting Button to Add Audio'
                          : this.extractFileName(introItem.Media[0].mediaLocation)}</p>
                      <div className="row">
                        <div className="col-sm-9">
                          <audio id={introIndex} controls>
                            <source
                              id={'source' + introIndex}
                              src={introItem.Media == null
                              ? null
                              : introItem.Media[0].mediaLocation}
                              type="audio/wav"/>
                            Your browser does not support the audio element.
                          </audio>
                        </div>
                        <div
                          className="col-sm-1"
                          onClick={() => {
                          this.setState({modal: true, currentQuestion: introItem, questionId: introIndex})
                        }}>
                          <i
                            className="fa fa-cog"
                            style={{
                            fontSize: 25,
                            marginTop: '8px',
                            color: 'black'
                          }}></i>
                        </div>
                      </div>
                      <h6 className="mt-4">TTS</h6>
                      {introItem.TTS != null && <p className="bg-lightgray p-tts">{introItem.TTS[0].script}</p>}
                    </div>
                  </div>
                </div>}
                {closingItem != null && <div className="col-sm-6">
                  <div className="intro-outro">
                    <h4>{closingItem.description}</h4>
                    <div className="cont">
                      <h6 className="mb-1">{closingItem.Media == null
                          ? 'NO AUDIO'
                          : 'AUDIO - DEFAULT'}</h6>
                      {< p className = "audio-name mb-1" > {
                        closingItem.Media == null
                          ? 'Press Setting Button to Add Audio'
                          : this.extractFileName(closingItem.Media[0].mediaLocation)
                      } < /p>}
                      <div className="row">
                        <div className="col-sm-9">
                          <audio id={closingIndex} controls>
                            <source
                              id={'source' + closingIndex}
                              src={closingItem.Media == null
                              ? null
                              : closingItem.Media[0].mediaLocation}
                              type="audio/wav"/>
                            Your browser does not support the audio element.
                          </audio>
                        </div>
                        <div
                          className="col-sm-1"
                          onClick={() => {
                          this.setState({modal: true, currentQuestion: closingItem, questionId: closingIndex})
                        }}>
                          <i
                            className="fa fa-cog"
                            style={{
                            fontSize: 25,
                            marginTop: '8px',
                            color: 'black'
                          }}></i>
                        </div>
                      </div>
                      <h6 className="mt-4">TTS</h6>
                      {closingItem.TTS != null && <p className="bg-lightgray p-tts">{closingItem.TTS[0].script}</p>}
                    </div>
                  </div>
                </div>}
              </div>

              {questions}
              <div className="btn-add-question pt-2">
                <button
                  className="btn bg-lightblue btn-add-question mr-3"
                  type="button"
                  onClick={this.addQuestion}>
                  <span>ADD QUESTION</span>
                </button>
              </div>
              <Modal
                isOpen={this.state.modal}
                toggle={this.toggle}
                className="survey-file-browse w-100">
                <div className="cont m-0">
                  <div className="row mb-4">
                    <div className="col-sm-8">
                      <span className="fw-500">Browsing server</span>
                      <button
                        className="btn bg-lightblue btn-browse"
                        type="button"
                        onClick={() => document.getElementById("datafile_modal").click()}>
                        <span>Browse Computer</span>
                        <input
                          type="file"
                          id={"datafile_modal"}
                          name="datafile"
                          className="datafile"
                          onChange={(e) => this.loadFile(e.target.files, this.state.questionId)}/>
                      </button>
                    </div>
                    <div className="col-sm-4">
                      <div className="custom-select-option float-sm-right mt-3 mt-sm-1">
                        <select className="form-control">
                          <option selected>Select Language</option>
                          <option>English</option>
                          <option>Spanish</option>
                        </select>
                      </div>
                    </div>
                  </div>
                  <div className="row">
                    <div className="col-sm-4 col-md-3">
                      <div className="preview-file">
                        <audio
                          id='preview'
                          controls
                          style={{
                          position: 'absolute',
                          left: -500,
                          right: 0
                        }}>
                          <source id='previewSource'/>
                          Your browser does not support the audio element.
                        </audio>
                        {this.state.playPreview == true
                          ? <i
                              className="fa fa-stop-circle text-lightblue"
                              onClick={() => {
                              this.setState({playPreview: false});
                              document
                                .getElementById("preview")
                                .pause()
                            }}></i>
                          : <i
                            className="fa fa-play-circle text-lightblue"
                            onClick={() => {
                            if (this.state.allQuestions[this.state.selectedQuestion].Media == null) 
                              return this.setState({playPreview: true});
                            var source = document.getElementById('previewSource');
                            source.src = this.state.allQuestions[this.state.selectedQuestion].Media.mediaLocation;
                            var audio = document.getElementById("preview");
                            audio.load();
                            audio.play()
                          }}></i>
}
                        <span>Preview File</span>
                      </div>
                      <ul className="list-unstyled">
                        <li>Uploader: Jim Smith</li>
                        <li>Uploaded: 10/15/17</li>
                      </ul>
                      <div
                        style={{
                        height: 60,
                        overflowY: 'scroll'
                      }}>
                        <ul className="list-unstyled">
                          <li>{this.state.allQuestions != null && this.state.allQuestions[this.state.selectedQuestion].surveyName}</li>
                        </ul>
                      </div>
                      <ul className="list-unstyled">
                        <li
                          style={{
                          marginTop: '20px',
                          marginBottom: '5px'
                        }}><input
                          type="text"
                          value={this.state.description}
                          placeholder="Description"
                          onChange={(val) => {
            this.setState({description: val.target.value});
          }}
                          ref={(r) => (this.description = r)}
                          style={{
            width: '180px',
            fontSize: 15
          }}/>
                        </li>
                        <li
                          style={{
                          marginBottom: '5px'
                        }}><input
                          type="text"
                          value={this.state.tts}
                          placeholder="TTS"
                          onChange={(val) => {
            this.setState({tts: val.target.value});
          }}
                          ref={(r) => (this.tts = r)}
                          style={{
            width: '180px',
            fontSize: 15
          }}/>
                        </li>
                        <li
                          style={{
                          marginBottom: '5px'
                        }}>
                          <button
                            className="btn bg-lightblue btn-use-file"
                            type="button"
                            onClick={() => {
                            this.saveNewFile()
                          }}>
                            <span>SAVE</span>
                          </button>
                        </li>
                      </ul>
                    </div>
                    <div className="col-sm-8 col-md-9 pl-sm-4">
                      <div className="scroll-style ml-sm-2">
                        <table className="table border-0">
                          {questionList}
                        </table>
                      </div>
                    </div>
                  </div>
                  <button
                    className="btn bg-lightblue btn-use-file"
                    type="button"
                    onClick={() => {
                    this.useFile()
                  }}>
                    <span>USE FILE</span>
                  </button>
                  <button
                    className="btn btn-cancel"
                    type="button"
                    onClick={() => this.setState({modal: false})}
                    data-dismiss="modal">
                    <span>CANCEL</span>
                  </button>
                </div>
              </Modal>
            </div>
          </section>
        );
      }
    }

    function mapStateToProps(state) {
      const global = state.global
      return {global};
    }

    function mapDispatchToProps(dispatch) {
      return {dispatch};
    }

    export default connect(mapStateToProps, mapDispatchToProps)(CurrentSurveyPage);
