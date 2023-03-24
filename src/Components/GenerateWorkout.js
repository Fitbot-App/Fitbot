import React from 'react';
import { useState } from 'react';
import axios from 'axios';
import { useDispatch, useSelector } from 'react-redux';
import { setExercises } from '../slices/chosenExercisesSlice';
import Box from '@mui/material/Box';
import Skeleton from '@mui/material/Skeleton';
import { IoMdAddCircle } from 'react-icons/io';

function GenerateWorkout() {
  const [selectedOption, setSelectedOption] = useState('none');
  const [response, setResponse] = useState([]);
  const [loading, setLoading] = useState(false);
  const [selectedNone, setSelectedNone] = useState(false);

  const experience = useSelector((state) => state.intensity.experience);
  const intensity = useSelector((state) => state.intensity.intensity);
  const equipment = useSelector((state) => state.equipment.equipment);

  const dispatch = useDispatch();

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (selectedOption === 'none') {
      setSelectedNone(true);
      return;
    }
    setSelectedNone(false);
    setLoading(true);
    try {
      const res = await axios.post('http://localhost:3001/generateWorkout', {
        prompt: `My experience level with fitness is ${experience}. I am looking for a ${intensity} workout. 
        I have access to the following equipment: ${equipment.join(', ')}.
        Can you give me six exercises for my ${selectedOption}. please include at least two exercises I can do with no equipment. 
        The format of the response should be a numbered vertical list of just the exercise names with a colon 
        after each exercise expcept for the last. Here's an example "1. crunches :" `,
      });
      setResponse(res.data.split(':'));
      setLoading(false);
    } catch (error) {
      console.error(error);
    }
  };

  function addExercise(item) {
    dispatch(setExercises(item));
    setResponse(
      response.filter((addedItem) => {
        return item !== addedItem;
      })
    );
  }

  return (
    <div>
      <form className='muscleGroupForm' onSubmit={handleSubmit}>
        <h1 className='pickExerciseTitle generatedResponse'>
          Choose Muscle Groups
        </h1>
        <div className='flex items-center'>
          <select
            className='muscleGroupSelector generatedResponse'
            value={selectedOption}
            onChange={(e) => setSelectedOption(e.target.value)}
          >
            <option value='none'>Select an option</option>
            <option value='back'>Back</option>
            <option value='core'>Core</option>
            <option value='chest'>Chest</option>
            <option value='legs'>Legs</option>
            <option value='arms'>Arms</option>
            <option value='cardio'>Cardio</option>
          </select>
          <button
            className='muscleGroupButton'
            type='submit'
            disabled={!selectedOption}
          >
            {response.length === 0 ? 'Generate' : 'Regenerate'}
          </button>
        </div>
        <div>
          <h1 className='generatedExercisesWarning'>
            {selectedNone ? 'Please Select a Muscle Group' : null}
          </h1>
        </div>
      </form>
      {loading ? (
        <Box>
          <Skeleton
            style={{ backgroundColor: '#a8ff3765', margin: 15, height: 40 }}
          />
          <Skeleton
            style={{ backgroundColor: '#a8ff3765', margin: 15, height: 40 }}
          />
          <Skeleton
            style={{ backgroundColor: '#a8ff3765', margin: 15, height: 40 }}
          />
          <Skeleton
            style={{ backgroundColor: '#a8ff3765', margin: 15, height: 40 }}
          />
          <Skeleton
            style={{ backgroundColor: '#a8ff3765', margin: 15, height: 40 }}
          />
          <Skeleton
            style={{ backgroundColor: '#a8ff3765', margin: 15, height: 40 }}
          />
        </Box>
      ) : (
        <div className='generatedResponse generatedExercises'>
          {response.map((item, index) => {
            return item ? (
              <div key={index} className='singleGeneratedExercise'>
                <span className='singleExercise'>
                  {item}{' '}
                  <button onClick={() => addExercise(item)}>
                    <IoMdAddCircle
                      color={'#A7FF37'}
                      size={20}
                      className='hover:scale-125 duration-150'
                    />
                  </button>
                </span>
              </div>
            ) : null;
          })}
        </div>
      )}
    </div>
  );
}

export default GenerateWorkout;
