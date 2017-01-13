import React, { Component } from 'react';
import axios from 'axios';
import moment from 'moment';
import firebase from 'firebase';
import firebaseSpecs from './components/key.js';
import './App.css';

class App extends Component {
  constructor() {
    super();
    this.componentDidMount = this.componentDidMount.bind(this);
  }

  componentDidMount() {
    firebase.auth();
  }

  render() {
    return (
      <div className="App">

      </div>
    );
  }
}

export default App;
