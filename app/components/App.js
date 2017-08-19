import React from 'react';
import ReactDOM from 'react-dom';

class Clock extends React.Component {

  constructor(props) {
    super(props);
    this.state = {date: new Date()};
  }

  componentDidMount() {
    // this.timerID = setInterval (
    //   () => this.tick(),
    //     1000
    // );

    this.timerID = setInterval(function () {
        this.tick();
      }.bind(this), 1000);
    }

  componentWillUnmount() {
    clearInterval(this.timerID);
  }

  tick() {
    this.setState({
      date: new Date()
    });
  }

  render() {
    return (
      <h2>It is {this.state.date.toLocaleTimeString()} oclock.</h2>
    );
  }
}

export class App extends React.Component {
  render() {
    return (
      <div>
        <h1>Hello World</h1>
        <Clock />
      </div>
    );
  }

}
