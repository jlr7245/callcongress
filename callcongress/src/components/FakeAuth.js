import React from 'react';
import moment from 'moment';
import fbaseAXIOS from './keys/key';

class FakeAuth extends React.Component {
  constructor() {
    super();
    //binds
    this.checkLoginState = this.checkLoginState.bind(this);
    this.tryingToLogIn = this.tryingToLogIn.bind(this);
    this.newUser = this.newUser.bind(this);
    this.createFakeAuthUser = this.createFakeAuthUser.bind(this);
    //state
    this.state = {
      loginState: 'logged-out',
      currentUser: null
    }
  }

///=== lifecycle methods
  componentDidMount() {
    console.log('mounted!');
  }

  componentDidUpdate() {
    console.log('updated!');
  }

///=== functions that just set login flow states
  tryingToLogIn() {
    this.setState({loginState: 'attempting'});
  }

  newUser() {
    this.setState({loginState: 'new'});
  }

///=== dealing with form submission
  getUser(e) {
    console.log(e);
  }

  formSubmitted(e) {
    e.preventDefault();
    const submittedName = e.target.name.value;
    const submittedKey = e.target.key.value;
    let loggingIn = [submittedName, submittedKey];
    console.log(loggingIn);
  }

  //-- new user post
  createFakeAuthUser(e, token) {
    e.preventDefault();
    let newName = e.target.username.value.toString().toLowerCase();
    const userObject = {
      name: newName,
      token: token,
      joinedOn: moment(),
      status: 'new'
    }
    fbaseAXIOS.post('/users.json', userObject)
      .then((res) => {
        let key = res.data.name;
        let newUserArray = [newName, token, res.data.name];
        this.setState({
          loginState: 'new-confirm',
          newuser: newUserArray })
      }).catch((err) => console.log(err));
  }

///=== helper
  generateFakeToken() {
    let a = Math.floor(Math.random() * 10000000);
    let b = a.toString();
    if (b.length < 7) {
      b = b + '0';
    }
    return b;
  }

  checkLoginState() {
    if (this.state.loginState === 'logged-out') {
      return (
        <button onClick={() => this.tryingToLogIn()}>Log in!</button>
      );
    } else if (this.state.loginState === 'attempting') {
      return (
        <div className='loginform'>
          <form name='fakeauth'>
            <input type='text' name='username' placeholder='Name' />
            <input type='number' name='key' placeholder='Key' />
            <input type='button' name='login-button' value='Log in!' onClick={(e) => this.formSubmitted(e)}/>
          </form>
          <p className='request-key'>Don't have a key? <span className='requestlink' onClick={() => this.newUser()}>Request one!</span></p>
        </div>
      );
    } else if (this.state.loginState === 'new') {
      const fakeToken = this.generateFakeToken();
      return (
        <div className='signup'>
          <form name='fakesignup' onSubmit={(e) => this.createFakeAuthUser(e, fakeToken)}>
            <label>Please enter your name or username.</label>
            <input type='text' name='username' placeholder='Name' />
            <label>Here is your seven-digit passcode. Please keep track of this passcode; it cannot be reset.</label>
            <p className='signup-token'>{fakeToken}</p>
            <p>There will be other stuff down here like selecting zip topics & so on</p>
            <button type='submit' name='signup-button'>Sign up!</button>
          </form>
          <h6>THIS IS NOT A SECURE SITE. DO NOT SUBMIT ANY SENSITIVE INFORMATION.</h6>
        </div>
      )
    } else if (this.state.loginState === 'new-confirm') {

    }
  }

  render() {
    return (
      <div className='auth'>
        {this.checkLoginState()}
      </div>
    )
  }
}

export default FakeAuth;
