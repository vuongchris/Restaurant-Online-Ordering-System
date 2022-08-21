import { initializeApp } from 'firebase/app';
import { getAuth } from 'firebase/auth';
import { getFirestore } from 'firebase/firestore';

const firebaseConfig = {
  apiKey: 'AIzaSyCHwtyPFi90gGu4B3ByJpZb3Eao-gIlohs',
  authDomain: 'restaurant-online-ordering-sys.firebaseapp.com',
  projectId: 'restaurant-online-ordering-sys',
  storageBucket: 'restaurant-online-ordering-sys.appspot.com',
  messagingSenderId: '270718678092',
  appId: '1:270718678092:web:763a6f77e1c202eb8370e9',
  measurementId: 'G-8Q39B5QHK2',
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

// Firebase Auth
export const auth = getAuth(app);

// Firestore Database
export const db = getFirestore(app);
