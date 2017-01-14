import React from 'react';

class FakeAuth extends React.Component {

  checkLoginState() {
    if (this.props.loginState === 'logged-out') {
      return (
        <button onClick={() => this.props.tryingToLogIn()}>Log in!</button>
      );
    } else if (this.props.loginState === 'attempting') {
      return (
        <div className='loginform'>
          <form name='fakeauth'>
            <input type='text' name='username' placeholder='Name' />
            <input type='number' name='key' placeholder='Key' />
            <input type='button' name='login-button' value='Log in!' onClick={(e) => this.props.formSubmitted(e.form)}/>
          </form>
          <p className='request-key'>Don't have a key? <span className='requestlink' onClick={() => this.props.newUser()}>Request one!</span></p>
        </div>
      );
    } else if (this.props.loginState === 'new') {
      const fakeToken = this.props.generateFakeToken();
      return (
        <div className='signup'>
          <form name='fakesignup' onSubmit={(e) => this.props.createFakeAuthUser(e, fakeToken)}>
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
