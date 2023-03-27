import { initializeApp } from 'firebase/app';
import { getFirestore } from 'firebase/firestore';
import {
  doc,
  getDoc,
  collection,
  query,
  where,
  getDocs,
} from 'firebase/firestore';

const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

const SuggestedWorkout = () => {
  db.collection('workouts')
    .orderBy('timestamp', 'desc')
    .limit(1)
    .get()
    .then((querySnapshot) => {
      querySnapshot.forEach((doc) => {
        console.log(doc.id, ' => ', doc.data());
      });
    })
    .catch((error) => {
      console.log('Error getting documents: ', error);
    });
};
