// Import the functions you need from the SDKs you need
import * as firebase from "firebase";

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyB7j33E1O2i35fKt9lfEUwXqEM-imJcBNI",
  authDomain: "sqrface-1b85e.firebaseapp.com",
  projectId: "sqrface-1b85e",
  storageBucket: "sqrface-1b85e.appspot.com",
  messagingSenderId: "912145851533",
  appId: "1:912145851533:web:dbd527e1963cdf67a62ec4",
  measurementId: "G-PK345MXN1E"
};

// Initialize Firebase
let app;
if (firebase.apps.length === 0) {
  app = firebase.initializeApp(firebaseConfig);
} else {
  app = firebase.app()
}

const auth = firebase.auth()
const db = firebase.database(app)

export { auth, db };