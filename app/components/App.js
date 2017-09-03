import React from 'react';
import ReactDOM from 'react-dom';

// start clock
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
      <h2>It is {this.state.date.toLocaleTimeString()}.</h2>
    );
  }
}

// end clock

// class List extends React.Component {
//   render() {
//     return (
//
//     );
//   }
// }

//start temperature
function BoilingVerdict (props) {
  if (props.celsius >= 100) {
    return <p> Water will boil. </p>;
  }
  return <p> Water will not boil. </p>
}

const scaleNames = {
  c: "Celsius",
  f: "Fahrenheit"

};

function toCelsius(fahrenheit) {
  return (fahrenheit - 32) * 5 / 9;
}

function toFahrenheit(celsius) {
  return (celsius * 9 / 5) + 32;
}

function tryConvert(temperature, convert) {
  const input = parseFloat(temperature);
  if (Number.isNaN(input)) {
    return '';
  }
  const output = convert(input);
  const rounded = Math.round(output * 1000) / 1000;
  return rounded.toString();

}

class TemperatureInput extends React.Component {
  constructor(props) {
    super(props);
    this.handleChange = this.handleChange.bind(this);
  }

  handleChange(event) {
    this.props.onTemperatureChange(event.target.value);
  }


  render() {
    const temperature = this.props.temperature;
    const scale = this.props.scale;
    return (
      <div>
        <fieldset>
          <legend>
            Enter temperature in {scaleNames[scale]}:
          </legend>
          <input type="text" value={temperature} onChange={this.handleChange} />

        </fieldset>
      </div>
    )
  }
}

class Calculator extends React.Component {
  constructor(props) {
    super(props);
    this.handleFahrenheitChange = this.handleFahrenheitChange.bind(this);
    this.handleCelsiusChange = this.handleCelsiusChange.bind(this);
    this.state = {temperature: "", scale: "c"};
  }

  handleCelsiusChange(temperature) {
    this.setState({scale: 'c', temperature});
  }

  handleFahrenheitChange(temperature) {
    this.setState({scale:'f', temperature});
  }

  render() {
    const scale = this.state.scale;
    const temperature = this.state.temperature;
    const celsius = scale == 'f' ? tryConvert(temperature, toCelsius) : temperature;
    const fahrenheit = scale == 'c' ? tryConvert(temperature, toFahrenheit) : temperature;
    return (
      <div>
        <TemperatureInput scale="c" temperature={celsius} onTemperatureChange={this.handleCelsiusChange}/>
        <TemperatureInput scale="f" temperature={fahrenheit} onTemperatureChange={this.handleFahrenheitChange}/>
        <BoilingVerdict celsius={parseFloat(temperature)} />
      </div>
    );
  }
}
//end temperature

//start tic tac toe
function Square (props) {
    return (
      <button className="square" onClick={props.onClick}>
        {props.value}
      </button>
    );

}

class Board extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      squares: Array(9).fill(null),
      xIsNext: true,
    };
  }

  handleClick(i) {
    const squares = this.state.squares.slice();
    if (calculateWinner(squares) || squares[i]) {
      return;
    }
    squares[i] = this.state.xIsNext ? "X" : "O";
    this.setState({
      squares: squares,
      xIsNext: !this.state.xIsNext,
    });
  }

  renderSquare(i) {
    return (
      <Square
        value={this.state.squares[i]}
        onClick={() => this.handleClick(i)}
      />
    );
  }

  render() {
    const winner = calculateWinner(this.state.squares);
    let status;
    if (winner) {
      status = "Winner: " + winner;
    } else {
      status = 'Next player:' + (this.state.xIsNext ? 'X' : 'O');
    }


    return (
      <div>
        <div className="status">{status}</div>
        <div className="board-row">
          {this.renderSquare(0)}
          {this.renderSquare(1)}
          {this.renderSquare(2)}
        </div>
        <div className="board-row">
          {this.renderSquare(3)}
          {this.renderSquare(4)}
          {this.renderSquare(5)}
        </div>
        <div className="board-row">
          {this.renderSquare(6)}
          {this.renderSquare(7)}
          {this.renderSquare(8)}
        </div>
      </div>
    );
  }
}

function calculateWinner (squares) {
  const lines = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6]
  ];
  for (let i = 0; i < lines.length; i++) {
    const [a, b, c] = lines[i];
    if (squares[a] && squares[a] === squares[b] && squares[a] === squares[c]) {
      return squares[a];
    }
  }
  return null;
}

class Game extends React.Component {
  render() {
    return (
      <div className="game">
        <div className="game-board">
          <Board />
        </div>
        <div className="game-info">
          <div>{/* status */}</div>
          <ol>{/* TODO */}</ol>
        </div>
      </div>
    );
  }
}

export class App extends React.Component {
  render() {
    return (
      <div>
        <h1>Hello World</h1>
        <Clock />
        <Calculator />
        <Game />
      </div>
    );
  }

}
