import React from 'react';
import moment from 'moment';
import axios from 'axios';
import fbaseAXIOS from './keys/key';

class FakeAuth extends React.Component {
  constructor() {
    super();
    //binds
    this.componentDidUpdate = this.componentDidUpdate.bind(this);
    this.shouldComponentUpdate = this.shouldComponentUpdate.bind(this);
    this.checkLoginState = this.checkLoginState.bind(this);
    this.tryingToLogIn = this.tryingToLogIn.bind(this);
    this.newUser = this.newUser.bind(this);
    this.createFakeAuthUser = this.createFakeAuthUser.bind(this);
    //state
    this.state = {
      loginState: 'logged-out',
      currentUser: null
    }
    //other
    this.userArray = []; // if this is in state we run into a componentDidUpdate loop
  }

///=== lifecycle methods
  componentDidMount() {
    console.log('mounted!');
  }

  shouldComponentUpdate() { // this is a bad fix and i shouldn't do it. the REAL fix is to put a lot of this stuff back into app.js :(
    if (this.state.loginState === 'logged-in') {
      return false;
    } else return true;
  }

  componentDidUpdate() {
    if (this.state.loginState === 'attempting') {
      fbaseAXIOS.get('/users/userarray.json')
        .then((res) => { this.userArray = res.data })
        .catch((err) => console.log(err));
    } else if (this.state.loginState === 'new-confirm') {
      this.userArray.push(this.state.newuser);
      fbaseAXIOS.patch('/users.json', {userarray: this.userArray})
        .then((res) => console.log(res))
        .catch((err) => console.log(err));
    } else {console.log('nothin we gotta do')}
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

  usersMap(usersArray, loggingIn) {
    for (let i = 0; i < usersArray.length; i++) {
      if (usersArray[i][0] === loggingIn[0] && usersArray[i][1] === loggingIn[1]) {
        return usersArray[i][2];
      }
    }
  }

  formSubmitted(e) {
    e.preventDefault();
    const submittedName = e.target.username.value;
    const submittedKey = e.target.key.value;
    let loggingIn = [submittedName, submittedKey];
    let uid = this.usersMap(this.userArray, loggingIn);
    console.log(loggingIn, this.userArray, uid);
    if (uid !== undefined) {
      this.setState({
        loginState: 'logged-in',
        uid: uid
      })
    } else {this.setState({loginState: 'established-fail'})}
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
        <div className='loginform' onSubmit={(e) => this.formSubmitted(e)}>
          <form name='fakeauth'>
            <input type='text' name='username' placeholder='Name' />
            <input type='number' name='key' placeholder='Key' />
            <button type='submit'>Log in!</button>
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
        return (
          <div className='welcome'>
            <p>Welcome {this.state.newuser[0]}! As a reminder, your passcode is {this.state.newuser[1]} - please remember it.</p>
          </div>
          )
    } else if (this.state.loginState === 'logged-in') {
      this.props.setUser(this.state.uid); // THIS IS BAD AND I SHOULDn'T DO IT
      return (
        <div className='dashboardlink'>
          <button className='dash' onClick={(e) => this.props.toDash(e)}>Go to dashboard!</button>
        </div>
        )
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
