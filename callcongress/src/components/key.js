import firebase from 'firebase';

var firebaseSpecs = {
  apiKey: "AIzaSyBxL2dzJI1BH8RKwLDZF0rTVfeDcVlTnyk",
  authDomain: "callcongress1.firebaseapp.com",
  databaseURL: "https://callcongress1.firebaseio.com",
  storageBucket: "callcongress1.appspot.com",
  messagingSenderId: "484875231556"
};

firebase.initializeApp(firebaseSpecs);

export default firebaseSpecs;
