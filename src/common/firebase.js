import firebase from 'firebase';

firebase.initializeApp({
  apiKey: "AIzaSyAKZOAZNymyQKxT6KyigRNtqS6vS6PV1Gs",
  authDomain: "priority-e6356.firebaseapp.com",
  databaseURL: "https://priority-e6356.firebaseio.com",
  storageBucket: "priority-e6356.appspot.com",
  messagingSenderId: "508701423635"
});

var FBref = firebase.database().ref('/');

export default FBref;
