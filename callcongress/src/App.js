import React, { Component } from 'react';
/// ==== LIBRARIES === ///
import axios from 'axios';
import moment from 'moment';
/// === COMPONENTS === ///
import Initial from './components/Initial';
import FakeAuth from './components/FakeAuth';
import Dashboard from './components/Dashboard';
/// === KEYS & APIS === ///
import fbaseAXIOS from './components/keys/key';
import sunlightAXIOS from './components/keys/sunlight';
import zipAXIOS from './components/keys/zip';
import newsAXIOS from './components/keys/news';
/// === STYLES === ///
import './App.css';





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
    this.setUser = this.setUser.bind(this);
    this.toDash = this.toDash.bind(this);

    ///== zip binds ==///
    this.getInput = this.getInput.bind(this);

    //== dash binds ==//
    this.userDetailsSubmit = this.userDetailsSubmit.bind(this);

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
  /// method to go to dashboard

  setUser(uid) {
    fbaseAXIOS.get(`/users/${uid}.json`)
      .then((res) => {
        this.setState({
          uid: uid,
          userData: res.data
        }); /// for some reason this sends fakeAuth in to a constant updating loop
        console.log(res);
      })
      .catch((err) => console.log(err));
  }

  toDash() {
    this.setState({pageType: 'dash'})
  }



  //// ===== INITIAL TO LOCATION SWITCH ==== ////
  getInput(e) {
    console.log(e);
  }

  //// ==== DASHBOARD METHODS ===== /////
  userDetailsSubmit(e) {
    e.preventDefault();
    ///setting form fields to variables
    let userZip = e.target.zip.value;
    let topicsString = e.target.topics.value;
    let topicsArray = topicsString.replace(/, /g, ',').split(',');
    /// adding form info to object
    let currentUser = {...this.state.userData};
    currentUser.zip = userZip;
    currentUser.topics = topicsArray;
    currentUser.status = 'established';
    /// doing stuff with our object
    fbaseAXIOS.patch(`/users.json`, {[this.state.uid]: currentUser})
      .then((res) => {
        this.setState({userData: currentUser}); /// could use res.data[this.state.uid] instead & get rid of some mess up top?
      })
      .catch((err) => console.log(err));
  }

  ///// ======= SETTING UP WHICH PAGE ==== /////
  renderPage() {
    if (this.state.pageType === 'initial') {
      // stuff goes here
      return <Initial getInput={this.getInput} />
    } else if (this.state.pageType === 'dash') {
      return <Dashboard
        user={this.state.userData}
        userDetailsSubmit={this.userDetailsSubmit}
        />
    }
  }

  render() {
     //// note: fakeauth still needs a prop
    return (
      <div className="App">
        <div className="container">
          <div className="fakelogin">
            <FakeAuth
              setUser={this.setUser}
              toDash={this.toDash} />
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
