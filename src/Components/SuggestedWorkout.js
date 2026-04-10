import { serverTimestamp } from 'firebase/firestore';
import { useCallback, useEffect, useState } from 'react';
import Box from '@mui/material/Box';
import Skeleton from '@mui/material/Skeleton';
import { BeatLoader } from 'react-spinners';
import { useAuth } from '../AuthContext';
import CustomTooltip from './Tooltip';
import {
  generateSuggestedWorkout,
  getLatestWorkout,
  saveWorkout,
} from '../services/workouts';
import {
  cleanWorkoutLine,
  isWorkoutHeading,
} from '../utils/workoutFormatting';

const SuggestedWorkout = () => {
  const [suggestedWorkout, setSuggestedWorkout] = useState([]);
  const [savedLoading, setSavedLoading] = useState(false);
  const [saved, setSaved] = useState(false);
  const [loading, setLoading] = useState(false);
  const [latestWorkout, setLatestWorkout] = useState([]);
  const [recentDate, setRecentDate] = useState('');
  const [error, setError] = useState('');

  const myauth = useAuth();
  const userId = myauth.currentUser?.uid;

  const handleSaveWorkout = async () => {
    setSavedLoading(true);
    try {
      await saveWorkout({
        userId: myauth.currentUser.uid,
        workout: suggestedWorkout,
        date: serverTimestamp(),
      });
      setSaved(true);
      await getWorkout();
    } catch (error) {
      console.error(error);
      setError(error.message || 'Unable to save workout.');
    } finally {
      setSavedLoading(false);
    }
  };

  const getWorkout = useCallback(async () => {
    setLoading(true);
    setError('');

    try {
      if (!userId) {
        setLatestWorkout([]);
        setSuggestedWorkout([]);
        setRecentDate('');
        return;
      }

      const latest = await getLatestWorkout(userId);

      if (!latest) {
        setLatestWorkout([]);
        setSuggestedWorkout([]);
        setRecentDate('');
        return;
      }

      setRecentDate(latest.recentDate);
      setLatestWorkout(latest.workout);
      const nextWorkout = await generateSuggestedWorkout(latest.workout);
      setSuggestedWorkout(nextWorkout);
    } catch (error) {
      console.error(error);
      setError(error.message || 'Unable to load suggested workout.');
    } finally {
      setLoading(false);
      setSaved(false);
    }
  }, [userId]);

  useEffect(() => {
    getWorkout();
  }, [getWorkout]);

  return (
    <div className='dashboardWorkouts'>
      <div className='suggestedWorkoutDiv'>
        <h1 className='pickExerciseTitle generatedResponse'>
          {`Your Most Recent Workout (${recentDate})`}
        </h1>
        {error && (
          <div className='text-red-500 mt-2 p-2 border border-red-300 rounded'>
            {error}
          </div>
        )}
        <div className='generatedResponse'>
          {latestWorkout &&
            latestWorkout.map((part) => {
              return part.split(':').map((item, i) => {
                if (isWorkoutHeading(item)) {
                  return (
                    <div key={i} className='font-bold text-xl pt-6'>
                      {item}
                    </div>
                  );
                } else {
                  return <li key={i}>{cleanWorkoutLine(item)}</li>;
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
                  if (isWorkoutHeading(item)) {
                    return (
                      <div key={i} className='font-bold text-xl pt-6'>
                        {item}
                      </div>
                    );
                  } else {
                    return <li key={i}>{cleanWorkoutLine(item)}</li>;
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
