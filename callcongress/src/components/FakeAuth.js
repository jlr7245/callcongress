import React from 'react';
import moment from 'moment';
import fbaseAXIOS from './keys/key';


class FakeAuth extends React.Component {
  constructor() {
    super();
    //binds
    this.componentDidUpdate = this.componentDidUpdate.bind(this);
    this.checkLoginState = this.checkLoginState.bind(this);
    this.tryingToLogIn = this.tryingToLogIn.bind(this);
    this.newUser = this.newUser.bind(this);
    this.createFakeAuthUser = this.createFakeAuthUser.bind(this);
    this.closePanel = this.closePanel.bind(this);
    //state
    this.state = {
      loginState: 'logged-out',
      currentUser: null
    }
/*    this.state = {
      loginState: 'logged-in',
      currentUser: '-KaYnwgAuJlqhwMF1djY'
    }*/
    //other
    this.userArray = []; // if this is in state we run into a componentDidUpdate loop
  }

///=== lifecycle methods
  componentDidMount() {
    console.log('mounted!');
  }

  componentDidUpdate() {
    if (this.state.loginState === 'attempting') {
      fbaseAXIOS.get('/users/userarray.json')
        .then((res) => {
          console.log(res);
          this.userArray = res.data;
          console.log(res.data);
        })
        .catch((err) => console.log(err));
    } else if (this.state.loginState === 'new-confirm') {
      (this.userArray !== undefined && this.userArray !== null) ? this.userArray.push(this.state.newuser) : this.userArray = [this.state.newuser];
      fbaseAXIOS.put('/users/userarray.json', this.userArray)
        .then((res) => console.log(res))
        .catch((err) => console.log(err));
      this.setState({loginState: 'logged-in'});
      this.props.setUser(this.state.uid);
    } else if (this.state.loginState === 'established-confirm') {
      this.props.setUser(this.state.uid);
      this.setState({loginState: 'logged-in'}); /// SEEMS TO WORK? but is it best practice
    }
  }

///=== functions that just set login flow states
  tryingToLogIn() {
    this.setState({loginState: 'attempting'});
  }

  newUser() {
    this.setState({loginState: 'new'});
  }

  closePanel() {
    this.setState({loginState: 'logged-out'})
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
    if (uid !== undefined) {
      this.setState({
        loginState: 'established-confirm',
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
          newuser: newUserArray,
          uid: key })
      }).catch((err) => console.log(err));
  }

///=== helper
  generateFakeToken() {
    let a = Math.floor(Math.random() * 10000000);
    let b = a.toString();
    if (b.length < 7) {
      b+='0';
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
            <input type='text' required name='username' placeholder='Name' />
            <input type='number' required name='key' placeholder='Key' />
            <button type='submit'>Log in!</button>
          </form>
          <p className='request-key'>Don't have a key? <span className='requestlink' onClick={() => this.newUser()}>Request one!</span></p>
          <button className='close' onClick={() => this.closePanel()}>
            <i className='fa fa-times fa-1x ltg'></i>
          </button>
        </div>
      );
    } else if (this.state.loginState === 'new') {
      const fakeToken = this.generateFakeToken();
      return (
        <div className='signup'>
          <form name='fakesignup' onSubmit={(e) => this.createFakeAuthUser(e, fakeToken)}>
            <label>Please enter your name or username.</label>
            <input type='text' name='username' required placeholder='Name' />
            <label>Here is your seven-digit passcode.</label>
            <p className='signup-token'>{fakeToken}</p>
            <label>Please remember this passcode! It cannot be reset.</label>
            <button type='submit' name='signup-button'>Sign up!</button>
          </form>
          <h6 className='rd'>This is not a secure site. DO NOT submit any sensitive information.</h6>
          <button className='close' onClick={() => this.closePanel()}>
            <i className='fa fa-times fa-1x ltg'></i>
          </button>
        </div>
      )
    } else if (this.state.loginState === 'logged-in') {
      return (
        <nav>
          <button className='home' onClick={(e) => this.props.changePage(e, 'initial')}><i className='fa fa-home fa-2x'></i></button>
          <button className='dash' onClick={(e) => this.props.changePage(e, 'dash')}>Dashboard</button>
        </nav>
        )
    } else if (this.state.loginState === 'established-fail') {
      return (
        <div className='oops'>
          <h3 className='rd'>Oh no!</h3>
          <p>We couldn't find you.</p>
          <button onClick={() => this.tryingToLogIn()}>Click here to try again.</button>
          <button className='close' onClick={() => this.closePanel()}>
            <i className='fa fa-times fa-1x ltg'></i>
          </button>
        </div>
        )
    }
  }

  render() {
    return (
      <div className='auth'>
        <div className={this.state.loginState}>
          {this.checkLoginState()}
        </div>
      </div>
    )
  }
}

export default FakeAuth;
