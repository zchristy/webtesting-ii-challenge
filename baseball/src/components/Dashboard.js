import React, { Component } from 'react';

import Display from './Display'

class Dashboard extends Component {
  state = {
    count: {
      strike: 0,
      ball: 0,
      foul: 0
    },
    inning: {
      number: 1,
      outs: 0,
      runs: 0,
      errors:0,
      hit: 0
    },
    hits: {
      singles: 0,
      doubles: 0,
      triples: 0,
      homeRuns: 0
    },
    bases: {
      first: false,
      second: false,
      third: false,
    },
    game: {
      runsTotal: 0,
      errorsTotal: 0,
      hits: 0
    }

  }

  countHandler = e => {
    e.preventDefault()

    const { strike, ball, foul } = this.state.count
    const { outs, hit, runs, number, errors } = this.state.inning
    const { hits, runsTotal, errorsTotal } = this.state.game

    if(e.target.name === 'strike') {
      if(strike < 2) {
        this.setState({
          ...this.state,
          count: {
            ...this.state.count,
            strike: strike + 1
          }
        })
      } else if(outs < 2) {
          this.setState({
            ...this.state,
            count: {
              ...this.state.count,
              strike: 0,
              ball: 0,
              foul: 0
            },
            inning: {
              ...this.state.inning,
              outs: outs + 1
            }
          })
      } else {
          this.setState({
            ...this.state,
            count: {
              ...this.state.count,
              strike: 0,
              ball: 0,
              foul: 0
            },
            inning: {
              ...this.state.inning,
              outs: 0,
              hit: 0,
              runs: 0,
              errors: 0,
              number: number + 1
            }
          })
        }
    } else if(e.target.name === 'ball') {
        if (ball < 3) {
          this.setState({
            ...this.state,
            count: {
              ...this.state.count,
              ball: ball + 1
            }
          })
        } else {
          this.setState({
            ...this.state,
            count: {
              ...this.state.count,
              strike: 0,
              ball: 0,
              foul: 0
            }
          })
        }
    } else if(e.target.name === 'foul') {

        if (strike < 2) {
          this.setState({
            ...this.state,
            count: {
              ...this.state.count,
              strike: strike + 1,
              foul: foul + 1
            }
          })
        } else {
          this.setState({
            ...this.state,
            count: {
              ...this.state.count,
              foul: foul + 1
            }
          })
        }

      } else if(e.target.name === 'hit') {
        if(hit < 3) {
          this.setState({
            ...this.state,
            count: {
              strike: 0,
              ball: 0,
              foul: 0,
            },
            inning: {
              ...this.state.inning,
              hit: hit + 1
            },
            game: {
              ...this.state.game,
              hits: hits + 1
            }
          })
        } else {
          this.setState({
            ...this.state,
            count: {
              strike: 0,
              ball: 0,
              foul: 0,
            },
            inning: {
              ...this.state.inning,
              hit: hit + 1,
              runs: runs + 1
            },
            game: {
              ...this.state.game,
              hits: hits + 1,
              runsTotal: runsTotal + 1
            }
          })
        }

      } else if(e.target.name === 'error') {

          this.setState({
            ...this.state,
            inning: {
              ...this.state.inning,
              errors: errors + 1
            },
            game: {
              ...this.state.game,
              errorsTotal: errorsTotal + 1
            }
          })

      }
  }

  resetCount = e => {
    e.preventDefault()

    this.setState({
      ...this.state,
      count: {
        ...this.state.count,
        strike: 0,
        ball: 0,
        foul: 0
      }
    })
  }

  render() {
    return (
      <div>
        <Display
          count={this.state.count}
          inning={this.state.inning}
          hits={this.state.hits}
          bases={this.state.bases}
          game={this.state.game}
        />
        <h1>Keep Track of Current Batter</h1>
        <button data-testid='strikeBtn' name= 'strike' onClick={this.countHandler} >Strike</button>
        <button data-testid='ballBtn' name= 'ball' onClick={this.countHandler} >Ball</button>
        <button data-testid='foulBtn' name= 'foul' onClick={this.countHandler} >Foul</button>
        <button data-testid='hitBtn' name= 'hit' onClick={this.countHandler} >At bat Hit</button>
        <button data-testid='errorBtn' name= 'error' onClick={this.countHandler} >Error</button>
        <button data-testid='resetBtn' onClick={this.resetCount} >Reset Batter Count</button>
      </div>
    );
  }
}

export default Dashboard;
