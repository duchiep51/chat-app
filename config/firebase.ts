// Import the functions you need from the SDKs you need
import { getApp, getApps, initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getAuth, GoogleAuthProvider } from "firebase/auth";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyDyH2B7B0wlIecB6wFU7XFe8SPABSlB6VU",
  authDomain: "chat-app-dbc32.firebaseapp.com",
  projectId: "chat-app-dbc32",
  storageBucket: "chat-app-dbc32.appspot.com",
  messagingSenderId: "488545350558",
  appId: "1:488545350558:web:3b03482b2c1f0ee1c99c8f",
};

// Initialize Firebase
const app = getApps().length ? getApp() : initializeApp(firebaseConfig);

const db = getFirestore(app);

const auth = getAuth(app);

const provider = new GoogleAuthProvider();

export { db, auth, provider };
