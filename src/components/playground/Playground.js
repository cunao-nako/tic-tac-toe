import React, {Component} from 'react';

class ManagedForm extends Component {
  constructor(props) {
    super(props);
    this.state = {
      nameValue: '',
      messageValue: '',
      selectDefaultValue: 'coconut',
      addToShoppingCart: false,
      selectOptions: [
        {value: 'coconut', title: 'Кокос'},
        {value: 'apple', title: 'Яблоко'},
        {value: 'mango', title: 'Манго'},
        {value: 'orange', title: 'Апельсин'},
        {value: 'lemon', title: 'Лимон'},
      ],
    };
    this.inputChangeHandler = this.inputChangeHandler.bind(this);
    this.messageFormSubmitHandler = this.messageFormSubmitHandler.bind(this);
    this.selectChangeHandler = this.selectChangeHandler.bind(this);
    this.checkboxChangeHandler = this.checkboxChangeHandler.bind(this);
  }

  inputChangeHandler(event) {
    const name = event.target.name;
    const value = event.target.value;
    this.setState({[name]: value})
  }

  messageFormSubmitHandler(event) {
    event.preventDefault();
    const senderName = this.state.nameValue ? `${this.state.nameValue}:` : '';
    const senderMessage = this.state.messageValue;
    const senderNameAndMessage = senderName || senderMessage ? `${senderName} ${senderMessage}`.trim() : '';
    const shoppingCart = `${this.state.addToShoppingCart ? `| ${this.state.selectDefaultValue}` : ''}`;
    alert(`${senderNameAndMessage} ${shoppingCart}`.trim());
    this.setState({nameValue: '', messageValue: '', addToShoppingCart: false});
  }

  selectChangeHandler(event) {
    this.setState({selectDefaultValue: event.target.value});
  }

  checkboxChangeHandler() {
    this.setState((state) => ({addToShoppingCart: !state.addToShoppingCart}));
  }

  get selectOptions() {
    return this.state.selectOptions.map((option) => <option value={option.value}>{option.title}</option>);
  }

  render() {
    const {nameValue, messageValue, selectDefaultValue, addToShoppingCart} = this.state;
    return(
        <>
          <select value={selectDefaultValue} onChange={this.selectChangeHandler}>
            {this.selectOptions}
          </select>
          <label>
            Купить
            <input type='checkbox' checked={addToShoppingCart} onChange={this.checkboxChangeHandler}/>
          </label>
          <form onSubmit={this.messageFormSubmitHandler}>
            <label>
              Имя:
              <input name='nameValue' type="text" value={nameValue} onChange={this.inputChangeHandler} />
            </label>
            <label>
              Сообщение:
              <textarea name='messageValue' value={messageValue} onChange={this.inputChangeHandler}/>
            </label>
            <input type='submit' value='Enter'/>
          </form>
        </>
    );
  }
}

export class Playground extends Component {
  render() {
    return <ManagedForm/>;
  }
}