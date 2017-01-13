import React, { Component } from 'react';
import axios from 'axios';
import moment from 'moment';
import firebase from 'firebase';
import firebaseSpecs from './components/key.js';
import './App.css';

//* setting API variables *//
const fbaseKey = firebaseSpecs.apiKey;
const fbaseUrl = firebaseSpecs.databaseURL;

class App extends Component {
  constructor() {
    super();
    //* binds *//
    this.componentDidMount = this.componentDidMount.bind(this);
    //this.renderLogin = this.renderLogin.bind(this);
    this.authenticate = this.authenticate.bind(this);
    this.testPost = this.testPost.bind(this);

    //* state *//
    this.state = {
      uid: null,
    }
  }

  componentDidMount() {

  }

  authenticate() {
    var provider = new firebase.auth.GithubAuthProvider();
    console.log(provider);
    firebase.auth().signInWithPopup(provider)
      .then((res) => {
        console.log(res);
        if (res.credential) {
          var token = res.credential.accessToken;
        }
        const user = axios.create({
          baseURL: fbaseUrl,
          withCredentials: true,
          headers: {
            Authorization: `Bearer ${token}`,
          }
        });
        this.setState({uid: res.user.uid, useraxios: user, token: token});
      }).catch((err) => {
        console.log(err.message);
      });
  }

  testPost() {
    this.state.useraxios.post(`/users.json`, { id: this.state.uid, joinedOn: moment() })
      .then((res) => console.log(res))
      .catch((err) => console.log(err.message));
  }

/*  createUser(id) {
    axios.post(`${fbaseURL}/users/${id}.json?apiKey=${}`)
  }*/

  renderLogin () {
    if (this.state.uid === null) {
      return (
        <nav className="login">
          <button className="github" onClick={() => this.authenticate()}>Log In with Github</button>
        </nav>
        )
    } else {
      console.log(this.state.uid);
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
