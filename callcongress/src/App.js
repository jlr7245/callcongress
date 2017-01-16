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
    this.changePage = this.changePage.bind(this);

    ///== zip binds ==///
    this.getInput = this.getInput.bind(this);

    //== dash binds ==//
    this.userDetailsSubmit = this.userDetailsSubmit.bind(this);
    this.editUser = this.editUser.bind(this);
    this.getBoth = this.getBoth.bind(this);

    //== event binds ==//
    this.addNewEvent = this.addNewEvent.bind(this);

    //* state *//
/*    this.state = { /// commented out for testing purposes
      pageType: 'initial',
      uid: null,
    }*/

    this.state = {
      pageType: 'dash',
      uid: '-KaYnwgAuJlqhwMF1djY',
      userData: {
        joinedOn: "2017-01-15T20:27:01.125Z",
        name: "jlr7245",
        status: "established",
        token: "5537083",
        topics: ["obamacare","lgbt","cory booker"],
        zip: "11727"
      },
      userArray: [["jsilv","5251551","-KaV5jTtVBcPRVYygFFF"],["test","5599173","-KaV5ueCj6gSf0MxY5j4"],["test2","3540463","-KaV68Kn2ekSI7_N3Pux"],["","2948282","-KaYjRvixWqvtni_f_g2"],["jsilv","8115959","-KaYjmVPgw9ZbwwA8laN"],["jessieriley","3011045","-KaYkpFXitYGSoM9eji5"],["jlr7245","5537083","-KaYnwgAuJlqhwMF1djY"],["jsilv","1994928","-KaYr5e4cJiwwUA21sTU"]]
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
        });
        console.log(res);
      })
      .catch((err) => console.log(err));
  }

  changePage(e, page) {
    console.log(page);
    if (this.state.pageType !== page) {
      this.setState({pageType: page});
    }
  }



  //// ===== INITIAL TO LOCATION SWITCH ==== ////
  getInput(e) {
    console.log(e);
  }

  //// ==== DASHBOARD METHODS ===== /////
  getSurroundingZips(i) {
    return zipAXIOS.get(`radius.json/${i}/30/mile?minimal`);
  }

  getLocationSenators(i) {
    return sunlightAXIOS.get(`legislators/locate?zip=${i}`);
  }

  getBoth(i, user) {
    axios.all([this.getSurroundingZips(i), this.getLocationSenators(i)])
      .then(axios.spread((zips, sens) => {
        console.log(zips.data.zip_codes);
        console.log(sens.data.results);
      }));
  }

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
        this.setState({userData: currentUser});
      })
      .catch((err) => console.log(err));
  }

  editUser(e) {
    let userEditing = {...this.state.userData};
    userEditing.status = 'editing';
    this.setState({userData: userEditing});
  }

  ////=== EVENT METHODS ===////
  addNewEvent(e) {
    e.preventDefault();
    let data = e.target;
    let date = data.date.value+'T'+data.time.value+':00.000';
    let formInput = {
      name: data.name.value,
      type: data.type.value,
      date: date,
      description: data.description.value,
      address: data.addr.value,
      city: data.city.value,
      state: data.state.value,
      zip: data.zip.value,
      belongsTo: this.state.uid
    };
    fbaseAXIOS.post('/events.json', formInput)
      .then((res) => {
        console.log(res);
        this.setState({eventsInArea: [formInput]});
      })
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
        editUser={this.editUser}
        addNewEvent={this.addNewEvent}
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
              changePage={this.changePage}
               />
          </div>
          <div className="pagecontainer">
            {this.renderPage()}
          </div>
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
