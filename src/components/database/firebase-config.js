import { initializeApp } from 'firebase/app';
import { getAuth } from 'firebase/auth'


const firebaseConfig = {
  apiKey: "AIzaSyDRly8mqyL8yMMM7mhiAEShdY2wB0nKaEg",
  authDomain: "enabling-effective-teams.firebaseapp.com",
  projectId: "enabling-effective-teams",
  storageBucket: "enabling-effective-teams.appspot.com",
  messagingSenderId: "136005129005",
  appId: "1:136005129005:web:2303d3cc406ffb28d439a4",
  measurementId: "G-Z29Q7DJTT8"
};

const app = initializeApp( firebaseConfig);
export const auth = getAuth(app);
