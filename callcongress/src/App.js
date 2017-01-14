import React, { Component } from 'react';
/// ==== LIBRARIES === ///
import axios from 'axios';
import moment from 'moment';
import firebase from 'firebase';
/// === COMPONENTS === ///
import Initial from './components/Initial';
import FakeAuth from './components/FakeAuth';
/// === KEYS & APIS === ///
import firebaseSpecs from './components/keys/key';
import sunlightAXIOS from './components/keys/sunlight';
import zipAXIOS from './components/keys/zip';
import newsAXIOS from './components/keys/news';
/// === STYLES === ///
import './App.css';

/// === SETTING API THINGS === ///
const fbaseKey = firebaseSpecs.apiKey;
const fbaseUrl = firebaseSpecs.databaseURL;

const fbaseAXIOS = axios.create({
  baseURL: fbaseUrl
});

/// === APP COMPONENT STARTS HERE === ///
class App extends Component {
  constructor() {
    super();
    //* binds *//
    this.componentDidMount = this.componentDidMount.bind(this);
    //===initial auth attempt===//
    //this.renderLogin = this.renderLogin.bind(this);
    //this.authenticate = this.authenticate.bind(this);
    //this.testPost = this.testPost.bind(this);

    //==fake auth==//
    // !!!! still a method that goes here

    ///== zip binds ==///
    this.getInput = this.getInput.bind(this);

    //* state *//
    this.state = {
      pageType: 'initial',
      uid: null,
    }
  }

  ///// ======== LIFECYCLE METHODS ======== /////

  componentDidMount() {

  }






  //// ==== NOT REAL AUTHENTICATION BUT HEY ==== ///

  /// method to set the state to the current UID



  //// ===== INITIAL TO LOCATION SWITCH ==== ////
  getInput(e) {
    console.log(e);
  }

  ///// ======= SETTING UP WHICH PAGE ==== /////
  renderPage() {
    if (this.state.pageType === 'initial') {
      // stuff goes here
      return <Initial getInput={this.getInput} />
    }
  }

  render() {
     //// note: fakeauth still needs a prop
    return (
      <div className="App">
        <div className="container">
          <div className="fakelogin">
            <FakeAuth />
          </div>
          {this.renderPage()}
        </div>
      </div>
    );
  }
}

export default App;



  //// ======= AUTHENTICATION HELL ======== ///////

  /*authenticate() {
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
  }

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
  }*/
