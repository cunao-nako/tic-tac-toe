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

function TemperatureInputBlock(props) {
  const {temperature, temperatureInputChangeHandler, scaleName} = props;
  const scaleNames = {
    c: 'Цельсиях',
    f: 'Фаренгейтах',
  };
  return (
      <>
        <legend>Введите температуру в {scaleNames[scaleName]}:</legend>
        <input value={temperature} onChange={temperatureInputChangeHandler}/>
        <br/>
      </>
  );
}

class Calculator extends Component {
  constructor(props) {
    super(props);
    this.state = {temperature: ''};
    this.temperatureInputChangeHandler = this.temperatureInputChangeHandler.bind(this);
  }

  temperatureInputChangeHandler(event) {
    const value = event.target.value;
    this.setState({temperature: value});
  }

  render() {
    const {temperature} = this.state;
    return(
        <>
          <TemperatureInputBlock
              scaleName='c'
              temperature={temperature}
              temperatureInputChangeHandler={this.temperatureInputChangeHandler}
          />
          <TemperatureInputBlock
              scaleName='f'
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