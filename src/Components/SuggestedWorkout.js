import { collection, query, where, getDocs, orderBy } from 'firebase/firestore';
import { getAuth } from 'firebase/auth';
import { db } from '../firebase';
import { limit } from 'firebase/firestore';
import { useEffect, useState } from 'react';
import axios from 'axios';
import GenerateWorkout from './GenerateWorkout';

const SuggestedWorkout = () => {
  const [suggestedWorkout, setSuggestedWorkout] = useState('');
  const [latestWorkout, setLatestWorkout] = useState('');

  const getWorkout = async () => {
    const myauth = getAuth();
    const q = query(
      collection(db, 'workouts'),
      where('userId', '==', myauth.currentUser.uid),
      orderBy('date', 'desc'),
      limit(1)
    );

    try {
      const querySnapshot = await getDocs(q);
      const latestWorkout = querySnapshot.docs[0].data().workout;
      setLatestWorkout(latestWorkout);
      const res = await axios.post('http://localhost:3001/suggestedWorkout', {
        prompt: `Generate a new workout that exercises different muscle groups from the workout I did yesterday.
        For example, upper body exercises in yesterdays workout would require lower body exercises in the new workout, 
        and lower body exercises in yesterdays workout would require upper body exercises in the new workout. 
        Yesterdays workout was the following: ${latestWorkout.join(
          ';'
        )}. Here's an example of how the response should be formated - 
        Warm-Up: exercise (sets x reps); exercise (sets x reps); exercise (sets x reps); 
        Part-1: exercise (sets x reps); exercise (sets x reps); exercise (sets x reps); 
        Part-2: exercise (sets x reps); exercise (sets x reps); exercise (sets x reps);  
        Part-3: exercise (sets x reps); exercise (sets x reps); exercise (sets x reps);
`,
      });
      let cleanedResponse = res.data.replace(/^\./, '');
      cleanedResponse = cleanedResponse.split(';');
      cleanedResponse = cleanedResponse.filter((el) => el !== '');
      setSuggestedWorkout(cleanedResponse);
      console.log(suggestedWorkout);
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    getWorkout();
    console.log('USE EFFECT RAN');
  }, []);

  return (
    <div className='flex'>
      <div className='finalResponseDiv'>
        <h1 className='pickExerciseTitle generatedResponse'>
          Yesterdays Workout
        </h1>
        <div className='generatedResponse'>
          {latestWorkout &&
            latestWorkout.map((part) => {
              return part.split(':').map((item) => {
                if (item.includes('Warm-Up') || item.includes('Part')) {
                  return <div className='font-bold text-xl pt-6'>{item}</div>;
                } else {
                  return <li>{item}</li>;
                }
              });
            })}
        </div>
      </div>
      <div className='finalResponseDiv'>
        <div className='flex'>
          <h1 className='pickExerciseTitle generatedResponse'>
            Suggested Workout
          </h1>

          <button className='equipmentSkipButton' onClick={getWorkout}>
            Regenerate Workout
          </button>
        </div>
        <div className='generatedResponse'>
          {suggestedWorkout &&
            suggestedWorkout.map((part) => {
              return part.split(':').map((item) => {
                if (item.includes('Warm-Up') || item.includes('Part')) {
                  return <div className='font-bold text-xl pt-6'>{item}</div>;
                } else {
                  return <li>{item}</li>;
                }
              });
            })}
        </div>
      </div>
    </div>
  );
};

export default SuggestedWorkout;
