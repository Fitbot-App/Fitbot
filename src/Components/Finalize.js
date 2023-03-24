import React, { useState } from 'react';
import { useSelector } from 'react-redux';
import { MdKeyboardDoubleArrowLeft } from 'react-icons/md';
import { Link } from 'react-router-dom';
import logo from '../logo/Fitbot2.png';
import axios from 'axios';
import Box from '@mui/material/Box';
import Skeleton from '@mui/material/Skeleton';

const Finalize = () => {
  const exercises = useSelector((state) => state.exercises.exercises);
  const [duration, setDuration] = useState('');
  const [response, setResponse] = useState([]);
  const [finalized, setFinalized] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    setLoading(true);
    setFinalized(true);
    try {
      const res = await axios.post('http://localhost:3001/finalize', {
        prompt: `Can you generate a workout with the following exercises: ${exercises.join(
          ', '
        )} that will take around ${duration} minutes to complete. Duration should affect the amount of sets and reps per exercise. 
        The workout should always include a warmup that consists of easy calisthenics that will warm up the muscles used in these exercises: ${exercises.join(
          ', '
        )} and easy cardio. 
        The rest of the workout should be seperated into multiple parts with 1 to 4 excersises per part.
        Each exercise should only be used once in the entire workout. Here's an example of how the response should be formated - 
        Warm-up: exercise (sets x reps); exercise (sets x reps); exercise (sets x reps); 
        Part-1: exercise (sets x reps); exercise (sets x reps); exercise (sets x reps); 
        Part-2: exercise (sets x reps); exercise (sets x reps); exercise (sets x reps);  
        Part-3: exercise (sets x reps); exercise (sets x reps); exercise (sets x reps)
        `,
      });
      const cleanedResponse = res.data.replace(/^\./, '');
      console.log(cleanedResponse);
      setResponse(cleanedResponse.split(';'));
      setLoading(false);
    } catch (error) {
      console.error(error);
    }
  };

  console.log(duration);

  return (
    <div className='finalizeContainer'>
      <div className='equipmentTransparentOverlay' />
      <h1 className='intesityTitle'>Finalize</h1>
      <Link className='cornerLogo' to='/'>
        <img width={70} src={logo} alt='FitBot' />
      </Link>
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
              <div className='generatedResponse'>
                {response.map((part) => {
                  return part.split(':').map((item) => {
                    if (item.includes('Warm-up') || item.includes('Part')) {
                      return (
                        <div className='font-bold text-xl pt-6'>{item}</div>
                      );
                    } else {
                      return <li>{item}</li>;
                    }
                  });
                })}
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
                    className='equipmentSelector generatedResponse'
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
