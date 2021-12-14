/* eslint-disable import/no-anonymous-default-export */
import { initializeApp } from 'firebase/app';
import { getFirestore, collection, addDoc, getDocs  } from "firebase/firestore";
import { 
    getAuth,
    signOut,
    signInWithPopup,
    GoogleAuthProvider, 
    FacebookAuthProvider,
    OAuthProvider 
} from "firebase/auth"
import 'firebase/firestore';
import 'firebase/auth';

const firebaseConfig = {
    apiKey: process.env.REACT_APP_API_KEY,
    authDomain: process.env.REACT_APP_AUTH_DOMAIN,
    projectId: process.env.REACT_APP_PROJECT_ID,
    storageBucket: process.env.REACT_APP_STORAGE_BUCKET,
    messagingSenderId: process.env.REACT_APP_MESSAGING_SENDER_ID,
    appId: process.env.REACT_APP_APP_ID
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const db = getFirestore();
const auth = getAuth();
const googleAuthProvider = new GoogleAuthProvider();
const facebookAuthProvider = new FacebookAuthProvider();
const microsoftAuthProvider = new OAuthProvider('microsoft.com');

export {
    firebaseConfig,
    app,
    db,
    collection, 
    addDoc, 
    getDocs,
    auth,
    signOut,
    signInWithPopup,
    googleAuthProvider,
    facebookAuthProvider,
    microsoftAuthProvider
};