import firebase from 'firebase/app';
import 'firebase/auth';


const firebaseConfig = {
  apiKey: "AIzaSyBvgtPfD7CXSarEf7yBFTlpZnUexLTsa2g",
  authDomain: "seconds-idea-training-dev.firebaseapp.com",
  projectId: "seconds-idea-training-dev",
  storageBucket: "seconds-idea-training-dev.appspot.com",
  messagingSenderId: "493615238687",
  appId: "1:493615238687:web:02c34a9e87b1b97c494f2a",
  measurementId: "G-JWECTHR6X3"
};

const firebaseConfig_prod = {
    apiKey: "AIzaSyBxHUBv7Wi7hvinZ2RCykrC6qp4hF8S9nw",
    authDomain: "seconds-idea-training-prod.firebaseapp.com",
    projectId: "seconds-idea-training-prod",
    storageBucket: "seconds-idea-training-prod.appspot.com",
    messagingSenderId: "382613776376",
    appId: "1:382613776376:web:dd693b5e1325d82ba8980d",
    measurementId: "G-Y20SV6YHL7"
  };


// Initialize Firebase
if (firebase.apps.length === 0) {
  switch (process.env.NEXT_PUBLIC_STAGE) {
    case 'dev':
      firebase.initializeApp(firebaseConfig);
      break;
    case 'prod':
      firebase.initializeApp(firebaseConfig_prod);
  }
}

export const auth = firebase.auth();
export const firebase_auth = firebase.auth;
export const googleAuthProvider = new firebase.auth.GoogleAuthProvider();
export const facebookAuthProvider = new firebase.auth.FacebookAuthProvider();
