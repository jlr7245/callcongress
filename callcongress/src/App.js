import React, { Component } from 'react';
/// ==== LIBRARIES === ///
//import axios from 'axios';
//import moment from 'moment';
/// === COMPONENTS === ///
import Initial from './components/Initial';
import FakeAuth from './components/FakeAuth';
import Dashboard from './components/Dashboard';
import Results from './components/Results';
/// === KEYS & APIS === ///
import fbaseAXIOS from './components/keys/key';
import sunlightAXIOS from './components/keys/sunlight';
import zipAXIOS from './components/keys/zip';
//import newsAXIOS from './components/keys/news';
/// === STYLES === ///
import './App.css';





/// === APP COMPONENT STARTS HERE === ///
class App extends Component {
  constructor() {
    super();
    //* binds *//
    this.componentDidMount = this.componentDidMount.bind(this);
    this.componentDidUpdate = this.componentDidUpdate.bind(this);


    //==fake auth==//
    this.setUser = this.setUser.bind(this);
    this.changePage = this.changePage.bind(this);

    ///== zip binds ==///
    this.getInput = this.getInput.bind(this);

    //== dash binds ==//
    this.userDetailsSubmit = this.userDetailsSubmit.bind(this);
    this.editUser = this.editUser.bind(this);
//    this.getBoth = this.getBoth.bind(this);
    this.getLocationSenators = this.getLocationSenators.bind(this);

    //== event binds ==//
    this.addNewEvent = this.addNewEvent.bind(this);
    this.editEvent = this.editEvent.bind(this);
    this.saveEventEdit = this.saveEventEdit.bind(this);
    this.deleteEvent = this.deleteEvent.bind(this);

    //* state *//
    this.state = {
      pageType: 'initial',
      uid: null,
      allevents: [],
      eventEdited: null
    }
  }

  ///// ======== LIFECYCLE METHODS ======== /////

  componentDidMount() {
    fbaseAXIOS.get(`/events.json`)
      .then((res) => {
        let theEvents = Object.keys(res.data).map((i) => {
          res.data[i].key = i;
          return res.data[i];
        })
        this.setState({allevents: theEvents})
      })
  }

  componentDidUpdate() {
    if (this.state.justUpdated) {
      fbaseAXIOS.put(`/users/${this.state.uid}.json`, this.state.userData)
      .then((res) => {
        console.log(res);
      })
      .catch((err) => console.log(err));
    }
    if (this.state.newEvent) {
      fbaseAXIOS.get(`/events.json`)
      .then((res) => {
        let theEvents = Object.keys(res.data).map((i) => {
          res.data[i].key = i;
          return res.data[i];
        })
        this.setState({allevents: theEvents,
          newEvent: false})
      })
    }
  }



  //// ==== NOT REAL AUTHENTICATION BUT HEY ==== ///



  setUser(uid) {
    fbaseAXIOS.get(`/users/${uid}.json`)
      .then((res) => {
        this.setState({
          uid: uid,
          userData: res.data,
          justLoggedIn: true
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



  //// ===== INITIAL TO RESULTS SWITCH ==== ////
  getInput(e) {
    e.preventDefault();
    let searchedZip = e.target.zip.value;
    sunlightAXIOS.get(`legislators/locate?zip=${searchedZip}`)
      .then((res) => {
        let legIdArray = res.data.results.map((res) => {
          return res.bioguide_id;
        });
        this.setState({
          zipToWatch: searchedZip,
          legsToRender: legIdArray,
          pageType: 'results'
        })
      });
    }

  //// ==== DASHBOARD METHODS ===== /////
/*  getSurroundingZips(i) {
    return zipAXIOS.get(`radius.json/${i}/30/mile?minimal`);
  }*/

  getLocationSenators(i, user) {
    sunlightAXIOS.get(`legislators/locate?zip=${i}`)
      .then((res) => {
        let senIdArray = res.data.results.map((res) => {
          return res.bioguide_id;
        });
        user.watching = senIdArray;
        //user.surrounding = zips.data.zip_codes;
        this.setState({
          userData: user,
          justUpdated: true,
        })
      });
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
    this.getLocationSenators(userZip, currentUser);
    /// doing stuff with our object
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
        this.setState({newEvent: true});
      })
    e.target.reset();
  }

  saveEventEdit(e, key) {
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
    fbaseAXIOS.put(`/events/${key}.json`, formInput)
      .then((res) => {
        this.setState({newEvent: true,
          eventEdited: null});
      })
    e.target.reset();
  }

  editEvent(e, key) {
    console.log(e, key);
    this.setState({eventEdited: key});
  }

  deleteEvent(e, key) {
    fbaseAXIOS.delete(`/events/${key}.json`)
      .then((res) => {
        this.setState({newEvent: true})
      });
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
        uid={this.state.uid}
        allevents={this.state.allevents}
        editEvent={this.editEvent}
        deleteEvent={this.deleteEvent}
        eventEdited={this.state.eventEdited}
        saveEventEdit={this.saveEventEdit}
        />
    } else if (this.state.pageType === 'results') {
      return <Results
        zip={this.state.zipToWatch}
        legislatorsToLoad={this.state.legsToRender} />
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


