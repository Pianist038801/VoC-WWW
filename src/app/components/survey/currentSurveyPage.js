import React, { Component } from 'react';
import { connect } from 'react-redux';

class CurrentSurveyPage extends Component {

  constructor(props) {
    super(props);
    this.state = {}
  }

  componentDidMount() {
  }

  render() {
    const item = this.props.global.detail
    let languageItems = [], questions = []

    for (let i = 0; i < item.Languages.length; i++) {
      if(i==0)
        languageItems.push(
          <button className="btn bg-lightblue btn-settings active" type="button" key={i}>
            <i className="fa fa-cog"></i><span>{item.Languages[0]}</span>
          </button>
        )
      else
      languageItems.push(
        <button className="btn bg-lightblue btn-settings" type="button"  key={i}>
          <i className="fa fa-cog"></i><span>{item.Languages[i]}</span>
        </button>
      )     
    }

    for (let i = 0; i < item.Questions.length; i++)
    {
      const question = item.Questions[i]
      let questionTag = []
      for (let j = 0; j < question.Input.length; j++)
      {
        const tag = question.Input[j]
        if (tag.enabled == true)
          questionTag.push(
            <li>
              <span className="text-lightblue">{tag.Value}</span>
              <label className="switch">
                <input type="checkbox" checked onChange={() => this.props.dispatch({ type: 'toggleQuestion', index: j })} />
                <span className="slider-round"></span>
              </label>
              <span className="text-lightblue">Go to</span>
              <button style={{ marginLeft: '5px' }} className="btn bg-lightblue btn-question" type="button">
                <span>{tag.Next}</span>
              </button>
            </li>
          )
        else {
          questionTag.push(
            <li>
              <span className="text-lightblue">{tag.Value}</span>
              <label className="switch">
                <input type="checkbox" onChange={() => this.props.dispatch({ type: 'toggleQuestion', index: j })} />
                <span className="slider-round"></span>
              </label>
            </li>  
          )
        }
      }  
      questions.push(
        <div className="questions">
          <h4>{question.QuestionID}</h4>
            <div className="cont active">
              <div className="close-circle">
                <i className="fa fa-close"></i>
              </div>

              <div className="row">
                <div className="col-sm-6 col-md-7 pr-sm-0">
                  <p className="bg-lightgray top-p text-lightblue mb-3">{question.Description}</p>
                  <h6 className="mb-1">AUDIO - DEFAULT</h6>
                  <p className="audio-name mb-1">{question.Media.Path}</p>
                  <audio controls>
                    <source src={question.Media.Path} type="audio/ogg" />
                    Your browser does not support the audio element.
                  </audio>
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
                  <audio controls>
                    <source src="assassin.wav" type="audio/wav" />
                    Your browser does not support the audio element.
                  </audio>
                  <h6 className="mt-4">TTS</h6>
                  <p className="bg-lightgray p-tts">{item.Intro.TextToSpeech.TTS}</p>
                  <audio controls>
                    <source src="./offer_x.wav" type="audio/ogg" />
                    Your browser does not support the audio element.
                  </audio>
                </div>
              </div>
            </div>
            <div className="col-sm-6">
              <div className="intro-outro">
                <h4>Outro</h4>
                <div className="cont">
                  <h6 className="mb-1">AUDIO - DEFAULT</h6>
                  <p className="audio-name mb-1">{item.Closing.Media.Path}</p>
                  <audio controls>
                    <source src="offer_x.wav" type="audio/wav" />
                    Your browser does not support the audio element.
                  </audio>
                  <h6 className="mt-4">TTS</h6>
                  <p className="bg-lightgray p-tts">{item.Closing.TextToSpeech.TTS}</p>
                  <audio controls>
                    <source src="..." type="audio/ogg" />
                    Your browser does not support the audio element.
                  </audio>
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
export default connect(mapStateToProps, {})(
  CurrentSurveyPage
);
