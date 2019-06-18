import React, { Component } from 'react';

class Display extends Component {
  render() {
    return (
      <div>
        <div>{this.props.count.strike}</div>
        <div>{this.props.count.ball}</div>
        <div>{this.props.count.foul}</div>
        <div>{this.props.count.hit}</div>
      </div>
    );
  }
}

export default Display;
