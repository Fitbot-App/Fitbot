// Import the functions you need from the SDKs you need
//import { getAnalytics } from 'firebase/analytics';
import { initializeApp } from 'firebase/app';
import { getFirestore } from 'firebase/firestore';
import { getAuth, GoogleAuthProvider } from 'firebase/auth';
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: 'AIzaSyDmlxQbbmPsZdj-5HYQ-R1elV65Xr99-rI',
  authDomain: 'fitbot-3f3df.firebaseapp.com',
  projectId: 'fitbot-3f3df',
  storageBucket: 'fitbot-3f3df.appspot.com',
  messagingSenderId: '904321314848',
  appId: '1:904321314848:web:84fa932d0584ccae4d4c45',
  measurementId: 'G-8ZRZSGY7GN',
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

//const analytics = getAnalytics(app);

const db = getFirestore(app);
const auth = getAuth(app);
const provider = new GoogleAuthProvider();

export { db, auth, provider };
