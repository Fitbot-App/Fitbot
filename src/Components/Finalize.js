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
  const [duration, setDuration] = useState('60 minutes');
  const [response, setResponse] = useState('');
  const [finalized, setFinalized] = useState(false);
  const [loading, setLoading] = useState(true);
  // console.log(state);

  const handleSubmit = async (e) => {
    setLoading(true);
    try {
      const res = await axios.post('http://localhost:3001/generateWorkout', {
        prompt: `Can you generate a workout with the following exercises: ${exercises.join(
          ', '
        )} that will take around ${duration}. The workout should include a warmup and be seperated into multiple parts. Each part should be seperated
        by a colon, and each exercise should be seperated by a comma. Each exercise should include sets and reps`,
      });
      setResponse(res.data);
      setLoading(false);
      setFinalized(true);
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div className='finalizeContainer'>
      <div className='equipmentTransparentOverlay' />
      <h1 className='intesityTitle'>Finalize</h1>
      <Link className='cornerLogo' to='/'>
        <img width={70} src={logo} alt='FitBot' />
      </Link>
      <div className='equipmentDivsContainer'>
        <Link to='/intensity'>
          <MdKeyboardDoubleArrowLeft
            className='leftArrowIntensity'
            color='#A7FF37'
            size='70'
          />
        </Link>
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
            </Box>
          ) : (
            <div className='finalResponse'>{response}</div>
          )
        ) : (
          <div className='equipmentDiv'>
            <div>
              <h2 className='title mt-5'>Finalize</h2>
              <div className='grid grid-cols-3 items-center m-5'>
                {exercises.map((item) => {
                  return <span className='equipmentItem'>{item}</span>;
                })}
              </div>
            </div>
            <div className='equipmentSkipButtonContainer'>
              <button className='equipmentSkipButton' onClick={handleSubmit}>
                Finalize
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Finalize;
