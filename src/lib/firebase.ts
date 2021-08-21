import firebase from 'firebase/app';
import 'firebase/auth';

const firebaseConfig = {
  apiKey: "AIzaSyA0L6p6wGoC_5NgmC0eJnkmf2jWBW_O_jI",
  authDomain: "easyfit-49246.firebaseapp.com",
  projectId: "easyfit-49246",
  storageBucket: "easyfit-49246.appspot.com",
  messagingSenderId: "62302044903",
  appId: "1:62302044903:web:3e0fe654c1dd2e5c0f9842"
};

if (!firebase.apps.length) {
  firebase.initializeApp(firebaseConfig);
}

export const auth = firebase.auth();
export const googleAuthProvider = new firebase.auth.GoogleAuthProvider();