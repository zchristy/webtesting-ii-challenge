import React, { Component } from 'react';

import Display from './Display'

class Dashboard extends Component {
  state = {
    strike: 0,
    ball: 0,
    foul: 0,
    hit: 0
  }

  countHandler = e => {
    e.preventDefault()

    if(e.target.name === 'strike') {
      if(this.state.strike < 2) {
        this.setState({
          ...this.state,
          strike: this.state.strike + 1
        })
      } else {
          this.setState({
            ...this.state,
            strike: 0,
            ball: 0,
            foul: 0
          })
      }
    } else if(e.target.name === 'ball') {
        if (this.state.ball < 3) {
          this.setState({
            ...this.state,
            ball: this.state.ball + 1
          })
        } else {
          this.setState({
            ...this.state,
            strike: 0,
            ball: 0,
            foul: 0
          })
        }
    } else if(e.target.name === 'foul') {

        if (this.state.strike < 2) {
          this.setState({
            ...this.state,
            strike: this.state.strike + 1,
            foul: this.state.foul + 1
          })
        } else {
          this.setState({
            ...this.state,
            foul: this.state.foul + 1
          })
        }

      } else if(e.target.name === 'hit') {
        this.setState({
          strike: 0,
          ball: 0,
          foul: 0,
          hit: this.state.hit + 1
        })
      }
  }

  reset = e => {
    e.preventDefault()

    this.setState({
      ...this.state,
      strike: 0,
      ball: 0,
      foul: 0
    })
  }

  render() {
    return (
      <div>
        <Display count={this.state} />
        <h1>Keep Track of Current Batter</h1>
        <button data-testid='strikeBtn' name= 'strike' onClick={this.countHandler} >Strike</button>
        <button data-testid='ballBtn' name= 'ball' onClick={this.countHandler} >Ball</button>
        <button data-testid='foulBtn' name= 'foul' onClick={this.countHandler} >Foul</button>
        <button data-testid='hitBtn' name= 'hit' onClick={this.countHandler} >Hit</button>
        <button data-testid='resetBtn' onClick={this.reset} >Reset Batter Count</button>
      </div>
    );
  }
}

export default Dashboard;
