import React, { Component } from 'react';

import BoxScore from './BoxScore'

class Display extends Component {
  render() {
    const { strike, ball, foul } = this.props.count
    const { hit, outs, number, runs, errors} = this.props.inning
    return (
      <div>
        <h1>Box Score</h1>
        <BoxScore
          count={this.props.count}
          inning={this.props.inning}
          hits={this.props.hits}
          bases={this.props.bases}
          game={this.props.game}
        />
        <table>
          <tbody>
            <tr>
              <th>Strikes</th>
                <td data-testid='strikeCount' >{strike}</td>
              <th>Balls</th>
                <td data-testid='ballCount' >{ball}</td>
              <th>Fouls</th>
                <td data-testid='foulCount' >{foul}</td>
              <th>Hits</th>
                <td data-testid='hitCount' >{hit}</td>
              <th>Outs</th>
                <td data-testid='outCount' >{outs}</td>
              <th>Inning</th>
                <td data-testid='inningCount' >{number}</td>
              <th>Runs</th>
                <td data-testid='runsCount' >{runs}</td>
              <th>Errors</th>
                <td data-testid='errorsCount' >{errors}</td>
            </tr>
          </tbody>
        </table>
      </div>
    );
  }
}

export default Display;
