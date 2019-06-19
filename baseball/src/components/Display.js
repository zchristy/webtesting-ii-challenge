import React, { Component } from 'react';

class Display extends Component {
  render() {
    return (
      <div>
        <div>Strikes<div data-testid='strikeCount' >{this.props.count.strike}</div></div>
        <div>Balls<div data-testid='ballCount' >{this.props.count.ball}</div></div>
        <div>Fouls<div data-testid='foulCount' >{this.props.count.foul}</div></div>
        <div>Hits<div data-testid='hitCount' >{this.props.count.hit}</div></div>
      </div>
    );
  }
}

export default Display;
