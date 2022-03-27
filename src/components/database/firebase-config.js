// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from 'firebase/auth'
import { getDatabase } from "firebase/database";

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyDja3sXL47HlPsBAFsr3pipfFZjx84PsJg",
  authDomain: "personal-website-41281.firebaseapp.com",
  databaseURL: "https://personal-website-41281-default-rtdb.firebaseio.com",
  projectId: "personal-website-41281",
  storageBucket: "personal-website-41281.appspot.com",
  messagingSenderId: "833541186744",
  appId: "1:833541186744:web:751e56e03dfaf82d3a404d",
  measurementId: "G-PCWQG8EEDP"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const db = getDatabase(app);
export const auth = getAuth(app);