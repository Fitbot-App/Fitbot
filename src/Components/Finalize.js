import React, { useState } from 'react';
import { useSelector } from 'react-redux';
import { MdKeyboardDoubleArrowLeft } from 'react-icons/md';
import { Link } from 'react-router-dom';
import logo from '../logo/Fitbot2.png';
import axios from 'axios';
import Box from '@mui/material/Box';
import Skeleton from '@mui/material/Skeleton';
import { serverTimestamp, addDoc, collection } from 'firebase/firestore';
import { getAuth } from 'firebase/auth';
import { db } from '../firebase';
import { BeatLoader } from 'react-spinners';
import Account from './Account';
import { useAuth } from '../AuthContext';
import host from '../utils/host';

const Finalize = () => {
  const exercises = useSelector((state) => state.exercises.exercises);
  const loggedInUser = useSelector((state) => state.loggedInUser.loggedInUser);
  const experience = useSelector((state) => state.intensity.experience);
  const intensity = useSelector((state) => state.intensity.intensity);

  const [duration, setDuration] = useState('');
  const [response, setResponse] = useState([]);
  const [finalized, setFinalized] = useState(false);
  const [loading, setLoading] = useState(false);
  const [savedLoading, setSavedLoading] = useState(false);
  const [saved, setSaved] = useState(false);
  console.log('OPENAI API KEY', process.env.NEXT_PUBLIC_OPENAI_API_KEY);
  console.log('SCOTTs TEST', process.env.NEXT_PUBLIC_SCOTT);

  const handleSubmit = async (e) => {
    setLoading(true);
    setFinalized(true);
    try {
      const res = await axios.post(`${host}/finalize`, {
        prompt: `My experience level with fitness is ${experience}. I am looking for a ${intensity} workout. Can you generate a ${
          duration || '60'
        } minute workout that includes each of the following exercises only once: ${exercises.join(
          ', '
        )}. 
        The workout should always include a warmup that consists of easy calisthenics that will warm up the muscles used in these exercises: ${exercises.join(
          ', '
        )} and easy cardio. Do not include a cool down.
        The rest of the workout should be seperated into multiple parts with 1 to 4 excersises per part.
        Here's an example of how the response should be formated - 
        Warm-Up: exercise (sets x reps); exercise (sets x reps); exercise (sets x reps); 
        Part-1: exercise (sets x reps); exercise (sets x reps); exercise (sets x reps); 
        ${
          duration >= 20 &&
          'Part-2: exercise (sets x reps); exercise (sets x reps); exercise (sets x reps);'
        } 
        ${
          duration >= 40 &&
          'Part-3: exercise (sets x reps); exercise (sets x reps); exercise (sets x reps);'
        }
        make sure there is a semicolon after every exercise.
        `,
      });
      let cleanedResponse = res.data.replace(/^\./, '');
      cleanedResponse = cleanedResponse.split(';');
      cleanedResponse = cleanedResponse.filter((el) => el !== '');
      setResponse(cleanedResponse);
      setLoading(false);
    } catch (error) {
      console.error(error);
    }
  };

  const myauth = getAuth();
  const user = useAuth();

  const handleSaveWorkout = async () => {
    setSavedLoading(true);
    setTimeout(() => {
      setSavedLoading(false);
      setSaved(true);
    }, 1500);
    await addDoc(collection(db, 'workouts'), {
      userId: myauth.currentUser.uid,
      workout: response,
      date: serverTimestamp(),
    });
  };

  return (
    <div className='finalizeContainer'>
      <div className='equipmentTransparentOverlay' />
      <h1 className='intesityTitle'>Finalize</h1>
      <Link className='cornerLogo' to='/'>
        <img width={70} src={logo} alt='FitBot' />
      </Link>
      {user.currentUser && (
        <div className='flex absolute top-6 left-6 z-20'>
          <Account />
        </div>
      )}
      <div className='finalizeResponseContainer'>
        <Link to='/pickExercise'>
          <MdKeyboardDoubleArrowLeft
            className='leftArrowIntensity'
            color='#A7FF37'
            size='70'
          />
        </Link>
        <div className='finalResponseDiv'>
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
              <div className='w-full flex justify-center'>
                <div className='generatedResponse w-1/2 flex flex-col items-start'>
                  {response.map((part) => {
                    return part.split(':').map((item) => {
                      if (
                        item.includes('Warm-Up') ||
                        item.includes('Part') ||
                        item.includes('Cool-Down')
                      ) {
                        return (
                          <div className='font-bold text-xl pt-6 text-center'>
                            {item}
                          </div>
                        );
                      } else {
                        return <li className='text-center'>{item}</li>;
                      }
                    });
                  })}
                  {loggedInUser.email &&
                    (savedLoading ? (
                      <BeatLoader className='beatLoader' color='#2c63fc' />
                    ) : saved ? (
                      <h1 className='savedMessage'>Workout Saved!</h1>
                    ) : (
                      <div>
                        <button
                          className='equipmentSkipButton'
                          onClick={handleSaveWorkout}
                        >
                          Save Workout
                        </button>
                      </div>
                    ))}
                </div>
              </div>
            )
          ) : (
            <div>
              <div>
                <h2 className='title mt-5'>Your Excersises</h2>
                <div className='grid grid-cols-3 items-center m-5'>
                  {exercises.map((item, i) => {
                    return (
                      <span key={i} className='equipmentItem'>
                        {item}
                      </span>
                    );
                  })}
                </div>
              </div>
              <div className='equipmentSkipButtonContainer'>
                <div>
                  <input
                    className='finalizeDuration generatedResponse'
                    placeholder='duration . . .'
                    value={duration}
                    onChange={(e) => setDuration(e.target.value)}
                  ></input>
                  <span className='generatedResponse'>minutes (optional)</span>
                </div>
                <button className='equipmentSkipButton' onClick={handleSubmit}>
                  Finalize
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Finalize;
