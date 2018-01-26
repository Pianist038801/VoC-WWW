import React, { Component } from 'react';
import { connect } from 'react-redux'; 

class CurrentSurveyPage extends Component {

  constructor(props) {
    super(props);
    this.state = {detail: null}
  }


  componentDidMount() {
    //this.loadDataFromServer();
  }

  loadDataFromServer = () => {  
      return fetch('http://eb783aa0.ngrok.io/survey/id/db0e6723-8c1d-4c24-8434-7aadfcad9bc8', {
        method: 'POST',
        headers: {
          Authorization: 'Basic dXNlcm5hbWU6cGFzc3dvcmQ=',
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ 
        })
      })
        .then((response) => response.json())
        .then((response) => {
          console.log('Response', response);
           this.setState({detail: response})
        })
        .catch((error) => {
          console.error('api error: ', error);
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
    const _this = this
    const item = this.props.global.detail
    //const item = this.state.detail
    if(item==null) return null
    let languageItems = [], questions = []

    for (let i = 0; i < item.Languages.length; i++) {
      if (i == 0)
        languageItems.push(
          <button className="btn bg-lightblue btn-settings active" type="button" key={i}>
            <i className="fa fa-cog"></i><span>{item.Languages[0]}</span>
          </button>
        )
      else
        languageItems.push(
          <button className="btn bg-lightblue btn-settings" type="button" key={i}>
            <i className="fa fa-cog"></i><span>{item.Languages[i]}</span>
          </button>
        )
    }

    for (let i = 0; i < item.Questions.length; i++) {
      const question = item.Questions[i]
      let questionTag = []
      let options = []
      for (let optNum = 0; optNum < question.Input.length; optNum++) {
        options.push(<option>{question.Input[optNum].Next}</option>)
      }
      for (let j = 0; j < question.Input.length; j++) {
        const tag = question.Input[j]
        if (tag.enabled != false)
          questionTag.push(
            <li key={j}>
              <span className="text-lightblue">{tag.Value}</span>
              <label className="switch">
                <input type="checkbox" checked={true} onChange={() => this.props.dispatch({ type: 'TOGGLE_QUESTION', questionIndex: i, tagIndex: j })} />
                <span className="slider-round"></span>
              </label>
              <span className="text-lightblue">Go to</span>
               
              <select value={tag.Next} style={{marginLeft: '5px',borderColor: 'transparent', color: 'white', backgroundColor: 'rgb(34,152,209)' }}class="form-control" id="sel1"> 
                {options}
              </select>
                 
            </li>
          )
        else {
          questionTag.push(
            <li key={j}>
              <span className="text-lightblue">{tag.Value}</span>
              <label className="switch">
                <input type="checkbox" checked={false} onChange={() => this.props.dispatch({ type: 'TOGGLE_QUESTION', questionIndex: i, tagIndex: j })} />
                <span className="slider-round"></span>
              </label>
            </li>
          )
        }

      }
      questions.push(
        <div className="questions" key={i}>
          <h4>{question.QuestionID}</h4>
          <div className="cont">
            <div className="close-circle">
              <i className="fa fa-close"></i>
            </div>

            <div className="row">
              <div className="col-sm-6 col-md-7 pr-sm-0">
                <p className="bg-lightgray top-p text-lightblue mb-3">{question.Description}</p>
                <h6 className="mb-1">AUDIO - DEFAULT</h6>
                <p className="audio-name mb-1">{question.Media.Path}</p>
                <div className="row">
                <div className="col-sm-9">
                    <audio id={i} controls>
                      <source src="offer_x.wav" type="audio/wav" />
                      Your browser does not support the audio element.
                    </audio>
                </div>    
                <div className="col-sm-1"> 
                    <i className="fa fa-volume-up" style={{ fontSize: 20, color: 'black' }}></i> 
                </div>
                <div className="col-sm-1" onClick={() => document.getElementById("datafile"+i).click()}> 
                    <input
                      type="file"
                      id={"datafile"+i}
                      name="datafile"
                      className="datafile"
                      onChange={(e) => this.loadFile(e.target.files, i)}
                    />
                  <i className="fa fa-cog"  style={{ fontSize: 20, color: 'black' }}></i>
                </div>
              </div>  
                <h6 className="mt-4">TTS</h6>
                <p className="bg-lightgray p-tts">{question.TextToSpeech.TTS}</p>
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

    return (
      <section className="left-section">
        <div className="navicon">
          <i className="fa fa-bars"></i>
        </div>
        <div className="wrapper survey">
          <div className="new-voice-survey">
            <div className="row">
              <div className="col-8">
                <h4>{item.Name}</h4>
              </div>
              <div className="col-4">
                <button className="btn btn-save float-right" type="button"><span>SAVE</span></button>
              </div>
            </div>
            <div className="clearfix"></div>
            <div className="cont">
              <a className="text-lightblue" href="#">VOICE</a>
              <p><span className="mr-2">Edited</span><span className="mr-2">{item.Modified}</span><span className="mr-3">{item.Author.Name}</span><a className="show-history" href="#">Show History</a></p>
              <p className="bg-lightgray">{item.Description}</p>
              {languageItems}
              <button className="btn bg-lightblue btn-settings" type="button">
                <i className="fa fa-plus-circle"></i><span>Add Language</span>
              </button>
            </div>
          </div>

          <div className="row">
            <div className="col-sm-6">
              <div className="intro-outro">
                <h4>Intro</h4>
                <div className="cont">
                  <h6 className="mb-1">AUDIO - DEFAULT</h6>
                  <p className="audio-name mb-1">{item.Intro.Media.Path}</p>
                  <div className="row">
                    <div className="col-sm-9">
                        <audio id="intro" controls>
                          <source src="offer_x.wav" type="audio/wav" />
                          Your browser does not support the audio element.
                        </audio>
                    </div>    
                    <div className="col-sm-1"> 
                        <i className="fa fa-volume-up" style={{ fontSize: 20, color: 'black' }}></i> 
                    </div>
                    <div className="col-sm-1" onClick={() => document.getElementById("datafile_intro").click()}> 
                        <input
													type="file"
													id="datafile_intro"
													name="datafile"
													className="datafile"
													onChange={(e) => this.loadFile(e.target.files,'intro')}
												/>
                      <i className="fa fa-cog"  style={{ fontSize: 20, color: 'black' }}></i>
                    </div>
                  </div>  
                  <h6 className="mt-4">TTS</h6>
                  <p className="bg-lightgray p-tts">{item.Intro.TextToSpeech.TTS}</p> 
                </div>
              </div>
            </div>
            <div className="col-sm-6">
              <div className="intro-outro">
                <h4>Outro</h4>
                <div className="cont">
                  <h6 className="mb-1">AUDIO - DEFAULT</h6>
                  <p className="audio-name mb-1">{item.Closing.Media.Path}</p>
                  <div className="row">
                    <div className="col-sm-9">
                        <audio id="outro" controls>
                          <source src="offer_x.wav" type="audio/wav" />
                          Your browser does not support the audio element.
                        </audio>
                    </div>    
                    <div className="col-sm-1"> 
                        <i className="fa fa-volume-up" style={{ fontSize: 20, color: 'black' }}></i> 
                    </div>
                    <div className="col-sm-1" onClick={() => document.getElementById("datafile_outro").click()}> 
                        <input
													type="file"
													id="datafile_outro"
													name="datafile"
													className="datafile"
													onChange={(e) => this.loadFile(e.target.files,'outro')}
												/>
                      <i className="fa fa-cog"  style={{ fontSize: 20, color: 'black' }}></i>
                    </div>
                  </div>  
                  <h6 className="mt-4">TTS</h6>
                  <p className="bg-lightgray p-tts">{item.Closing.TextToSpeech.TTS}</p> 
                </div>
              </div>
            </div>
          </div>

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
