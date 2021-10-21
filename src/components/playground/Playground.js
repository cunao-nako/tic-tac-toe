import React, {Component} from 'react';

class ManagedForm extends Component {
  constructor(props) {
    super(props);
    this.state = {value: ''};
    this.nameInputChangeHandler = this.nameInputChangeHandler.bind(this);
    this.formSubmitHandler = this.formSubmitHandler.bind(this);
  }

  nameInputChangeHandler(event) {
    this.setState({value: event.target.value})
  }

  formSubmitHandler(event) {
    event.preventDefault();
    alert(this.state.value);
    this.setState({value: ''});
  }

  render() {
    return(
        <form onSubmit={this.formSubmitHandler}>
          <label>
            Имя:
            <input type="text" value={this.state.value} onChange={this.nameInputChangeHandler} />
          </label>
          <input type="submit" value="Отправить" />
        </form>
    );
  }
}

export class Playground extends Component {
  render() {
    return <ManagedForm/>;
  }
}