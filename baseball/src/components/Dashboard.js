import React, { Component } from 'react';

import Display from './Display'

class Dashboard extends Component {
  state = {
    strike: 0,
    ball: 0,
    foul: 0,
    hit: false
  }

  countHandler = e => {
    e.preventDefault()

    if(e.target.name === 'strike') {
      if(this.state.strike < 3) {
        this.setState({
          ...this.state,
          strike: this.state.strike + 1
        })
      } else {
          this.setState({
            ...this.state,
            strike: 0
          })
      }
    } else if(e.target.name === 'ball') {
        if (this.state.ball < 4) {
          this.setState({
            ...this.state,
            ball: this.state.ball + 1
          })
        } else {
          this.setState({
            ...this.state,
            ball: 0
          })
        }
    } else if(e.target.name === 'foul') {
        this.setState({
          ...this.state,
          foul: this.state.foul + 1
        })

        if (this.state.strike < 2) {
          this.setState({
            ...this.state,
            strike: this.state.strike + 1
          })
        }
      } else if(e.target.name === 'hit') {
        this.setState({
          strike: 0,
          ball: 0,
          foul: 0,
          hit: true
        })
      }
  }

  reset = e => {
    e.preventDefault()

    this.setState({
      strike: 0,
      ball: 0,
      foul: 0,
      hit: false
    })
  }

  render() {
    console.log(this.state)
    return (
      <div>
        <Display count={this.state} />
        <h1>Keep Track of Current Batter</h1>
        <button name= 'strike' onClick={this.countHandler} >Strike</button>
        <button name= 'ball' onClick={this.countHandler} >Ball</button>
        <button name= 'foul' onClick={this.countHandler} >Foul</button>
        <button name= 'hit' onClick={this.countHandler} >Hit</button>
        <button onClick={this.reset} >Reset Batter Count</button>
      </div>
    );
  }
}

export default Dashboard;
