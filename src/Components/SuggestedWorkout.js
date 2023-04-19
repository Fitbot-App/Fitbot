import {
  collection,
  query,
  where,
  getDocs,
  orderBy,
  addDoc,
} from 'firebase/firestore';
import { serverTimestamp } from 'firebase/firestore';
import { getAuth } from 'firebase/auth';
import { db } from '../firebase';
import { limit } from 'firebase/firestore';
import { useEffect, useState } from 'react';
import axios from 'axios';
import Box from '@mui/material/Box';
import Skeleton from '@mui/material/Skeleton';
import { BeatLoader } from 'react-spinners';
import host from '../utils/host';
import { useAuth } from '../AuthContext';
import CustomTooltip from './Tooltip';

const SuggestedWorkout = () => {
  const [suggestedWorkout, setSuggestedWorkout] = useState('');
  const [savedLoading, setSavedLoading] = useState(false);
  const [saved, setSaved] = useState(false);
  const [loading, setLoading] = useState(false);
  const [latestWorkout, setLatestWorkout] = useState('');
  const [recentDate, setRecentDate] = useState('');

  const myauth = useAuth();

  const handleSaveWorkout = async () => {
    setSavedLoading(true);
    setTimeout(() => {
      setSavedLoading(false);
      setSaved(true);
    }, 1500);
    await addDoc(collection(db, 'workouts'), {
      userId: myauth.currentUser.uid,
      workout: suggestedWorkout,
      date: serverTimestamp(),
    });
    getWorkout();
  };

  const getWorkout = async () => {
    setLoading(true);
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
      const date = querySnapshot.docs[0].data().date.toDate();
      setRecentDate(
        `${date.getMonth() + 1}/${date.getDate()}/${date.getFullYear()}`
      );
      setLatestWorkout(latestWorkout);
      const res = await axios.post(`${host}/api/openaiReq`, {
        prompt: `The response to the following question should be formated the same as the following: ${latestWorkout.join(
          ';'
        )}.Generate a new workout that exercises different muscle groups from the workout I did yesterday.
        For example, upper body exercises in yesterdays workout would require lower body exercises in the new workout, 
        and lower body exercises in yesterdays workout would require upper body exercises in the new workout. 
        Yesterdays workout was the following: ${latestWorkout.join(';')}. 
`,
      });
      let cleanedResponse = res.data.replace(/^\./, '');
      cleanedResponse = cleanedResponse.split(';');
      cleanedResponse = cleanedResponse.filter((el) => el !== '');
      setSuggestedWorkout(cleanedResponse);
    } catch (error) {
      console.error(error);
    }
    setLoading(false);
    setSaved(false);
  };

  useEffect(() => {
    getWorkout();
  }, []);

  return (
    <div className='dashboardWorkouts'>
      <div className='suggestedWorkoutDiv'>
        <h1 className='pickExerciseTitle generatedResponse'>
          {`Your Most Recent Workout (${recentDate})`}
        </h1>
        <div className='generatedResponse'>
          {latestWorkout &&
            latestWorkout.map((part) => {
              return part.split(':').map((item, i) => {
                if (item.includes('Warm-Up') || item.includes('Part')) {
                  return (
                    <div key={i} className='font-bold text-xl pt-6'>
                      {item}
                    </div>
                  );
                } else {
                  return <li key={i}>{item.replace(/\.$/, '')}</li>;
                }
              });
            })}
        </div>
      </div>
      <div className='suggestedWorkoutDiv'>
        <div className='suggestedWorkoutTitleButtonDiv'>
          <h1 className='pickExerciseTitle generatedResponse'>
            Next Suggested Workout
          </h1>
          <button className='regenerateWorkout' onClick={getWorkout}>
            Regenerate Workout
          </button>
        </div>
        {loading ? (
          <Box>
            <Skeleton
              style={{
                backgroundColor: '#a8ff3765',
                margin: 15,
                height: 40,
              }}
            />
            <Skeleton
              style={{
                backgroundColor: '#a8ff3765',
                margin: 15,
                height: 40,
              }}
            />
            <Skeleton
              style={{
                backgroundColor: '#a8ff3765',
                margin: 15,
                height: 40,
              }}
            />
            <Skeleton
              style={{
                backgroundColor: '#a8ff3765',
                margin: 15,
                height: 40,
              }}
            />
            <Skeleton
              style={{
                backgroundColor: '#a8ff3765',
                margin: 15,
                height: 40,
              }}
            />
            <Skeleton
              style={{
                backgroundColor: '#a8ff3765',
                margin: 15,
                height: 40,
              }}
            />
            <Skeleton
              style={{
                backgroundColor: '#a8ff3765',
                margin: 15,
                height: 40,
              }}
            />
            <Skeleton
              style={{
                backgroundColor: '#a8ff3765',
                margin: 15,
                height: 40,
              }}
            />
          </Box>
        ) : (
          <div className='generatedResponse'>
            {suggestedWorkout &&
              suggestedWorkout.map((part) => {
                return part.split(':').map((item, i) => {
                  if (item.includes('Warm-Up') || item.includes('Part')) {
                    return (
                      <div key={i} className='font-bold text-xl pt-6'>
                        {item}
                      </div>
                    );
                  } else {
                    return <li key={i}>{item.replace(/\.$/, '')}</li>;
                  }
                });
              })}
          </div>
        )}
        {!loading &&
          (savedLoading ? (
            <BeatLoader className='beatLoader' color='#2c63fc' />
          ) : saved ? (
            <h1 className='savedMessage'>Workout Saved!</h1>
          ) : (
            <div className='flex justify-start items-center'>
              <button
                className='equipmentSkipButton'
                onClick={handleSaveWorkout}
              >
                Save Workout
              </button>
              <CustomTooltip text='By saving this workout, you will have access to it on on your dashboard. You will also get a custom next workout suggestion here.' />
            </div>
          ))}
      </div>
    </div>
  );
};

export default SuggestedWorkout;
