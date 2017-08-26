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
      <h2>It is {this.state.date.toLocaleTimeString()}.</h2>
    );
  }
}

// class List extends React.Component {
//   render() {
//     return (
//
//     );
//   }
// }

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

export class App extends React.Component {
  render() {
    return (
      <div>
        <h1>Hello World</h1>
        <Clock />
        <Calculator />
      </div>
    );
  }

}
