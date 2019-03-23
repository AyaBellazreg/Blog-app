import firebase from 'firebase/app'
import 'firebase/auth'
import 'firebase/firestore'

// Initialize Firebase
var config = {
        apiKey: "Your API key",
        authDomain: "project-management-45cc6.firebaseapp.com",
        databaseURL: "https://project-management-45cc6.firebaseio.com",
        projectId: "project-management-45cc6",
        storageBucket: "",
        messagingSenderId: "954919838313"
  };

  firebase.initializeApp(config);
  firebase.firestore().settings({ timestampsInSnapshots: true });

  export default firebase;
