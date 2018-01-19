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
    return (
      <section className="left-section">
        <div className="navicon">
          <i className="fa fa-bars"></i>
        </div>
        <div className="wrapper survey">
          <div className="new-voice-survey">
            <div className="row">
              <div className="col-8">
                <h4>New Voice Survey</h4>
              </div>
              <div className="col-4">
                <button className="btn btn-save float-right" type="button"><span>SAVE</span></button>
              </div>
            </div>
            <div className="clearfix"></div>
            <div className="cont">
              <a className="text-lightblue" href="#">VOICE</a>
              <p><span className="mr-2">Edited</span><span className="mr-2">10/15/17</span><span className="mr-3">John H.</span><a className="show-history" href="#">Show History</a></p>
              <p className="bg-lightgray">In sed purus rhoncus, porta ex sit amet, interdum nisl. Phasellus vel suscipit  orci. Quisque in molestie metus. Interdum et malesuada fames ac ante ipsum  primis in faucibus. Ut finibus bibendum est, id porta tellus.</p>
              <button className="btn bg-lightblue btn-settings" type="button">
                <i className="fa fa-cog"></i><span>ENGLISH</span>
              </button>
              <button className="btn bg-lightblue btn-settings active" type="button">
                <i className="fa fa-cog"></i><span>SPANISH</span>
              </button>
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
                  <p className="audio-name mb-1">SSN_Welcom_Audio.wav</p>
                  <audio controls>
                    <source src="..." type="audio/ogg" />
                    Your browser does not support the audio element.
                  </audio>
                  <h6 className="mt-4">TTS</h6>
                  <p className="bg-lightgray p-tts">Thinking about the call you just completed,  how would you rate the overall quality of the  service provided by the representative?</p>
                  <audio controls>
                    <source src="..." type="audio/ogg" />
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
                  <p className="audio-name mb-1">SSN_Welcom_Audio.wav</p>
                  <audio controls>
                    <source src="..." type="audio/ogg" />
                    Your browser does not support the audio element.
                  </audio>
                  <h6 className="mt-4">TTS</h6>
                  <p className="bg-lightgray p-tts">Thinking about the call you just completed,  how would you rate the overall quality of the  service provided by the representative?</p>
                  <audio controls>
                    <source src="..." type="audio/ogg" />
                    Your browser does not support the audio element.
                  </audio>
                </div>
              </div>
            </div>
          </div>

          <div className="questions">
            <h4>Question 01</h4>
            <div className="cont active">
              <div className="close-circle">
                <i className="fa fa-close"></i>
              </div>

              <div className="row">
                <div className="col-sm-6 col-md-7 pr-sm-0">
                  <p className="bg-lightgray top-p text-lightblue mb-3">Rate the overall quality of the service provided by the representative?</p>
                  <h6 className="mb-1">AUDIO - DEFAULT</h6>
                  <p className="audio-name mb-1">SSN_Welcom_Audio.wav</p>
                  <audio controls>
                    <source src="..." type="audio/ogg" />
                    Your browser does not support the audio element.
                  </audio>
                  <h6 className="mt-4">TTS</h6>
                  <p className="bg-lightgray p-tts">Thinking about the call you just completed,  how would you rate the overall quality of the  service provided by the representative?</p>
                  <audio controls>
                    <source src="..." type="audio/ogg" />
                    Your browser does not support the audio element.
                  </audio>
               </div>
                <div className="col-sm-6 col-md-5">
                  <ul className="list-unstyled">
                    <li>
                      <span className="text-lightblue">1</span>
                      <label className="switch">
                        <input type="checkbox" checked />
                        <span className="slider-round"></span>
                      </label>
                      <span className="text-lightblue">Go to</span>
                      <button className="btn bg-lightblue btn-question" type="button">
                        <span>Question 02</span>
                      </button>
                    </li>
                    <li>
                      <span className="text-lightblue">2</span>
                      <label className="switch">
                        <input type="checkbox" checked />
                        <span className="slider-round"></span>
                      </label>
                      <span className="text-lightblue">Go to</span>
                      <button className="btn bg-lightblue btn-question" type="button">
                        <span>Question 02</span>
                      </button>
                    </li>
                    <li>
                      <span className="text-lightblue">3</span>
                      <label className="switch">
                        <input type="checkbox" checked />
                        <span className="slider-round"></span>
                      </label>
                      <span className="text-lightblue">Go to</span>
                      <button className="btn bg-lightblue btn-question" type="button">
                        <span>Question 02</span>
                      </button>
                    </li>
                    <li>
                      <span className="text-lightblue">4</span>
                      <label className="switch">
                        <input type="checkbox" checked />
                        <span className="slider-round"></span>
                      </label>
                      <span className="text-lightblue">Go to</span>
                      <button className="btn bg-lightblue btn-question" type="button">
                        <span>Question 02</span>
                      </button>
                    </li>
                    <li>
                      <span className="text-lightblue">5</span>
                      <label className="switch">
                        <input type="checkbox" checked />
                        <span className="slider-round"></span>
                      </label>
                      <span className="text-lightblue">Go to</span>
                      <button className="btn bg-lightblue btn-question" type="button">
                        <span>Question 02</span>
                      </button>
                    </li>
                    <li>
                      <span className="text-lightblue">6</span>
                      <label className="switch">
                        <input type="checkbox" />
                        <span className="slider-round"></span>
                      </label>
                    </li>
                    <li>
                      <span className="text-lightblue">7</span>
                      <label className="switch">
                        <input type="checkbox" />
                        <span className="slider-round"></span>
                      </label>
                    </li>
                    <li>
                      <span className="text-lightblue">8</span>
                      <label className="switch">
                        <input type="checkbox" />
                        <span className="slider-round"></span>
                      </label>
                    </li>
                    <li>
                      <span className="text-lightblue">9</span>
                      <label className="switch">
                        <input type="checkbox" />
                        <span className="slider-round"></span>
                      </label>
                    </li>
                    <li>
                      <span className="text-lightblue">0</span>
                      <label className="switch">
                        <input type="checkbox" />
                        <span className="slider-round"></span>
                      </label>
                    </li>
                  </ul>
                </div>
              </div>
            </div>
          </div>

          <div className="questions">
            <h4>Question 02</h4>
            <div className="cont">
              <div className="close-circle">
                <i className="fa fa-close"></i>
              </div>

              <div className="row">
                <div className="col-sm-6 col-md-7 pr-sm-0">
                  <p className="bg-lightgray top-p text-lightblue mb-3 px-1">Confidence you have in the answer or solution provided by the representative</p>
                  <h6 className="mb-1">AUDIO - DEFAULT</h6>
                  <p className="audio-name mb-1">SSN_Welcom_Audio.wav</p>
                  <audio controls>
                    <source src="..." type="audio/ogg" />
                    Your browser does not support the audio element.
                  </audio>
                  <h6 className="mt-4">TTS</h6>
                  <p className="bg-lightgray p-tts">Rate the confidence you have in the answer  or solution provided by the representative.  Press a number from 1 to 5, where 1 is poor</p>
                  <audio controls>
                    <source src="..." type="audio/ogg" />
                    Your browser does not support the audio element.
                  </audio>
               </div>
                <div className="col-sm-6 col-md-5">
                  <ul className="list-unstyled">
                    <li>
                      <span className="text-lightblue">1</span>
                      <label className="switch">
                        <input type="checkbox" checked />
                        <span className="slider-round"></span>
                      </label>
                      <span className="text-lightblue">Confirm</span>
                    </li>
                    <li>
                      <span className="text-lightblue">2</span>
                      <label className="switch">
                        <input type="checkbox" />
                        <span className="slider-round"></span>
                      </label>
                    </li>
                    <li>
                      <span className="text-lightblue">3</span>
                      <label className="switch">
                        <input type="checkbox" />
                        <span className="slider-round"></span>
                      </label>
                    </li>
                    <li>
                      <span className="text-lightblue">4</span>
                      <label className="switch">
                        <input type="checkbox" />
                        <span className="slider-round"></span>
                      </label>
                    </li>
                    <li>
                      <span className="text-lightblue">5</span>
                      <label className="switch">
                        <input type="checkbox" />
                        <span className="slider-round"></span>
                      </label>
                    </li>
                    <li>
                      <span className="text-lightblue">6</span>
                      <label className="switch">
                        <input type="checkbox" />
                        <span className="slider-round"></span>
                      </label>
                    </li>
                    <li>
                      <span className="text-lightblue">7</span>
                      <label className="switch">
                        <input type="checkbox" />
                        <span className="slider-round"></span>
                      </label>
                    </li>
                    <li>
                      <span className="text-lightblue">8</span>
                      <label className="switch">
                        <input type="checkbox" />
                        <span className="slider-round"></span>
                      </label>
                    </li>
                    <li>
                      <span className="text-lightblue">9</span>
                      <label className="switch">
                        <input type="checkbox" />
                        <span className="slider-round"></span>
                      </label>
                    </li>
                    <li>
                      <span className="text-lightblue">0</span>
                      <label className="switch">
                        <input type="checkbox" />
                        <span className="slider-round"></span>
                      </label>
                    </li>
                  </ul>
                </div>
              </div>
            </div>
          </div>

          <div className="btn-add-question pt-2">
            <button className="btn bg-lightblue btn-add-question mr-3" type="button">
              <span>ADD QUESTION</span>
            </button>
            <button className="btn bg-lightblue btn-add-question" type="button">
              <span>ADD VOICE QUESTION</span>
            </button>
          </div>
        </div>
      </section>
    );
  }
}
function mapStateToProps(state) {
  const global = state.get('global');
  return { global };
}
export default connect(mapStateToProps, {})(
  CurrentSurveyPage
);
