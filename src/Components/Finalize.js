import { useEffect, useState, useCallback } from 'react';
import { useSelector } from 'react-redux';
import { MdKeyboardDoubleArrowLeft } from 'react-icons/md';
import { FaUndo } from 'react-icons/fa';
import { Link } from 'react-router-dom';
import logo from '../logo/Fitbot2.png';
import Box from '@mui/material/Box';
import Skeleton from '@mui/material/Skeleton';
import { serverTimestamp } from 'firebase/firestore';
import { getAuth } from 'firebase/auth';
import { BeatLoader } from 'react-spinners';
import Account from './Account';
import { useAuth } from '../AuthContext';
import CustomTooltip from './Tooltip';
import { generateFinalWorkout, saveWorkout } from '../services/workouts';
import {
  cleanWorkoutLine,
  isWorkoutHeading,
} from '../utils/workoutFormatting';

const Finalize = () => {
  const exercises = useSelector((state) => state.exercises.exercises);
  const experience = useSelector((state) => state.intensity.experience);
  const intensity = useSelector((state) => state.intensity.intensity);

  const [duration, setDuration] = useState('');
  const [response, setResponse] = useState([]);
  const [finalized, setFinalized] = useState(false);
  const [loading, setLoading] = useState(false);
  const [savedLoading, setSavedLoading] = useState(false);
  const [saved, setSaved] = useState(false);
  const [error, setError] = useState('');

  const handleSubmit = async () => {
    setLoading(true);
    setFinalized(true);
    setError('');
    try {
      const workout = await generateFinalWorkout({
        exercises,
        experience,
        intensity,
        duration: Number(duration),
      });
      setResponse(workout);
    } catch (error) {
      console.error(error);
      setError(error.response?.data?.error || error.message || 'Unable to generate workout.');
      setResponse([]);
      setFinalized(false);
    } finally {
      setLoading(false);
    }
  };

  const myauth = getAuth();
  const user = useAuth();

  const handleSaveWorkout = async () => {
    setSavedLoading(true);
    try {
      await saveWorkout({
        userId: myauth.currentUser.uid,
        workout: response,
        date: serverTimestamp(),
      });
      setSaved(true);
    } catch (error) {
      console.error(error);
      setError(error.message || 'Unable to save workout.');
    } finally {
      setSavedLoading(false);
    }
  };

  const useMediaQuery = (width) => {
    const [targetReached, setTargetReached] = useState(false);

    const updateTarget = useCallback((e) => {
      if (e.matches) {
        setTargetReached(true);
      } else {
        setTargetReached(false);
      }
    }, []);

    useEffect(() => {
      const media = window.matchMedia(`(max-width: ${width}px)`);
      media.addListener(updateTarget);

      // Check on mount (callback is not called until a change occurs)
      if (media.matches) {
        setTargetReached(true);
      }

      return () => media.removeListener(updateTarget);
    }, [width, updateTarget]);

    return targetReached;
  };

  const isBreakpoint = useMediaQuery(600);

  return (
    <div className='finalizeContainer'>
      <div className='finalizeTransparentOverlay' />
      <h1 className='intesityTitle'>Finalize</h1>
      <Link className='cornerLogo' to='/'>
        <img width={70} src={logo} alt='FitBot' />
      </Link>
      {user.currentUser && (
        <div className='flex absolute top-6 right-6 z-20'>
          <Account />
        </div>
      )}
      <div className='finalizeResponseContainer'>
        {!isBreakpoint && (
          <Link to='/pickExercise'>
            <MdKeyboardDoubleArrowLeft
              className='leftArrowIntensity'
              color='black'
              size='70'
            />
          </Link>
        )}
        <div className='finalResponseDiv'>
          {error && (
            <div className='text-red-500 mt-2 p-2 border border-red-300 rounded'>
              {error}
            </div>
          )}
          {finalized ? (
            loading ? (
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
                <Skeleton
                  style={{
                    backgroundColor: '#a8ff3765',
                    margin: 15,
                    height: 40,
                  }}
                />
              </Box>
            ) : (
              <>
                <span
                  className='ml-3 mt-3 absolute'
                  onClick={() => setFinalized(false)}
                >
                  <FaUndo
                    className='hover:rotate-[-45deg] hover:scale-110 duration-150'
                    color='#2c63fc'
                    size='25'
                    onClick={() => setSaved(false)}
                  />
                </span>
                <div className='w-full flex justify-center'>
                  <div className='generatedResponse w-fit flex flex-col items-start'>
                    {response.map((part) => {
                      return part.split(':').map((item) => {
                        if (isWorkoutHeading(item)) {
                          return (
                            <div className='font-bold text-xl pt-6 text-center'>
                              {item}
                            </div>
                          );
                        } else {
                          return (
                            <li className='text-center'>
                              {cleanWorkoutLine(item)}
                            </li>
                          );
                        }
                      });
                    })}
                    {user.currentUser &&
                      (savedLoading ? (
                        <BeatLoader className='beatLoader' color='#2c63fc' />
                      ) : saved ? (
                        <h1 className='savedMessage'>Workout Saved!</h1>
                      ) : (
                        <div className='flex justify-center items-center'>
                          <span className='pickExerciseTitle flex items-center'>
                            <button
                              className='equipmentSkipButton'
                              onClick={handleSaveWorkout}
                            >
                              Save Workout
                            </button>
                            <CustomTooltip text='By saving this workout, you will have access to it on on your dashboard. You will also get a custom next workout suggestion on your dashboard' />
                          </span>
                        </div>
                      ))}
                  </div>
                </div>
              </>
            )
          ) : (
            <div className='flex flex-col justify-center items-center'>
              <div>
                <h2 className='title mt-5'>Your Excersises</h2>
                <div className='finalizeEquipmentDiv'>
                  {exercises.map((item, i) => {
                    return (
                      <p key={i} className='finalizeEquipmentItem'>
                        {item}
                      </p>
                    );
                  })}
                </div>
              </div>
              <div className='finalizeDurationContainer'>
                <div>
                  <input
                    className='finalizeDuration generatedResponse'
                    placeholder='duration . . .'
                    value={duration}
                    onChange={(e) => setDuration(e.target.value)}
                  ></input>
                  <span className='generatedResponse'>minutes</span>
                </div>
              </div>
              <button className='finalizeButton' onClick={handleSubmit}>
                Generate my Workout!
              </button>
            </div>
          )}
        </div>
        {isBreakpoint && (
          <Link to='/pickExercise'>
            <MdKeyboardDoubleArrowLeft
              className='finalizeLeftArrowIntensity '
              color='black'
              size='70'
            />
          </Link>
        )}
      </div>
    </div>
  );
};

export default Finalize;
