import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";

// Optionally import the services that you want to use
// import {...} from 'firebase/auth';
// import {...} from 'firebase/database';
// import {...} from 'firebase/firestore';
// import {...} from 'firebase/functions';
// import {...} from 'firebase/storage';

// Initialize Firebase
const firebaseConfig = {
  apiKey: "AIzaSyCwP43IvJDYqXvab7pia2arGNllrLFxl0E",
  authDomain: "skyprodapp.firebaseapp.com",
  projectId: "skyprodapp",
  storageBucket: "skyprodapp.firebasestorage.app",
  messagingSenderId: "885886202480",
  appId: "1:885886202480:web:b8745792a27f17f3f73ab5",
  measurementId: "G-4HJ1MV31BL"
};

export const FIREBASE_APP = initializeApp(firebaseConfig);
// For more information on how to access Firebase in your project,
// see the Firebase documentation: https://firebase.google.com/docs/web/setup#access-firebase
export const FIREBASE_AUTH = getAuth(FIREBASE_APP);
export const FIREBASE_FIRESTORE = getFirestore(FIREBASE_APP);
