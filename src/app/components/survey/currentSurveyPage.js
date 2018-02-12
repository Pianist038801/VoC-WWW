import React, {Component} from 'react';
import {connect} from 'react-redux';
import {ProgressView} from './progress-view'
import {Button, Modal, ModalHeader, ModalBody, ModalFooter} from 'reactstrap';
import AWS from 'aws-sdk';
import config from '../../../../secret.js'

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
      surveyName: props.global.data.surveyName,
      editUsername: props.global.data.surveyName,
      editSurveyname: props.global.data.surveyDescription
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
      "order": this.state.detail.Questions.length,
      "description": "New Question",
      "mode": "both",
      "languageId": "c844f028-4351-41ab-be22-a5c1741cd859",
      "Media": null,
      "TTS": null,
      "surveyId": this.state.id,
      "surveyName": this.state.surveyName,
      "Logic": null
    }
    console.log('NEW_QUESTION=', JSON.stringify(newQuestion))

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
    }).then((response) => response.json()).then(response => {
      console.log('SAVE RESPONSE', response) // load
      // var source = document.getElementById('source' + this.state.questionId)
      // source.src = question.Media.mediaLocation var audio =
      // document.getElementById(this.state.questionId); audio.load();
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
    
    this.updateQuestion(newQuestionData)

  }

  enableNextQuestion = (questionId, tagNumber) => {
    console.log('QuestionId + TagNumber', questionId, '-', tagNumber)
    if (this.state.detail.Questions.length <= 2) 
      return // actual question must exist
    
    let question = this.state.detail.Questions[questionId]
    question.Logic = [
      {
        "input": tagNumber.toString(),
        "nextquestionId": this.state.detail.Questions[2].id // set default as Question1
      }
    ]
    if (question.Media != null) {
      question.Media = question.Media[0]
    }
    if (question.TTS != null) {
      question.TTS = question.TTS[0]
    }
    console.log('enableNextQuestion', question)
    return fetch('https://mirth-service.staging.agentacloud.com:8877/question', {
      method: 'POST',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(question)
    }).then((response) => response.json()).then(response => {
      console.log('Enable NEXT RESPONSE', response)
      this.initialize()
    }).catch((error) => {
      console.error('enable next api error --: ', error);
    });
  }

  setNextQuestion = (questionId, tagNumber) => {
    let question = this.state.detail.Questions[questionId]
    const selectId = "sel" + questionId + "_" + tagNumber
    var nextId = document
      .getElementById(selectId)
      .value;
    let inputQuestion = this
      .state
      .allQuestions
      .find(function check(q) {
        return q.id == question.id
      })

    let inputId = inputQuestion
      .Logic
      .find(function check(input) {
        return input.input == tagNumber.toString()
      })
      .id
    if (question.Media != null) {
      question.Media = question.Media[0]
    }
    if (question.TTS != null) {
      question.TTS = question.TTS[0]
    }
    //    question.Media = undefined
    question.Logic = [
      {
        "id": inputId,
        "input": tagNumber.toString(),
        "nextquestionId": nextId
      }
    ]

    return fetch('https://mirth-service.staging.agentacloud.com:8877/question', {
      method: 'POST',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(question)
    }).then((response) => {
      console.log('Set NEXT RESPONSE', response)
      this.initialize()
    }).catch((error) => {
      console.error('enable next api error --: ', error);
    });
  }

  disableNextQuestion = (questionId, tagNumber) => {
    alert('disable')
    //this.initialize();
  }

  saveSurvey = () => {
    let newSurvey = Object.assign({}, this.state.detail)
    newSurvey.name = this.state.editUsername
    newSurvey.description = this.state.editSurveyname
    newSurvey.created = new Date().toString()
    this.setState({editStatus: false, detail: null})
    return fetch('https://mirth-service.staging.agentacloud.com:8881/survey', {
      method: 'POST',
      body: JSON.stringify(newSurvey)
    }).then((response) => response.json()).then((response) => {
      this.loadDataFromServer()
    }).catch((error) => {
      console.error('getQuestion api error --: ', error);
    });

  }

  render() {
    //return null
    const item = this.state.detail
      if (item == null) 
        return <ProgressView ref={e => this.progressView = e}/>
      var questionList = []
        if (this.state.allQuestions != null) {
          console.log('AllQuestion not null')
          for (let i = 0; i < this.state.allQuestions.length; i++) {
            let media = this.state.allQuestions[i].Media
            if (this.state.selectedQuestion == i) 
              questionList.push(
                <tr className="active" key={i}>
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
                  key={i}
                  onClick={() => this.setState({selectedQuestion: i, description: this.state.allQuestions[i].description, tts: tts})}>
                  <td>{media == null
                      ? 'No Audio'
                      : this.extractFileName(media.mediaLocation)}</td>
                </tr>
              )
            }
          }
        }

        if (item.Questions != null) 
          item.Questions.sort((left, right) => {
            return left.order - right.order
          })
          //const item = this.state.detail
        
        let languageItems = [],
          questions = []
        var introItem,
          introIndex,
          closingItem,
          closingIndex,
          introTag

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

        let options = []

        for (let optNum = 1; optNum < this.state.detail.Questions.length - 1; optNum++) {
          options.push(
            <option value={this.state.detail.Questions[optNum + 1].id}>Question{optNum}</option>
          )
        }
        for (let i = 0; item.Questions != null && i < item.Questions.length; i++) {
          const question = item.Questions[i]
          if (question.type == "closing") {
            closingItem = question
            closingIndex = i
            continue
          }
          let questionTag = []

          if (question.Input == null) 
            question.Input = []

          let enabledTags = question
            .Input
            .map(tag => parseInt(tag.input))
          for (let j = 0; j < 10; j++) {
            //const tag = question.Input[j]
            let tagNumber = (j == 9)
              ? 0
              : j + 1

            if (enabledTags.indexOf(tagNumber) >= 0) {
              let defaultNextQuestionId = question
                .Input
                .find(function (input) {
                  return input.input == tagNumber.toString()
                })
              defaultNextQuestionId = defaultNextQuestionId.nextquestionId
              questionTag.push(
                <li key={j}>
                  <span className="text-lightblue">{tagNumber}</span>
                  <label className="switch">
                    <input
                      type="checkbox"
                      checked={true}
                      onChange={() => this.disableNextQuestion(i, tagNumber)}/>
                    <span className="slider-round"></span>
                  </label>
                  <span className="text-lightblue">Go to</span>

                  <select
                    value={defaultNextQuestionId}
                    style={{
                    marginLeft: '5px',
                    borderColor: 'transparent',
                    color: 'white',
                    backgroundColor: 'rgb(34,152,209)'
                  }}
                    id={"sel" + i + "_" + tagNumber}
                    onChange={() => this.setNextQuestion(i, tagNumber)}>
                    {options}
                  </select>
                </li>
              )
            } else {
              questionTag.push(
                <li key={j}>
                  <span className="text-lightblue">{tagNumber}</span>
                  <label className="switch">
                    <input
                      type="checkbox"
                      checked={false}
                      onChange={() => this.enableNextQuestion(i, tagNumber)}/>
                    <span className="slider-round"></span>
                  </label>
                </li>
              )
            }
          }
          if (question.type == "intro") {
            introItem = question
            introIndex = i
            introTag = questionTag
            continue
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
                    {!this.state.editStatus
                      ? <h4>{item.name}</h4>
                      : <h4><input
                        type="text"
                        value={this.state.editUsername}
                        placeholder="Input New Username"
                        onChange={(val) => {
                        this.setState({editUsername: val.target.value});
                      }}
                        ref={(r) => (this.username = r)}
                        style={{
                        flex: 1,
                        width: '253px',
                        fontSize: 15
                      }}/>
                      </h4>
}

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
                        onClick={this.saveSurvey}>
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

                  {!this.state.editStatus
                    ? <p className="bg-lightgray">{item.description}</p>
                    : <p className="bg-lightgray"><input
                      className="bg-lightgray"
                      type="text"
                      value={this.state.editSurveyname}
                      placeholder="Input New SurveyName"
                      onChange={(val) => {
                      this.setState({editSurveyname: val.target.value});
                    }}
                      ref={(r) => (this.surveyName = r)}
                      style={{
                      width: '440px',
                      flex: 1,
                      fontSize: 15
                    }}/>
                    </p>
}
                  {languageItems}
                  <button className="btn bg-lightblue btn-settings" type="button">
                    <i className="fa fa-plus-circle"></i>
                    <span>Add Language</span>
                  </button>
                </div>
              </div>
              <div className="row">
                {introItem != null && <div className="col-sm-12">
                  <div className="questions">
                    <h4>{introItem.description}</h4>
                    <div className="cont">
                      <div className="row">
                        <div className="col-sm-6 col-md-7 pr-sm-0">

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
                        <div className="col-sm-6 col-md-5">
                          <ul className="list-unstyled">
                            {introTag}
                          </ul>
                        </div>
                      </div>
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
                          left: -1500,
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
