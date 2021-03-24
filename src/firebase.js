import firebase from 'firebase'

const config = {
       apiKey: "AIzaSyDIiKlqZa599ebm6GVLxZ34N_cjAi6lkD0",
  authDomain: "bashkbano-29572.firebaseapp.com",
  projectId: "bashkbano-29572",
  storageBucket: "bashkbano-29572.appspot.com",
  messagingSenderId: "908059865085",
  appId: "1:908059865085:web:adc56a10a679b36f6db394",
  measurementId: "G-FPLD3YGJ4V"
}

const firebaseApp = firebase.initializeApp(config);

const db = firebaseApp.firestore();
const auth = firebase.auth();
const storage = firebase.storage();

export {db,auth,storage};
