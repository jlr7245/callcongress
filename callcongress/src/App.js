import React, { Component } from 'react';
import axios from 'axios';
import moment from 'moment';
import firebase from 'firebase';
import firebaseSpecs from './components/key.js';
import './App.css';

class App extends Component {
  constructor() {
    super();
    //* binds *//
    this.componentDidMount = this.componentDidMount.bind(this);
    this.renderLogin = this.renderLogin.bind(this);
    this.authenticate = this.authenticate.bind(this);

    //* state *//
    this.state = {
      uid: null,
    }
  }

  componentDidMount() {

  }

  authenticate() {
    var provider = new firebase.auth.GithubAuthProvider();
    firebase.auth().signInWithPopup(provider)
      .then((res) => {
        if (res.credential) {
          var token = res.credential.accessToken;
        }
        var user = res.user;
        this.setState({uid: user})
      }).catch((err) => {
        console.log(err.message);
      });
  }

  renderLogin () {
    if (this.state.uid === null) {
      return (
        <nav className="login">
          <button className="github" onClick={() => this.authenticate('github')}>Log In with Github</button>
        </nav>
        )
    } else {
      return (<p>You are logged in!</p>)
    }
  }

  render() {
    return (
      <div className="App">
          {this.renderLogin()}
      </div>
    );
  }
}

export default App;
