import React, { Component } from 'react';
import { connect } from 'react-redux'; 
import { ProgressView } from './progress-view'

class CurrentSurveyPage extends Component {

  constructor(props) {
    super(props);
    console.log('PROPS=', props)
    this.state = {detail: null, editStatus: false, id: props.global.data.surveyId}
  }

  componentDidMount() {
    this.showProgressView();
    this.loadDataFromServer();
  }

  showProgressView = () => {
    this.progressView && this.progressView.show()
  }

  hideProgressView = () => {
      this.progressView && this.progressView.hide()
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
        },
      })
        .then((response) => response.json())
        .then((response) => {
          console.log('Response', response);
           this.setState({detail: response[0]})
        })
        .catch((error) => {
          console.error('survey api error: ', error);
        });
  }

  loadFile = (files, id) => {
		const f = files[0];
    var name = f.name; 
    var sound = document.getElementById(id);
	  var reader = new FileReader();
    reader.onload = function(e) {
      sound.src = this.result;
      sound.controls = true; 
      };
    reader.readAsDataURL(f);
  }
  
  render() {
    //return null

    const item = this.state.detail
    //const item = this.state.detail
    if(item==null) return <ProgressView ref={e => this.progressView = e} />
    let languageItems = [], questions = []
    var introItem, closingItem
    if(item.Language != null)
    { 
      for (let i = 0; i < item.Language.length; i++) {
        if (i == 0)
          languageItems.push(
            <button className="btn bg-lightblue btn-settings active" type="button" key={i}>
              <i className="fa fa-cog"></i><span>{item.Language[0]}</span>
            </button>
          )
        else
          languageItems.push(
            <button className="btn bg-lightblue btn-settings" type="button" key={i}>
              <i className="fa fa-cog"></i><span>{item.Language[i]}</span>
            </button>
          )
      }
    }
    for (let i = 0; item.Questions!=null &&i < item.Questions.length; i++) {
      const question = item.Questions[i]
      if(question.type == "intro")
      {
        introItem = question
        continue
      }
      if(question.type == "closing")
      {
        closingItem = question
        continue
      }
      let questionTag = []
      let options = [] 
      if(question.Input != null) { 
        for (let optNum = 0; optNum < question.Input.length; optNum++) {
          options.push(<option>{question.Input[optNum].input}</option>)
        }
        for (let j = 0; j < question.Input.length; j++) {
          const tag = question.Input[j]
          if (tag.enabled != false)
            questionTag.push(
              <li key={j}>
                <span className="text-lightblue">{tag.input}</span>
                <label className="switch">
                  <input type="checkbox" checked={true} onChange={() => this.props.dispatch({ type: 'TOGGLE_QUESTION', questionIndex: i, tagIndex: j })} />
                  <span className="slider-round"></span>
                </label>
                <span className="text-lightblue">Go to</span>
                
                <select value={tag.Next} style={{marginLeft: '5px',borderColor: 'transparent', color: 'white', backgroundColor: 'rgb(34,152,209)' }}   id="sel1"> 
                  {options}
                </select> 
              </li>
            )
          else {
            questionTag.push(
              <li key={j}>
                <span className="text-lightblue">{tag.input}</span>
                <label className="switch">
                  <input type="checkbox" checked={false} onChange={() => this.props.dispatch({ type: 'TOGGLE_QUESTION', questionIndex: i, tagIndex: j })} />
                  <span className="slider-round"></span>
                </label>
              </li>
            )
          } 
        }
      }
      questions.push(
        <div className="questions" key={i}>
          <h4>Question{i-1}</h4>
          <div className="cont">
            <div className="close-circle">
              <i className="fa fa-close"></i>
            </div>

            <div className="row">
              <div className="col-sm-6 col-md-7 pr-sm-0">
                <p className="bg-lightgray top-p text-lightblue mb-3">{question.description}</p>
                <h6 className="mb-1">AUDIO - DEFAULT</h6>
                <p className="audio-name mb-1">{this.extractFileName(question.Media[0].mediaLocation)}</p>
                <div className="row">
                <div className="col-sm-9">
                    <audio id={i} controls>
                      <source src={question.Media[0].mediaLocation} type="audio/wav" />
                      Your browser does not support the audio element.
                    </audio>
                </div>    
                 
                <div className="col-sm-1" onClick={() => document.getElementById("datafile"+i).click()}> 
                    <input
                      type="file"
                      id={"datafile"+i}
                      name="datafile"
                      className="datafile"
                      onChange={(e) => this.loadFile(e.target.files, i)}
                    />
                  <i className="fa fa-cog"  style={{ fontSize: 25,   marginTop: '8px', color: 'black' }}></i>
                </div>
              </div>  
                <h6 className="mt-4">TTS</h6>
                {question.TTS !=null && <p className="bg-lightgray p-tts">{question.TTS[0].script}</p>}
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
    console.log('CLOSE=',closingItem)
    console.log('INTRO=',introItem)
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
              { 
                !this.state.editStatus
                ?
                <button className="btn btn-save float-right" style={{backgroundColor: '#26a9d9'}}type="button" onClick={()=>this.setState({editStatus: true})}>
                  <i className="fa fa-cog"></i><span>&nbsp; EDIT</span>
                </button>
                :
                <button className="btn btn-save float-right" type="button" onClick={()=>this.setState({editStatus: false })}><span>SAVE</span></button>
              }
              </div>
            </div>
            <div className="clearfix"></div>
            <div className="cont">
              <a className="text-lightblue" href="#">VOICE</a>
              <p><span className="mr-2">Edited</span><span className="mr-2">{new Date(item.created).toISOString().slice(0, 10)}</span><span className="mr-3">{item.Author[0].name}</span><a className="show-history" href="#">Show History</a></p>
              <p className="bg-lightgray">{item.description}</p>
              {languageItems}
              <button className="btn bg-lightblue btn-settings" type="button">
                <i className="fa fa-plus-circle"></i><span>Add Language</span>
              </button>
            </div>
          </div>
          {introItem!=null && 
          <div className="row">
            <div className="col-sm-6">
              <div className="intro-outro">
                <h4>{introItem.description}</h4>
                {introItem.Media!=null && <div className="cont">
                  <h6 className="mb-1">AUDIO - DEFAULT</h6>
                  <p className="audio-name mb-1">{this.extractFileName(introItem.Media[0].mediaLocation)}</p>
                  <div className="row">
                    <div className="col-sm-9">
                        <audio id="intro" controls>
                          <source src={introItem.Media[0].mediaLocation} type="audio/wav" />
                          Your browser does not support the audio element.
                        </audio>
                    </div>     
                    <div className="col-sm-1" onClick={() => document.getElementById("datafile_intro").click()}>
                        <input
													type="file"
													id="datafile_intro"
													name="datafile"
													className="datafile"
													onChange={(e) => this.loadFile(e.target.files,'intro')}
												/>
                      <i className="fa fa-cog"  style={{ fontSize: 25,   marginTop: '8px', color: 'black' }}></i>
                    </div>
                  </div>  
                  <h6 className="mt-4">TTS</h6>
                  {introItem.TTS!=null && <p className="bg-lightgray p-tts">{introItem.TTS[0].script}</p>}
                </div>}
              </div>
            </div>
            <div className="col-sm-6">
              <div className="intro-outro">
                <h4>{closingItem.description}</h4>
                <div className="cont">
                  {closingItem.Media!=null && <h6 className="mb-1">AUDIO - DEFAULT</h6>}
                  {closingItem.Media!=null && <p className="audio-name mb-1">{this.extractFileName(closingItem.Media[0].mediaLocation)}</p>}
                  {closingItem.Media!=null && <div className="row">
                    <div className="col-sm-9">
                        <audio id="outro" controls>
                          <source src={closingItem.Media[0].mediaLocation} type="audio/wav" />
                          Your browser does not support the audio element.
                        </audio>
                    </div>     
                    <div className="col-sm-1" onClick={() => document.getElementById("datafile_outro").click()}> 
                        <input
													type="file"
													id="datafile_outro"
													name="datafile"
													className="datafile"
													onChange={(e) => this.loadFile(e.target.files,'outro')}
												/>
                      <i className="fa fa-cog"  style={{ fontSize: 25,   marginTop: '8px', color: 'black' }}></i>
                    </div>
                  </div>}
                  <h6 className="mt-4">TTS</h6>
                  {closingItem.TTS!=null && <p className="bg-lightgray p-tts">{closingItem.TTS[0].script}</p>}
                </div>
                
              </div>
            </div>
          </div>
          }

          {questions}
          <div className="btn-add-question pt-2">
            <button className="btn bg-lightblue btn-add-question mr-3" type="button">
              <span>ADD QUESTION</span>
            </button>
          </div>
          
        </div>
      </section>
    );
  }
}
function mapStateToProps(state) {
  const global = state.global
  return { global };
}
function mapDispatchToProps(dispatch) {
  return { dispatch };
}
export default connect(mapStateToProps, mapDispatchToProps)(
  CurrentSurveyPage
);
