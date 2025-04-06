// Import the functions you need from the SDKs you need
import { initializeApp } from 'firebase/app';
import { getAuth } from 'firebase/auth';
import { getFirestore } from 'firebase/firestore';

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: 'AIzaSyDGw3eBXGiNgxYsTQfvZTtk7eXLT2nSYn4',

  authDomain: 'police-app-49a92.firebaseapp.com',

  projectId: 'police-app-49a92',

  storageBucket: 'police-app-49a92.firebasestorage.app',

  messagingSenderId: '589907587879',

  appId: '1:589907587879:web:17916e2f50eadf130aef02',

  measurementId: 'G-KDT31W9ZNN',
};

// Initialize Firebase
export const FIREBASE_APP = initializeApp(firebaseConfig);
export const FIREBASE_AUTH = getAuth(FIREBASE_APP);
export const FIREBASE_DB = getFirestore(FIREBASE_APP);
