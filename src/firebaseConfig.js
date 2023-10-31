import { initializeApp } from 'firebase/app';
// import { getAnalytics } from "firebase/analytics";
import { getFirestore } from 'firebase/firestore';

import 'firebase/auth';

const firebaseConfig = {
  apiKey: "AIzaSyCeIC47lmQqlGIwADDRqt5E-Jn-g8WaSCQ",
  authDomain: "geochat-1337.firebaseapp.com",
  projectId: "geochat-1337",
  storageBucket: "geochat-1337.appspot.com",
  messagingSenderId: "547130567847",
  appId: "1:547130567847:web:a31dc91a10db14b5a83f82",
  measurementId: "G-6PBGCMG8NL"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const db = getFirestore(app);
// const analytics = getAnalytics(app);

export { app, db };