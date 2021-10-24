import React, {Component} from 'react';

function WaterBoilingResult(props) {
  const isBoilingTemperature = props.temperature > 99;
  const resultMessage = isBoilingTemperature ? 'Вода кипит' : 'Вода не кипит';
  return (
      <>
        <br/>
        <span>{resultMessage}</span>
      </>
  );

}

function convertToCelsius(temperature) {
  return Math.round((temperature - 32) * 5 / 9);
}

function convertToFahrenheit(temperature) {
  return Math.round((temperature * 9 / 5) + 32);
}

function convertTemperature({scale, temperature}) {
  switch (scale) {
    case 'celsius':
      return convertToCelsius(temperature * 9 / 5);
    default:
      return convertToFahrenheit(temperature);
  }

}

function TemperatureInputBlock(props) {
  const {temperature, temperatureInputChangeHandler, scale} = props;
  const scaleNames = {
    celsius: 'Цельсиях',
    fahrenheit: 'Фаренгейтах',
  };

  const preTemperatureInputChangeHandler = event => {
    event.preventDefault();
    const temperature = event.target.value;
    const convertedCelsiusTemperature = convertTemperature({scale: 'celsius', temperature})
    temperatureInputChangeHandler(convertedCelsiusTemperature);
  }

  const temperatureValueByScale = () => {
    console.debug('converting');
    return convertTemperature({scale, temperature});
  }

  return (
      <>
        <legend>Введите температуру в {scaleNames[scale]}:</legend>
        <input value={temperatureValueByScale()} onChange={preTemperatureInputChangeHandler}/>
        <br/>
      </>
  );
}

class Calculator extends Component {
  constructor(props) {
    super(props);
    this.state = {temperature: 0};
    this.temperatureInputChangeHandler = this.temperatureInputChangeHandler.bind(this);
  }

  temperatureInputChangeHandler(convertedCelsiusTemperature) {
    this.setState({temperature: convertedCelsiusTemperature});
  }

  render() {
    const {temperature} = this.state;
    return(
        <>
          <TemperatureInputBlock
              scale='celsius'
              temperature={temperature}
              temperatureInputChangeHandler={this.temperatureInputChangeHandler}
          />
          <TemperatureInputBlock
              scale='fahrenheit'
              temperature={temperature}
              temperatureInputChangeHandler={this.temperatureInputChangeHandler}
          />
          <WaterBoilingResult temperature={temperature}/>
        </>
    );
  }
}

export class Playground extends Component {
  render() {
    return <Calculator/>;
  }
}