import React, { Component } from 'react';
/// ==== LIBRARIES === ///
import axios from 'axios';
import moment from 'moment';
import firebase from 'firebase';
/// === COMPONENTS === ///
import Initial from './components/Initial';
/// === KEYS === ///
import firebaseSpecs from './components/key.js';
/// === STYLES === ///
import './App.css';

/// === SETTING API THINGS === ///
const fbaseKey = firebaseSpecs.apiKey;
const fbaseUrl = firebaseSpecs.databaseURL;

/// === APP COMPONENT STARTS HERE === ///
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
      pageType: 'initial',
      uid: null,
    }
  }

  ///// ======== LIFECYCLE METHODS ======== /////

  componentDidMount() {

  }


  //// ======= AUTHENTICATION HELL ======== ///////

  authenticate() {
    var provider = new firebase.auth.GithubAuthProvider();
    console.log(provider);
    firebase.auth().signInWithPopup(provider)
      .then((res) => {
        console.log(res);
        if (res.credential) {
          var tokenFirst = res.credential.accessToken;
          console.log(tokenFirst);
          firebase.auth().currentUser.getToken(true).then((token) => {
           const user = axios.create({
              baseURL: `${fbaseUrl}`,
              headers: {Authorization: token}
            });
            this.setState({uid: res.user.uid, useraxios: user, token: token});
          });

      } else {console.log('no auth!')}
      }).catch((err) => {
        console.log(err.message);
      });
  }

  testPost() {
    let id = this.state.uid;
    console.log(this.state);
    this.state.useraxios.post(`/users/${id}/post.json`, { id: this.state.uid, joinedOn: moment() })
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

  ///// ======= SETTING UP WHICH PAGE ==== /////
  renderPage() {
    if (this.state.pageType === 'initial') {
      // stuff goes here
      return <Initial />
    }
  }

  render() {

    return (
      <div className="App">
        <div className="container">
          {this.renderLogin()}
          {this.renderPage()}
        </div>
      </div>
    );
  }
}

export default App;
