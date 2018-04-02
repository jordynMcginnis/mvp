import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';
import themes from './themes'

function SelectTheme (props) {
  const letters = ("abcdefghijklmnopqrstuvwxyz").split("");

  return (
    <div>
      <div className='App-header'>
        <div className="dropdown">
          <button className="dropbtn">Pick a Theme:</button>
          <ul className="dropdown-content">
            <li href="#1" onClick={props.selectTheme.bind(null, 'theGoonies')}>The Goonies</li>
            <li href="#1" onClick={props.selectTheme.bind(null, 'bigHeroSix')}>Big Hero Six</li>
            <li href="#1" onClick={props.selectTheme.bind(null, 'aChristmasStory')}>A Christmas Story</li>
          </ul>
        </div>
      </div>

      <div className='box26'>
        <div>
          <ul className='select'>
            {letters.map(function(letter){
              return (
                <li className='each'onClick={props.checkWord.bind(null, letter)} key={letter}> {letter} </li>
              )
            }.bind(this))}
          </ul>
        </div>
      </div>
    </div>
  )
}

class Main extends Component {
  constructor (props){
    super(props);
    this.state = {
      selectedTheme : '',
      selectedWord: '',
      guessedWord: [],
      winner: 'maybe',
      wrongLetters: [],
      count: 0
    }
    this.selectTheme = this.selectTheme.bind(this);
    this.checkWord = this.checkWord.bind(this);
  }
  selectTheme (theme) {
    var word = themes[theme][Math.floor(Math.random() * 5)];
    this.setState(function(){
      return {
        selectedTheme : '',
      selectedWord: '',
      guessedWord: [],
      winner: 'maybe',
      wrongLetters: [],
      count: 0
      }
    })
    this.setState(function(){
      return {
        selectedTheme: theme,
        selectedWord: word
      }
    })
  }
  checkWord (letter) {
      var result = this.state.guessedWord
      var name = this.state.selectedWord
      if(result.length === 0){
        for(var i = 0; i < name.length; i++){
          if(name[i] === ' '){
            result.push(' ')
          } else {
            result.push('_')
          }
        }
      } else {
        for(var i = 0; i < result.length; i++){
          if(result[i] === '_'){
            for(var i = 0; i < name.length; i++){
              if(name[i] === letter){
                result[i] = letter;
              } else if (name.indexOf(letter) === -1){
                this.setState(function(){
                  return {
                    wrongLetters: this.state.wrongLetters.concat([letter]),
                    count: this.state.count + 1
                  }
                })
              }
            }
          }
        }
        }
        if(this.state.wrongLetters.length > 5){
          this.setState(function(){
            return {
              winner : 'NO'
            }
          })
        }
        if(result.indexOf('_') === -1){
          this.checkWinner()
        }

          this.setState(function(){
          return {
            guessedWord: result,

          }
        })



 }
 checkWinner() {

    this.setState(function(){
      return {
        winner: 'YES'
      }
    })

 }
  render() {
    var count = 'pic' + this.state.count
    var man;

      man = (
        <div className='man'>
        <div className= {count}> </div>
        </div>
      )


    var answer;
    if(this.state.winner === 'maybe'){
      answer = (
        <p className='words'> {this.state.guessedWord.map(function(letter){
              return letter
            })}
        </p>
      )
    } else if (this.state.winner === 'NO'){
      answer = (
        <p className='winner'> Loser! It was {this.state.selectedWord}</p>
      )
    } else if (this.state.winner === 'YES'){
      answer = (
        <p className='winner'> Winner!</p>
      )
    }
    var certaintheme;
    if(this.state.selectedTheme === 'theGoonies'){
      certaintheme = (
        <div>
           <div className = 'box25'>
          {answer}
        </div>
        <div className='g'>
        </div>
        <div className ='hangmanp'>
            {man}
            {this.state.wrongLetters.map(function(letter){
              return  letter
            })}

        </div>
        </div>
      )
    }
     else if(this.state.selectedTheme === 'bigHeroSix'){
      certaintheme = (
        <div>
           <div className = 'box25'>
          {answer}
        </div>
        <div className='b'>
        </div>
        <div className ='hangmanp'>
            {man}
            {this.state.wrongLetters.map(function(letter){
              return  letter
            })}

        </div>
        </div>
      )
    }
     else if(this.state.selectedTheme === 'aChristmasStory'){
      certaintheme = (
        <div>
           <div className = 'box25'>
          {answer}
        </div>
         <div className='bu'>
        </div>
        <div className ='hangmanp'>
            {man}
            {this.state.wrongLetters.map(function(letter){
              return  letter
            })}
        </div>
        </div>
      )
    }
    return (
      <div>
        <SelectTheme
          selectTheme={this.selectTheme}
          selectedTheme={this.state.selectedTheme}
          checkWord={this.checkWord}
        />
        {certaintheme}
      </div>
    )
  }
}

class App extends Component {
  render() {
    return (
      <div className="App">
        <div className="App-intro">
          <Main />
        </div>
      </div>
    );
  }
}

export default App;
