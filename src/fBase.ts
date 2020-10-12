import * as firebase from 'firebase/app';
import "firebase/firestore";
import 'firebase/auth';

const firebaseConfig = {
  apiKey: process.env.REACT_APP_API_KEY,
  // authDomain: process.env.AUTH_DOMAIN,
  authDomain: "ntwitter-123d9.firebaseapp.com",
  databaseURL: process.env.DATABASE_URL,
  // projectId: process.env.PROJECT_ID,
  projectId: 'ntwitter-123d9',
  storageBucket: process.env.STORAGE_BUCKET,
  messagingSenderId: process.env.MESSAGIN_ID,
  appId: process.env.APP_ID
};

export default firebase.initializeApp(firebaseConfig);

export const firebaseInstance = firebase;

export const authService = firebase.auth();
export const dbService = firebase.firestore();