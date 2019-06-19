import React, { Component } from 'react';

class Display extends Component {
  state = {
    inning1Runs: 0,
    inning2Runs: 0,
    inning3Runs: 0,
    inning4Runs: 0,
    inning5Runs: 0,
    inning6Runs: 0,
    inning7Runs: 0,
    inning8Runs: 0,
    inning9Runs: 0
  }

  componentDidUpdate(prevProps) {
    if(this.props.inning.runs !== prevProps.inning.runs || this.props.inning.number !== prevProps.inning.number) {
        const { runs, number } = this.props.inning
          console.log(number, 'runs', runs)
        if(number === 1) {
          this.setState({
            ...this.state,
            inning1Runs: runs
          })
        } else if (number === 2) {
          this.setState({
            ...this.state,
            inning2Runs: runs
          })
        } else if (number === 3) {
          this.setState({
            ...this.state,
            inning3Runs: runs
          })
        } else if (number === 4) {
          this.setState({
            ...this.state,
            inning4Runs: runs
          })
        } else if (number === 5) {
          this.setState({
            ...this.state,
            inning5Runs: runs
          })
        } else if (number === 6) {
          this.setState({
            ...this.state,
            inning6Runs: runs
          })
        } else if (number === 7) {
          this.setState({
            ...this.state,
            inning7Runs: runs
          })
        } else if (number === 8) {
          this.setState({
            ...this.state,
            inning8Runs: runs
          })
        } else if (number === 9) {
          this.setState({
            ...this.state,
            inning9Runs: runs
          })
        }
    }
  }
  render() {
    const { runsTotal, errorsTotal, hits } = this.props.game
    return (
      <div>
        <table>
          <tbody>
            <tr>
              <th>1</th>
                <td data-testid='inning1' >{this.state.inning1Runs}</td>
              <th>2</th>
                <td data-testid='inning2' >{this.state.inning2Runs}</td>
              <th>3</th>
                <td data-testid='inning3' >{this.state.inning3Runs}</td>
              <th>4</th>
                <td data-testid='inning4' >{this.state.inning4Runs}</td>
              <th>5</th>
                <td data-testid='inning5' >{this.state.inning5Runs}</td>
              <th>6</th>
                <td data-testid='inning6' >{this.state.inning6Runs}</td>
              <th>7</th>
                <td data-testid='inning7' >{this.state.inning7Runs}</td>
              <th>8</th>
                <td data-testid='inning8' >{this.state.inning8Runs}</td>
              <th>9</th>
                <td data-testid='inning9' >{this.state.inning9Runs}</td>
              <th>Runs</th>
                <td data-testid='runTotal' >{runsTotal}</td>
              <th>Errors</th>
                <td data-testid='errorTotal' >{errorsTotal}</td>
              <th>Hits</th>
                <td data-testid='hitTotal' >{hits}</td>
            </tr>
          </tbody>
        </table>
      </div>
    );
  }
}

export default Display;
