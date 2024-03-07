import React from 'react';
import ReactDOM from 'react-dom';
import './styles/Home.module.css';
import Popup from 'reactjs-popup';
import 'reactjs-popup/dist/index.css';
import DataService from './services/people.service.js';

class Game extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
    streak: 0,
    maleIds: [],
    femaleIds: [],
    nextQuestionMale: true,
    questionShow: false,
    introShow: true,
    data: null,
    isLoading: false,
    questionState: '',
    answer0: '',
    answer1: '',
    answer2: '',
    answer3: '',
    correctAnswerState: '',
    correctAnswerClicked: false,
    correctAnswerShow: false,
    test: ''
  };
}

  beginGame = () => {
    this.setState({
      introShow: false,
      isLoading: true,
    });
    this.loadNewQuestion();
  }

  loadNewQuestion = async () => {
    const femaleMax = 30;
    const maleMax = 70;
    const isMale = this.state.nextQuestionMale;
    const names = [];
    var max = 0;
    var idArray = [];
    if (isMale) {
      max = maleMax;
      idArray = [...idArray, this.state.maleIds];
    } else {
      max = femaleMax;
      idArray = [...idArray, this.state.femaleIds];
    }
    var answerIDTry = Math.floor(Math.random() * max + 1);
    const ansArray = [];
    while (idArray.includes(answerIDTry)) {
      answerIDTry = Math.floor(Math.random() * max + 1);
    }
    ansArray.push(answerIDTry);
    while (ansArray.length < 4) {
      answerIDTry = Math.floor(Math.random() * max + 1);
      if (!ansArray.includes(answerIDTry)) {
        ansArray.push(answerIDTry);
      }
    }
    var responses = [];
    if (isMale) {
      try {
        responses = await DataService.getMale(ansArray);
      } catch (error) {
        console.error('Error fetching data:', error);
      };
      this.setState({
        maleIds: [...idArray, ansArray[0]],
      });
    } else {
      try {
        responses = await DataService.getFemale(ansArray);
      } catch (error) {
        console.error('Error fetching data:', error);
      };
      this.setState({
        femaleIds: [...idArray, ansArray[0]],
      });
    }
    const quote = responses[0].data.quote;
    for (var i = 0; i < responses.length; i++) {
      names.push(responses[i].data.name);
      //console.log(names);
    }
    const correctAnswer = Math.floor(Math.random() * 4);
    if (correctAnswer !== 0) {
      [names[0], names[correctAnswer]] = [names[correctAnswer], names[0]]
    }
    this.setState({
      questionState: quote,
      answer0: names[0],
      answer1: names[1],
      answer2: names[2],
      answer3: names[3],
      correctAnswerState: names[correctAnswer],
      isLoading: false,
      nextQuestionMale: !isMale,
    });
  }

  handleButtonClick = param => {
    const clickedAnswer = param;
    console.log(clickedAnswer);
    const correctAnswer = this.state.correctAnswerState;

    if (clickedAnswer === correctAnswer) {
      this.setState({
        correctAnswerShow: true,
        correctAnswerClicked: true,
        test: 'how did you get here'
      });
    } else {
      this.setState({
        correctAnswerShow: true,
        correctAnswerClicked: false,
        test: clickedAnswer
      });
    }
  }

  handleNextButtonClick = () => {
    this.loadNewQuestion();
    this.setState({
      correctAnswerShow: false
    });
  }

  render() {
    const { isLoading, error } = this.state;
    if (isLoading) {
      return <p>Loading...</p>;
    }
    return (
        <div>
          {this.state.introShow ? (
            <>
            <h1>
              <p class="Home_title__2uykl">Welcome to Wikiguessr! </p>
            </h1>
            <div className="Home_container__mxz0c">
            <button className="Home_card__1NENW" onClick={this.beginGame}> BEGIN! </button>
              <Popup trigger={<button className="Home_card__1NENW"> How To Play</button>}>
              <span>How To Play: You will be given an excerpt from the Wikipedia page of a famous person. Your job is to figure out whose page it comes from.</span>
              </Popup>
            </div>

            </>
          ) : (
            <div>
              <h1 className="Home_quote__DTcNZ">{this.state.questionState}</h1>
              <div>


                      <button  className="Home_card__1NENW" onClick={() => this.handleButtonClick(this.state.answer0)} value={this.state.answer0}><h3>{this.state.answer0}</h3></button>

                        <button  className="Home_card__1NENW" onClick={() => this.handleButtonClick(this.state.answer1)} value={this.state.answer1}><h3>{this.state.answer1}</h3></button>
              </div>
              <div>

                        <button  className="Home_card__1NENW" onClick={() => this.handleButtonClick(this.state.answer2)} value={this.state.answer2}><h3>{this.state.answer2}</h3></button>

                        <button  className="Home_card__1NENW" onClick={() => this.handleButtonClick(this.state.answer3)} value={this.state.answer3}><h3>{this.state.answer3}</h3></button>
              </div>


              {this.state.correctAnswerShow ? (
                this.state.correctAnswerClicked ? (
                  <div>
                    <h3>Correct!!! &#x1F525; &#x1F525; &#x1F525;</h3>
                    <button className="Home_card__1NENW" onClick={this.handleNextButtonClick}>Next Question</button>
                  </div>
                ) : (
                  <div>
                    <h3>Aww, sad! The correct answer was {this.state.correctAnswerState}. You put {this.state.test}</h3>
                    <button className="Home_card__1NENW" onClick={this.handleNextButtonClick}>Next Question</button>
                  </div>
                )
              ) : null}
            </div>


          )
          }
        </div>

    );
  }

};



export default Game;
