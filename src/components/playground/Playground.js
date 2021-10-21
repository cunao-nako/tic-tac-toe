import React, {Component} from 'react';

class AuthenticationFailure extends Component {
  render() {
    const {failureButtonHandler} = this.props;
    return (
        <>
          <span>Неправильно введен логин / пароль !</span>
          <button onClick={failureButtonHandler}>Попробовать ещё раз</button>
        </>

    );
  }
}

class Authentication extends Component {

  render() {
    const {authenticationFormHandler, isAuthenticationFailed, failureButtonHandler} = this.props;
    if (isAuthenticationFailed) {
      return <AuthenticationFailure failureButtonHandler={failureButtonHandler}/>
    }
    return(
        <form onSubmit={(event) => authenticationFormHandler(event)}>
          <input placeholder='Login' name='login'/>
          <input placeholder='Password' name='password'/>
          <input type='submit' value='Login'/>
        </form>
    );
  }
}

class GreetingGuest extends Component {
  render() {
    const {authenticationFormHandler, isAuthenticationFailed, failureButtonHandler} = this.props;
    return(
        <>
          <h1>Hello! Please log in!</h1>
          <Authentication
              authenticationFormHandler={authenticationFormHandler}
              isAuthenticationFailed={isAuthenticationFailed}
              failureButtonHandler={failureButtonHandler}
          />
        </>
    );
  }
}

class GreetingUser extends Component {
  render() {
    const {userName, logUserOutButtonHandler} = this.props;
    return(
        <>
          <h1>Welcome, {userName}</h1>
          <button onClick={logUserOutButtonHandler}>Выйти</button>
        </>
    );
  }
}

class Greeting extends Component {
  render() {
    const {
      userName,
      isUserLogged,
      isAuthenticationFailed,
      failureButtonHandler,
      authenticationFormHandler,
      logUserOutButtonHandler,
    } = this.props;

    if (!isUserLogged) {
      return(
          <GreetingGuest
              authenticationFormHandler={authenticationFormHandler}
              isAuthenticationFailed={isAuthenticationFailed}
              failureButtonHandler={failureButtonHandler}
          />
      );
    }
    return <GreetingUser userName={userName} logUserOutButtonHandler={logUserOutButtonHandler}/>;
  }
}

export class Playground extends Component {
  constructor(props) {
    super(props);
    this.state = {
      authenticationFailed: false,
      userIsLogged: false,
      user: {
        login: 'login',
        password: 'password',
      },
    };
    this.isLoginValid = this.isLoginValid.bind(this);
    this.isPassportValid = this.isPassportValid.bind(this);
    this.logUserIn = this.logUserIn.bind(this);
    this.authenticationFailed = this.authenticationFailed.bind(this);
    this.authenticationFormHandler = this.authenticationFormHandler.bind(this);
    this.failureButtonHandler = this.failureButtonHandler.bind(this);
    this.logUserOutButtonHandler = this.logUserOutButtonHandler.bind(this);
  }

  get isUserLogged() {
    return this.state.userIsLogged;
  }

  get isAuthenticationFailed() {
    return this.state.authenticationFailed;
  }

  isLoginValid(login) {
    return this.state.user.login === login;
  }

  isPassportValid(password) {
    return this.state.user.password === password;
  }

  authentication({login, password}) {
    const isLoginValid = this.isLoginValid(login);
    const isPassportValid = this.isPassportValid(password);

    const authenticationResult = isLoginValid && isPassportValid;

    this.authenticationResultHandler(authenticationResult);
  }

  authenticationResultHandler(authenticationResult) {
    if (authenticationResult) {
      this.logUserIn();
    } else {
      this.authenticationFailed();
    }
  }

  logUserIn() {
    this.setState({userIsLogged: true, authenticationFailed: false});
  }

  logUserOut() {
    this.setState({userIsLogged: false});
  }

  authenticationFailed() {
    this.setState({authenticationFailed: true});
  }

  authenticationFormHandler(event) {
    event.preventDefault();
    const eventResult = new FormData(event.target);

    const login = eventResult.get('login');
    const password = eventResult.get('password');

    this.authentication({login, password});
  }

  failureButtonHandler() {
    this.setState({authenticationFailed: false});
  }

  logUserOutButtonHandler() {
    this.logUserOut();
  }

  render() {
    const {login} = this.state.user;
    return (
        <Greeting
            userName={login}
            isUserLogged={this.isUserLogged}
            authenticationFormHandler={this.authenticationFormHandler}
            isAuthenticationFailed={this.isAuthenticationFailed}
            failureButtonHandler={this.failureButtonHandler}
            logUserOutButtonHandler={this.logUserOutButtonHandler}
        />
    );
  }
}