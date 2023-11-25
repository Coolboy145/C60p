import firebase from "firebase";

const firebaseConfig = {
    apiKey: "AIzaSyBqmOkCXOunHbydeJ15LPhote5O73WA7ZI",
    authDomain: "c60p-54af6.firebaseapp.com",
    projectId: "c60p-54af6",
    storageBucket: "c60p-54af6.appspot.com",
    messagingSenderId: "416767496458",
    appId: "1:416767496458:web:5701a7d4aded29499e6af3"
  };

  if(!firebase.apps.length){
    firebase.initalizeApp(firebaseConfig)
  }

  export default firebase.database()